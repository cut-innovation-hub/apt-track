import axios from "axios";
import React, { useContext } from "react";
import { Store } from "../../context/Store";
import { getDistance } from "../../utils/getDistace";
import busstop_icon from "../../assets/svgs/sidebar-bus-stop.svg";


const ACCESS_TOKEN =
  "pk.eyJ1IjoidGF0ZW5kYXp3IiwiYSI6ImNsNXRmZWhmaDBnbXIzcHAzbXRpazN5MjgifQ.eWtGUzOKvmZlA3VKEF5W_A";

function BusStopComponent({ name, coords }) {
  const distance = getDistance(
    30.168791,
    -17.38824,
    coords?.lng,
    coords?.lat,
    "K"
  );
  const { dispatch } = useContext(Store);

  const set_coords =async (coords) => {
    // console.log(coords)
    const string_to = `${30.168791},${-17.38824};${coords?.lng},${coords?.lat}`;
    const { data } = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${string_to}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${ACCESS_TOKEN}`
    );
    // console.log(data);
    dispatch({ type: "SET_COORDS", payload: data });

  };

  return (
    <div
      onClick={() => set_coords(coords)}
      className="flex flex-row w-full gap-2 hover:bg-gray-100 rounded p-2 cursor-pointer"
    >
      <div className="w-1/5 h-14 rounded">
        <img src={busstop_icon} className="object-contain h-14 w-full" alt="bus stop icon" />
      </div>
      <div className="flex w-3/5">
        <div className="flex flex-col justify-around">
          <p className="text-gray-700 font-semibold text-sm">{name}</p>
          <p className="text-gray-400 font-semibold text-xs">
            {Math.round((distance + Number.EPSILON) * 100) / 100} kms from here
          </p>
        </div>
      </div>
    </div>
  );
}

export default BusStopComponent;
