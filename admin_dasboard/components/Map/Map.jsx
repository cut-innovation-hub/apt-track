import React, { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  Source,
  Layer,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocationMarkerIcon } from "@heroicons/react/solid";

// added the following 6 lines.
import mapboxgl from "mapbox-gl";

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MapboxMap = () => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const [state, setState] = useState({
    latitude: null,
    longitude: null,
    zoom: 13.8,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    width: 600,
    height: 600,
  });

  function handleClick(event) {
    // var lngLat = event.lngLat;
    setLatitude(event?.lngLat?.lat);
    setLongitude(event?.lngLat?.lng);
    console.log(`long -- ${longitude} : lat -- ${latitude}`);
  }

  return (
    <ReactMapGL
      style={{ width: 400, height: 300 }}
      onClick={handleClick}
      onMove={(newViewport) => {
        // console.log(newViewport)
        setState(newViewport.viewState);
      }}
      {...state}
      mapStyle={"mapbox://styles/mapbox/basic-v9"}
      mapboxAccessToken={process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      {longitude && (
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <LocationMarkerIcon height={20} width={20} className="text-red-600" />
        </Marker>
      )}
      <GeolocateControl />
    </ReactMapGL>
  );
};

export default MapboxMap;
