import React from "react";

interface Props {
    single_road:any
    onClick?:any
}

function RouteComponent({ single_road, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row w-full gap-2 hover:bg-gray-100 rounded p-2 cursor-pointer"
    >
      <div className="w-1/5 h-14 rounded bg-gray-200"></div>
      <div className="flex flex-1">
        <div className="flex flex-col justify-around">
          <p className="text-gray-700 font-semibold text-sm">{single_road.road_name}</p>
          <p className="text-gray-400 font-semibold text-xs">
            {Math.round((single_road.road_length + Number.EPSILON) * 100) / 100} kms
          </p>
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
