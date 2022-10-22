import React from "react";

function SingleBusItem({ single_bus, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row items-center p-2 space-x-2 rounded hover:bg-gray-100 cursor-pointer"
    >
      <div className="flex h-16 w-16 bg-gray-50 rounded-lg overflow-hidden">
        <div class="flex items-center justify-center rounded-lg overflow-hidden rounded-lg">
          <img src={single_bus.picture} />
        </div>
      </div>
      <div className="flex flex-col space-y-2 flex-1">
        <div className="flex flex-row w-full items-center justify-between">
          <p className="font-semibold text-gray-700">
            {single_bus.owner.company_name}
          </p>
          {single_bus.bus_status === "on_route" ? (
            <span className="inline-flex rounded-full animate-pulse bg-green-700 px-2 text-xs font-semibold leading-5 text-white">
              Moving
            </span>
          ) : (
            <span className="inline-flex rounded-full  bg-blue-700 px-2 text-xs font-semibold leading-5 text-white">
              Stationary
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm">
          {single_bus.bus_type} - {single_bus.plate_number}
        </p>
      </div>
    </div>
  );
}

export default SingleBusItem;
