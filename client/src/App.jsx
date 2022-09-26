import React, { useState, useEffect } from "react";
import ReactMapGl, {
  Source,
  Layer,
  NavigationControl,
  Marker,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import socketIOClient from "socket.io-client";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGF0ZW5kYXp3IiwiYSI6ImNsNXRmZWhmaDBnbXIzcHAzbXRpazN5MjgifQ.eWtGUzOKvmZlA3VKEF5W_A";
const ENDPOINT = "https://cut-buses.herokuapp.com";

function App() {
  const [response, setReponse] = useState();
  const [bus_location, setBusLocation] = useState({
    longitude: null,
    latitude: null,
  });

  const [state, setState] = useState({
    longitude: null,
    latitude: null,
    zoom: 13.8,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    width: 600,
    height: 600,
  });

  useEffect(() => {
    const getInitialCoordinates = async () => {
      // eslint-disable-next-line no-use-before-define
      await navigator.geolocation.getCurrentPosition((pos) =>
        setState({
          ...state,
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude,
        })
      ),
        (err) => console.log(err);
    };
    getInitialCoordinates();
  }, []);

  return (
    <div className="App" style={{ width: "100vh", height: "100vh" }}>
      <ReactMapGl
        mapStyle={"mapbox://styles/mapbox/basic-v9"}
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(newViewPort) => {
          setState(newViewPort.viewState);
        }}
        {...state}
      >
        {/* <Marker longitude={state.longitude} latitude={state.latitude}>
          p
        </Marker> */}
        <NavigationControl />
      </ReactMapGl>
    </div>
  );
}

export default App;
