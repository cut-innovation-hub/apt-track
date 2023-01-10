import React from 'react'
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from 'next/router';

const SubscriptionItem = ({
    small_heading,
    price_heading,
    features,
    heading_icon,
    bg_color,
  sub_package
    
  }) => {
      const router = useRouter()
    return (
      <div className={`${bg_color} flex flex-col space-y-4 p-8 shadow rounded-lg`}>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col">
            <p
              className={`${
                bg_color !== "bg-white" ? "text-blue-200" : "text-blue-900"
              } text-sm font-semibold`}
            >
              {small_heading}
            </p>
            <p
              className={`${
                bg_color !== "bg-white" ? "text-white" : "text-gray-800"
              } font-semibold text-lg`}
            >
              {price_heading}
            </p>
          </div>
          <div
            className={`${
              bg_color !== "bg-white" ? "bg-blue-800" : "bg-blue-100"
            } flex rounded-full p-2`}
          >
            <span
              className={`${
                bg_color !== "bg-white"
                  ? "bg-blue-700 text-blue-200"
                  : "bg-blue-200 text-blue-900"
              } rounded-full p-2`}
            >
              {heading_icon}
            </span>
          </div>
        </div>
        <div className="flex pt-8">
          <div className="flex flex-col space-y-4">
            {features?.map((item, index) => (
              <>
                {item?.status === "available" ? (
                  <div className="flex flex-row items-center space-x-2">
                    <span
                      className={`${
                        bg_color === "bg-white" ? "bg-blue-100" : "bg-white"
                      } rounded-full p-1`}
                    >
                      <CheckIcon
                        className="text-blue-900"
                        height={16}
                        width={16}
                      />
                    </span>
                    <p className={`${bg_color === "bg-white" ? "text-gray-700" : "text-white"} text-sm`}>{item.name}</p>
                  </div>
                ) : (
                  <div className="flex flex-row items-center space-x-2">
                    <span
                      className={`${
                        bg_color === "bg-white" ? "bg-red-100" : "bg-red-100"
                      } rounded-full p-1`}
                    >
                      <XIcon className="text-red-700" height={16} width={16} />
                    </span>
                    <p className={`${bg_color === "bg-white" ? "text-gray-700" : "text-white"} text-sm`}>{item?.name}</p>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className={`${bg_color !== "bg-white" ? "border-blue-700 " : "border-gray-200 " } border-t `}/>
        <div className="flex">
          <span onClick={() => router.push(`/payment/${sub_package}`)} className={`${bg_color === 'bg-white' ? "bg-blue-900 text-white " : "bg-white "} px-2 cursor-pointer py-3 text-center w-full font-semibold rounded-lg text-sm capitalize`}>
              Choose Subscription
          </span>
        </div>
      </div>
    );
  };

export default SubscriptionItem