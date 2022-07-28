import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Source, Layer } from "react-map-gl";
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

type Props = {};

const MapboxMap = (props: Props) => {

  return (
    <ReactMapGL
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{width: 300, height: 300}}
      mapStyle={"mapbox://styles/mapbox/basic-v9"}
      mapboxAccessToken={process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_ACCESS_TOKEN}
    />
  );
};

export default MapboxMap;
