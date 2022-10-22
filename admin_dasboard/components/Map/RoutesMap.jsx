import React, { useState } from "react";
import ReactMapGL, {
  Source,
  Layer,
  NavigationControl,
  Marker,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocationMarkerIcon } from "@heroicons/react/solid";

const ACCESS_TOKEN =
  "pk.eyJ1IjoidGF0ZW5kYXp3IiwiYSI6ImNsNXRmZWhmaDBnbXIzcHAzbXRpazN5MjgifQ.eWtGUzOKvmZlA3VKEF5W_A";

function RoutesMap({ coords }) {
  const [clocked_coords, setClockedCoords] = useState();
  const [first_and_last, setFirstAndLast] = useState();

  const firstItem = coords[0];
  const lastItem = coords[coords.length - 1];

  console.log("fiest item is", firstItem);

  console.log("last item is", lastItem);

  const [viewport, setViewport] = useState({
    latitude: null,
    longitude: null,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    width: 600,
    height: 600,
  });

  function handleClick(event) {
    // var lngLat = event.lngLat;
    setClockedCoords(event);
    console.log(clocked_coords);
  }

  console.log(coords[0][1]);

  const dataTwo = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coords,
    },
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        style={{ width: '100%', height: 600 }}
        longitude={coords[0][0]}
        latitude={coords[0][1]}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
        mapboxAccessToken={ACCESS_TOKEN}
        onDrag={(newViewport) => {
          // console.log(newViewport)
          setViewport(newViewport.viewState);
        }}
        onClick={handleClick}
      >
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
              "line-color": "rgba(3, 170, 238, 0.5)",
              "line-width": 5,
            }}
          />
        </Source>

        <Marker
          longitude={firstItem[0]}
          latitude={firstItem[1]}
          anchor="bottom"
        >
      
            <LocationMarkerIcon height={20} width={20} className="text-red-600"/>
        </Marker>

        <Marker
          longitude={lastItem[0]}
          latitude={lastItem[1]}
          anchor="bottom"
        >
      
            <LocationMarkerIcon height={20} width={20} className="text-red-600"/>
        </Marker>

        <FullscreenControl />
        <NavigationControl />
        <GeolocateControl />
      </ReactMapGL>
    </div>
  );
}

export default RoutesMap;
