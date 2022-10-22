import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../context/Store";
import busstop_icon from "../../assets/svgs/sidebar-bus-stop.svg";
import {
  createRoutesString,
  getWalikingRoadCoordinates,
  getWalkingLength,
} from "../../utils/mapbox-functions";
import useCurrentLocation from "../../hooks/useCurrentLocation";

function ExCompo({ name, coords, picture }) {
  const current_location = useCurrentLocation();
  const [distance, setDistance] = useState('')

  useEffect(() => {
    const getDistances = async () => {
      const walking_distances = await getWalkingLength(
        createRoutesString([
          current_location?.lng,
          current_location?.lat,
          coords?.lng,
          coords?.lat,
        ])
      );
      setDistance(walking_distances)
    };

    getDistances();
  }, [current_location?.lat]);

  const { dispatch } = useContext(Store);

  const set_coords = async (coords) => {
    const string_to = `${current_location.lng},${current_location.lat};${coords?.lng},${coords?.lat}`;
    const data = await getWalikingRoadCoordinates(string_to);
    dispatch({ type: "SET_COORDS", payload: data  });
    dispatch({ type: "SET_BUS_ROUTE", payload: null });
  };

  return (
    <div
      onClick={() => set_coords(coords)}
      className="flex flex-row w-full gap-2 hover:bg-gray-100 rounded p-2 cursor-pointer"
    >
      <div className="w-1/5 h-14 rounded">
        <img
          src={picture ? picture : busstop_icon}
          className="object-cover rounded h-14 w-full"
          alt="bus stop icon"
        />
      </div>
      <div className="flex w-3/5">
        <div className="flex flex-col justify-around">
          <p className="text-gray-700 font-semibold text-sm">{name}</p>
          <p className="text-gray-400 font-semibold text-xs">
            {distance} from here
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExCompo;
