import { LocationMarkerIcon } from "@heroicons/react/outline";
import React from "react";
import BusStopComponent from "../BusStopComponent/BusStopComponent";

function MapSidebar() {
  return (
    <div className="flex flex-col">
      <div className="flex py-2 flex-col">
        <p className="text-sm font-semibold pb-2 text-center">Where do you want to go</p>
        <div className="flex flex-row items-center p-2 bg-gray-200 rounded-lg text-gray-600 space-x-2">
          <LocationMarkerIcon height={20} width={20} />
          <input type="text" placeholder="Enter Location " className="bg-none bg-gray-200 outline-none w-full"/>
        </div>
        <div className="flex ml-auto mt-2">
            <div className="flex bg-blue-900 hover:bg-blue-800 cursor-pointer text-white p-2 rounded text-xs">
            Go
            </div>
        </div>
      </div>
      <p className="text-sm text-gray-700 font-semibold text-center py-2 capitalize">
        Bus Stops Near You
      </p>
      {[1, 2, 3, 4, 5, 6].map((item, index) => (
        <BusStopComponent />
      ))}
    </div>
  );
}

export default MapSidebar;
