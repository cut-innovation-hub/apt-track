import { CurrencyYenIcon } from "@heroicons/react/outline";
import React from "react";
import SubscriptionItem from "../../SubscriptionItem/SubscriptionItem";

function PackagesSection() {
  const card_details = [
    {
      small_heading: "Lorem Ipson",
      price_heading: "Free Tier",
      features: [
        { name: "Access Granted", status: "available" },
        { name: "Unlimited Storage", status: "available" },
        { name: "Analytics", status: "available" },
        { name: "Access Granted", status: "un_available" },
        { name: "Access Granted", status: "un_available" },
        { name: "Access Granted", status: "un_available" },
        { name: "Access Granted", status: "un_available" },
      ],
      heading_icon: (
        <CurrencyYenIcon height={20} width={20} className="text-blue-900" />
      ),
      bg_color: "bg-white",
    },
    {
      small_heading: "Lorem Ipson",
      price_heading: "$19/m",
      features: [
        { name: "Access Granted", status: "available" },
        { name: "Unlimited Storage", status: "available" },
        { name: "Analytics", status: "available" },
        { name: "Access Granted", status: "available" },
        { name: "Access Granted", status: "available" },
        { name: "Access Granted", status: "un_available" },
        { name: "Access Granted", status: "un_available" },
      ],
      heading_icon: <CurrencyYenIcon height={20} width={20} className="" />,
      bg_color: "bg-blue-900",
    },
    {
      small_heading: "Lorem Ipson",
      price_heading: "$25/m",
      features: [
        { name: "Access Granted", status: "available" },
        { name: "Unlimited Storage", status: "available" },
        { name: "Analytics", status: "available" },
        { name: "Access Granted", status: "available" },
        { name: "Access Granted", status: "available" },
        { name: "Access Granted", status: "available" },
        { name: "Access Granted", status: "available" },
      ],
      heading_icon: <CurrencyYenIcon height={20} width={20} className="" />,
      bg_color: "bg-white",
    },
  ];
  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto  md:py-16 py-8 px-2">
        <p className="text-center w-full text-gray-700 text-2xl pb-8 font-bold">Take a look at our subscription plans</p>
      <div className="flex flex-row items-center">
        <div className="w-full grid md:grid-cols-3 grid-cols-1 md:gap-12 gap-4">
          {card_details.map((item, index) => (
            <SubscriptionItem
              small_heading={item?.small_heading}
              price_heading={item?.price_heading}
              features={item?.features}
              heading_icon={item?.heading_icon}
              bg_color={item?.bg_color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}



export default PackagesSection;
