import React from "react";

function BusStopComponent() {
  return (
    <div className="flex flex-row w-full gap-2 hover:bg-gray-100 rounded p-2 cursor-pointer">
      <div className="w-1/5 h-14  bg-blue-700 rounded">as</div>
      <div className="flex w-3/5">
        <div className="flex flex-col justify-around">
          <p className="text-gray-700 font-semibold text-sm">Bus Stop Name</p>
          <p className="text-gray-400 font-semibold text-xs">3 kms from here</p>
        </div>
      </div>
    </div>
  );
}

export default BusStopComponent;
