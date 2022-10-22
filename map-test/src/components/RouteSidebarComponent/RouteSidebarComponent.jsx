import React, { useContext } from "react";
import { Store } from "../../context/Store";
import side_bar_road from "../../assets/svgs/sidebar-road.svg";

function RouteSidebarComponent({ name, length, road_id, coords, picture }) {
  const { dispatch } = useContext(Store);

  const set_coords = async () => {
    dispatch({ type: "SET_BUS_ROUTE", payload: coords });
    dispatch({ type: "SET_COORDS", payload: null });
    dispatch({ type: "SET_SELECTED_ROAD_ID", payload: road_id });
    // console.log(coords)
  };

  return (
    <div
      onClick={set_coords}
      className="flex flex-row w-full gap-2 hover:bg-gray-100 rounded p-2 cursor-pointer"
    >
      <div className="w-1/5 h-14 rounded bg-gray-200">
        <img
          src={picture ? picture : side_bar_road}
          className="object-contain h-14 w-full"
          alt="bus stop icon"
        />
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col justify-around">
          <p className="text-gray-700 font-semibold text-sm">{name}</p>
          <p className="text-gray-400 font-semibold text-xs">
            {Math.round((length + Number.EPSILON) * 100) / 100} kms
          </p>
        </div>
      </div>
    </div>
  );
}

export default RouteSidebarComponent;
