import { useState, useEffect, useContext } from "react";
import ReactMapGL, {
  Source,
  Layer,
  NavigationControl,
  Marker,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import socketIOClient from "socket.io-client";
import GeneralLayout from "../layouts/GeneralLayout";
import MapSidebar from "../components/MapSidebar/MapSidebar";
import { useFetch } from "../hooks/useFetch";
import { apiUrl } from "../utils/apiUrl";
import { Store } from "../context/Store";
import MapIcon from "../components/MapIcon/MapIcon";
import useCurrentLocation from "../hooks/useCurrentLocation";
import { getWalikingRoadCoordinates } from "../utils/mapbox-functions";
const ENDPOINT = "wss://cut-buses.herokuapp.com/";

const socket = socketIOClient(ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
  forceNew: true,
  withCredentials: true,
});

function MapPage() {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;
  const url = `${apiUrl}/api/bus-stop/all`;
  const [response, setResponse] = useState("");
  const { state: store_state, dispatch } = useContext(Store);
  const { walking_road_coords, bus_route_coords } = store_state;
  const current_location = useCurrentLocation();

  const [viewport, setViewport] = useState({
    latitude: null,
    longitude: null,
    zoom: 13.8,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    width: 600,
    height: 600,
  });

  // fetch bus stops from api
  const state = useFetch(url);

  const hard_corded_coords = {
    lng: 30.1777657,
    lat:  -17.3829378
  }

  // set view port to use current location as initial place
  useEffect(() => {
    setViewport({
      ...viewport,
      longitude:hard_corded_coords.lng,
      latitude: hard_corded_coords.lat,
    })
  }, [hard_corded_coords?.lng, hard_corded_coords?.lng]);

  useEffect(() => {
    socket.on("connection", () => {
      console.log(socket.id);
    });
    socket.on("api-location-info", (data) => {
      setResponse(data);
    });
  }, [socket]);

  const dataTwo = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: walking_road_coords,
    },
  };

  const dataThree = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: bus_route_coords,
    },
  };

  const set_step_coords = async (coords) => {
    const string_to = `${hard_corded_coords.lng},${hard_corded_coords.lat};${coords?.lng},${coords?.lat}`;
    const data = await getWalikingRoadCoordinates(string_to)
    dispatch({
      type: "SET_COORDS",
      payload: data,
    });
    dispatch({ type: "SET_BUS_ROUTE", payload: null });
  };

  return (
    <GeneralLayout>
      <div className="relative grid grid-cols-7 overflow-hidden">
        <div className="col-span-2 md:flex hidden flex-col space-y-2 p-2">
          <MapSidebar
            bus_stops={state?.data?.all_bustops}
            bus_stop_loading={state?.status === "fetching"}
          />
        </div>
       
        <div className="md:col-span-5 col-span-6 bg-gray-100">
          <div className="App" style={{ width: "100vw", height: "100vh" }}>
            {/* <button onClick={getGeoJson}>get location</button> */}

            <ReactMapGL
              mapStyle={"mapbox://styles/mapbox/streets-v9"}
              mapboxAccessToken={MAPBOX_TOKEN}
              onMove={(newViewport) => {
                setViewport(newViewport.viewState);
              }}
              {...viewport}
            >

              {/* // draw route that leadsto selected bus stop */}
              {walking_road_coords && (
                <Source id="polylineLayer" type="geojson" data={dataTwo}>
                  <Layer
                    id="lineLayer"
                    type="line"
                    source="my-data"
                    layout={{
                      "line-join": "round",
                      "line-cap": "round",
                    }}
                    paint={{
                      "line-color": "#dc2626",
                      "line-width": 2,
                    }}
                  />
                </Source>
              )}

              {/* // draw route of selected vehicle */}
              {bus_route_coords && (
                <Source id="polylineLayer" type="geojson" data={dataThree}>
                  <Layer
                    id="lineLayer"
                    type="line"
                    source="my-data"
                    layout={{
                      "line-join": "round",
                      "line-cap": "round",
                    }}
                    paint={{
                      "line-color": "rgba(3, 170, 238, 0.5)",
                      "line-width": 5,
                    }}
                  />
                </Source>
              )}

              {/* // users current location */}
              <Marker
                longitude={hard_corded_coords.lng}
                latitude={hard_corded_coords.lat}
                anchor="bottom"
              />

              {/* // all bus stops/ */}
              {state?.data?.all_bustops?.map((item, index) => (
                <Marker
                  key={item._id}
                  onClick={() => set_step_coords(item?.coords)}
                  longitude={item?.coords?.lng}
                  latitude={item?.coords?.lat}
                >
                  <MapIcon viewport={viewport} item={item} />
                </Marker>
              ))}

              {/* // marker of the vehicle */}
              {response && (
                <Marker
                  longitude={response?.longitude}
                  latitude={response?.latitude}
                  anchor="bottom"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="24px"
                    width="24px"
                  >
                    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                    <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                    <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                  </svg>
                </Marker>
              )}
              <FullscreenControl />
              <NavigationControl />
              <GeolocateControl />
            </ReactMapGL>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
}

export default MapPage;
