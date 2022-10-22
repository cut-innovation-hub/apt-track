import React from "react";

type Props = {
  single_bus:any
  onClick :any
};

function SingleBusComponent({ single_bus, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row p-2 space-x-2 rounded hover:bg-gray-100 cursor-pointer"
    >
      <div className="flex w-1/5 bg-gray-200 rounded"></div>
      <div className="flex flex-col space-y-2">
        <p className="font-semibold text-gray-700">{single_bus.plate_number}</p>
        <p className="text-gray-600 text-sm">{single_bus.bus_type}</p>
      </div>
    </div>
  );
}

export default SingleBusComponent;
