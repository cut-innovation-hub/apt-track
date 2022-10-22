import { Tooltip } from "@chakra-ui/react";
import React from "react";
import busstop from "../../assets/svgs/bus-stop.svg";

function MapIcon({ item, viewport }) {
  return (
    <div>
      <Tooltip
        rounded={"md"}
        hasArrow
        placement="top"
        label={
          <div className="flex flex-col items-center">
            {item.picture && (
              <div className="flex flex-col overflow-hidden h-28 w-full py-1">
                <img
                  src={item.picture}
                  alt="bus stop picture "
                  className="h-full object-cover rounded"
                />
              </div>
            )}

            {item?.name}
          </div>
        }
        aria-label="A tooltip"
      >
        <img src={busstop} alt="bu stop icon" height={28} width={28} />
      </Tooltip>
    </div>
  );
}

export default MapIcon;
