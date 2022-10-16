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
import busstop from "../assets/svgs/bus-stop.svg";
// import { socket } from './helpers/socket';
import socketIOClient, { connect } from "socket.io-client";
import axios from "axios";
import GeneralLayout from "../layouts/GeneralLayout";
import BusStopComponent from "../components/BusStopComponent/BusStopComponent";
import MapSidebar from "../components/MapSidebar/MapSidebar";
import MapSideBarDrawer from "../components/MapSidebar/MapSideBarDrawer";
import { Tooltip } from "@chakra-ui/react";
import { useFetch } from "../hooks/useFetch";
import { apiUrl } from "../utils/apiUrl";
import { Store } from "../context/Store";
const ENDPOINT = "wss://cut-buses.herokuapp.com/";

const socket = socketIOClient(ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
  forceNew: true,
  withCredentials: true,
});

function MapPage() {
  // const MAPBOX_TOKEN = "pk.eyJ1IjoidGF0ZW5kYXp3IiwiYSI6ImNsNXRmZWhmaDBnbXIzcHAzbXRpazN5MjgifQ.eWtGUzOKvmZlA3VKEF5W_A";
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_KEY;
  const url = `${apiUrl}/api/bus-stop/all`;
  const [response, setResponse] = useState("");
  const [clocked_coords, setClockedCoords] = useState();
  const [bus_stops, setBusStops] = useState();
  const { state: store_state } = useContext(Store);
  const { current_coords } = store_state;

  console.log(current_coords);

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

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(url);
      // console.log(data)
      setBusStops(data?.bus_stops);
    };

    getData();
  }, []);

  useEffect(() => {
    const getInitialCoordinates = async () => {
      await navigator.geolocation.getCurrentPosition(
        (pos) =>
          setViewport({
            ...viewport,
            // latitude: pos.coords.latitude,
            // longitude: pos.coords.longitude,
            longitude: 30.168791,
            latitude: -17.38824,
          }),
        (err) => console.log(err)
      );
    };
    getInitialCoordinates();
  }, []);

  useEffect(() => {
    socket.on("connection", () => {
      console.log(socket.id);
    });
    socket.on("api-location-info", (data) => {
      setResponse(data);
      // console.log("from ssocket", data);
    });
  }, [socket]);
  // console.log('after sicket call', response)

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        // [ ln,  lat]
        [30.168382, -17.388683],
        [30.168382, -17.388683],
        [30.168779, -17.389303],
        [30.169423, -17.390235],
        [30.169932, -17.391043],
        [30.169997, -17.391212],
        [30.169984, -17.391342],
        [30.170018, -17.391386],
        [30.17009, -17.391407],
        [30.17019, -17.391402],
        [30.170343, -17.391372],
        [30.170415, -17.391366],
        [30.170505, -17.391367],
        [30.170658, -17.391389],
        [30.170879, -17.391377],
        [30.171177, -17.39133],
        [30.171177, -17.39133],
        [30.171531, -17.391822],
        [30.171531, -17.391822],
        [30.172207, -17.391335],
        [30.173868, -17.390199],
        [30.175197, -17.389229],
        [30.177653, -17.38754],
        [30.17813, -17.387243],
        [30.178356, -17.38713],
        [30.178687, -17.386943],
        [30.179796, -17.386485],
        [30.180543, -17.386237],
        [30.181303, -17.386056],
        [30.18209, -17.385908],
        [30.183046, -17.385812],
        [30.183371, -17.385782],
        [30.183506, -17.385766],
        [30.183902, -17.385704],
        [30.184321, -17.385624],
        [30.184542, -17.385553],
        [30.184663, -17.385517],
        [30.184832, -17.385446],
        [30.185122, -17.38533],
        [30.185355, -17.385205],
        [30.185792, -17.384926],
        [30.186154, -17.384634],
        [30.186592, -17.384163],
        [30.186997, -17.383602],
        [30.187112, -17.383257],
        [30.187284, -17.382825],
        [30.187583, -17.381966],
        [30.187683, -17.381715],
        [30.187781, -17.381518],
        [30.187852, -17.38137],
        [30.188099, -17.38096],
        [30.188279, -17.380723],
        [30.188493, -17.380472],
        [30.188724, -17.380265],
        [30.188898, -17.380119],
        [30.189089, -17.379975],
        [30.190105, -17.379236],
        [30.190255, -17.379115],
        [30.190405, -17.378972],
        [30.190604, -17.378798],
        [30.190926, -17.378424],
        [30.191516, -17.377618],
        [30.192154, -17.37674],
        [30.192224, -17.37663],
        [30.192567, -17.376149],
        [30.192723, -17.375872],
        [30.192846, -17.375603],
        [30.192983, -17.375273],
        [30.193096, -17.37494],
        [30.193208, -17.374426],
        [30.19328, -17.374066],
        [30.19336, -17.373629],
        [30.193463, -17.373192],
        [30.193579, -17.372757],
        [30.193678, -17.37248],
        [30.193777, -17.372229],
        [30.193943, -17.371927],
        [30.194144, -17.371597],
        [30.194359, -17.371323],
        [30.194488, -17.371175],
        [30.194716, -17.370957],
        [30.195335, -17.370471],
        [30.195496, -17.370338],
        [30.196733, -17.369467],
        [30.197562, -17.368871],
        [30.197841, -17.36864],
        [30.19805, -17.3684],
        [30.19831, -17.368085],
        [30.198522, -17.367739],
        [30.198731, -17.367348],
        [30.198841, -17.367115],
        [30.198922, -17.366882],
        [30.199042, -17.36637],
        [30.199082, -17.36604],
        [30.19909, -17.365717],
        [30.199066, -17.36521],
        [30.198899, -17.36382],
        [30.198849, -17.363334],
        [30.198772, -17.362698],
        [30.198734, -17.362261],
        [30.198712, -17.362033],
        [30.19865, -17.361533],
        [30.198482, -17.360339],
        [30.19846, -17.360162],
        [30.198327, -17.359011],
        [30.19829, -17.358596],
        [30.19829, -17.358596],
        [30.199239, -17.358489],
        [30.200065, -17.358369],
        [30.200212, -17.358339],
        [30.200479, -17.358285],
        [30.201019, -17.358114],
        [30.201271, -17.358019],
        [30.201482, -17.357926],
        [30.201816, -17.357756],
        [30.202159, -17.357584],
        [30.202668, -17.3573],
        [30.202701, -17.357282],
        [30.204079, -17.35657],
        [30.204452, -17.356422],
        [30.204837, -17.356313],
        [30.205099, -17.356278],
        [30.205366, -17.356255],
        [30.205734, -17.356277],
        [30.20584, -17.356281],
        [30.206016, -17.356274],
        [30.206202, -17.356324],
        [30.206303, -17.356354],
        [30.206526, -17.356428],
        [30.206673, -17.356464],
        [30.206673, -17.356464],
        [30.206925, -17.355917],
        [30.206925, -17.355917],
        [30.207057, -17.355953],
        [30.207176, -17.355963],
        [30.207265, -17.355942],
        [30.207334, -17.355912],
        [30.207427, -17.35583],
        [30.207518, -17.355734],
        [30.20762, -17.355558],
        [30.207688, -17.355355],
        [30.207802, -17.355062],
        [30.207954, -17.354488],
        [30.208073, -17.353792],
        [30.208159, -17.353323],
        [30.208269, -17.352958],
        [30.208425, -17.352579],
        [30.208561, -17.352251],
        [30.208636, -17.352059],
        [30.208706, -17.351877],
        [30.208768, -17.351616],
        [30.208811, -17.351322],
        [30.208901, -17.350968],
        [30.20895, -17.350792],
        [30.209044, -17.350656],
        [30.209149, -17.350515],
        [30.209296, -17.350367],
        [30.209562, -17.350208],
        [30.209878, -17.349974],
        [30.209878, -17.349974],
        [30.209728, -17.349824],
        [30.209683, -17.349795],
        [30.209624, -17.349786],
        [30.209267, -17.349756],
        [30.208736, -17.3497],
      ],
    },
  };

  const dataTwo = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: current_coords?.routes?.geometry?.coordinates,
    },
  };

  function handleClick(event) {
    // var lngLat = event.lngLat;
    setClockedCoords(event);
    console.log(clocked_coords);
  }

  return (
    <GeneralLayout>
      <div className="relative grid grid-cols-7 mt-16">
        <div className="col-span-2 md:flex hidden flex-col space-y-2 p-2">
          <MapSidebar bus_stops={bus_stops} />
        </div>
        <div className="md:hidden flex absolute top-4 left-4">
          <MapSideBarDrawer />
        </div>
        <div className="md:col-span-5 col-span-6 bg-gray-100">
          <div className="App" style={{ width: "100vw", height: "100vh" }}>
            {/* <button onClick={getGeoJson}>get location</button> */}
            <ReactMapGL
              mapStyle={"mapbox://styles/mapbox/streets-v9"}
              mapboxAccessToken={MAPBOX_TOKEN}
              onMove={(newViewport) => {
                // console.log(newViewport)
                setViewport(newViewport.viewState);
              }}
              onClick={handleClick}
              {...viewport}
            >
              <Source id="polylineLayer" type="geojson" data={dataOne}>
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

              <Marker
                longitude={30.168791}
                latitude={-17.38824}
                anchor="bottom"
              />
              {bus_stops?.map((item, index) => (
                <Marker
                  longitude={item?.coords?.lng}
                  latitude={item?.coords?.lat}
                >
                  <Tooltip rounded={'md'} hasArrow placement='top' label={item?.name} aria-label="A tooltip">
                    <img
                      src={busstop}
                      alt="bu stop icon"
                      height={28}
                      width={28}
                    />
                  </Tooltip>
                </Marker>
              ))}
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
