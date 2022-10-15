import { BookmarkAltIcon, BriefcaseIcon, LocationMarkerIcon, StopIcon } from "@heroicons/react/outline";
import React from "react";
import bg_image from "../../../assets/svgs/blob_backG.svg";
import HomeCardComponent from "../../HomeCardComponent/HomeCardComponent";

function SecondSection() {
  const card_items = [
    {
      icon: <LocationMarkerIcon height={44} width={44} className="text-blue-400" />,
      heading: "Location",
      body: "If we know where you are, we can get you where you want to go. We can tell you where the bus you are looking for is at the current moment, or where its going to be in the following moments",
    },
    {
        icon: <BookmarkAltIcon height={44} width={44} className="text-blue-400" />,
        heading: "Bus Stop",
        body: "Necessitatibus totam odio, quo sapiente fugiat natus impedit. Alias inventore numquam quam accusantium dolorum saepe iure quae, aperiam enim nobis qui recusandae?",
      },
      {
        icon: <StopIcon height={44} width={44} className="text-blue-400" />,
        heading: "Destination",
        body: "Necessitatibus totam odio, quo sapiente fugiat natus impedit. Alias inventore numquam quam accusantium dolorum saepe iure quae, aperiam enim nobis qui recusandae?",
      },
      {
        icon: <BriefcaseIcon height={44} width={44} className="text-blue-400" />,
        heading: "Lorem Ipsum",
        body: "Necessitatibus totam odio, quo sapiente fugiat natus impedit. Alias inventore numquam quam accusantium dolorum saepe iure quae, aperiam enim nobis qui recusandae?",
      },

  ];
  return (
    <div className="max-w-7xl mx-auto py-16">
      <div className="flex flex-col">
        <div className="grid grid-cols-4 gap-8">
          {card_items.map((item, index) => (
            <HomeCardComponent
              icon={item.icon}
              heading={item.heading}
              body={item.body}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SecondSection;
