import React from "react";
import { CurrencyYenIcon } from "@heroicons/react/outline";
import SubscriptionItem from "../components/SubscriptionItem/SubscriptionItem";
import {
  DotsVerticalIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { Avatar, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";

function login() {
  const router = useRouter();

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
    <div className="flex flex-col w-full bg-gray-100 min-h-screen space-y-4">
      <div className="flex flex-col max-w-7xl w-full mx-auto  md:py-16 py-8 px-2">
        <div className="flex flex-col w-full">
          <p className="text-5xl font-medium text-gray-900 text-center">
            Welcome to Apt-Track
          </p>
        </div>
        <p className="text-gry-500 text-center py-8">
          Join Our growing community of drivers
        </p>

        <div className="flex flex-row space-x-8 pb-8">
          <div
            onClick={() => router.push("/login")}
            className="flex flex-row p-4 rounded-xl cursor-pointer bg-white shadow"
          >
            <XCircleIcon height={16} width={16} className="text-red-600" />
            <div className="flex flex-col items-center pt-2">
              <Avatar height={16} width={16} name="Apt-Track" />
              <p>Dashboard</p>
            </div>
            <DotsVerticalIcon
              height={20}
              width={20}
              className="text-gray-700"
            />
          </div>
          <div className="flex flex-row p-4 rounded-xl cursor-pointer bg-white shadow">
            <XCircleIcon height={16} width={16} className="text-red-600" />
            <div className="flex flex-col items-center pt-2">
              <QuestionMarkCircleIcon height={60} width={60} />
              <p>Help</p>
            </div>
            <DotsVerticalIcon
              height={20}
              width={20}
              className="text-gray-700"
            />
          </div>
        </div>
        <div className="flex space-x-4 pb-8 flex-row items-center">
          <Divider borderColor={"#a1a1aa"} />
          <p className="text-gray-900 font-semibold text-lg">Or</p>
          <Divider borderColor={"#a1a1aa"} />
        </div>

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
    </div>
  );
}

export default login;
