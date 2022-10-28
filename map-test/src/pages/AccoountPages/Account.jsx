import { Avatar, Divider } from "@chakra-ui/react";
import React from "react";
import GeneralLayout from "../../layouts/GeneralLayout";

function Account() {
  return (
    <GeneralLayout>
      <div className="max-w-5xl w-full mx-auto flex flex-col space-y-8 px-2 py-16">
        <p className="text-gray-800 font-bold text-3xl">Account</p>
        <div className="flex flex-col space-y-2 ">
          <p className="text-gray-800 font-semibold">Avatar</p>
          <div className="flex flex-row items-center space-x-8">
            <span>
              <Avatar size={"lg"} />
            </span>
            <div className="flex p-2 text-blue-700  rounded shadow font-semibold hover:text-blue-800 cursor-pointer">
              Upload
            </div>
            <div className="flex p-2 text-gray-500  rounded shadow font-semibold hover:text-gray-700 cursor-pointer">
              Remove
            </div>
          </div>
        </div>

        <Divider borderColor={"gray.300"} />
        <div className="grid md:grid-cols-2 w-full grid-cols-1 gap-8">
          <div className="col-span-1 w-full">
            <p className="font-semibold text-sm text-gray-700">Display Name</p>
            <input
              type="text"
              className="text-gray-600 border w-full border-gray-200 rounded-lg outline-none p-2"
            />
          </div>
          <div className="col-span-1 w-full">
            <p className="font-semibold text-sm text-gray-700">Phone Number</p>
            <input
              type="text"
              className="text-gray-600 border w-full border-gray-200 rounded-lg outline-none p-2"
            />
          </div>
        </div>
        <Divider borderColor={"gray.300"} />
      </div>
    </GeneralLayout>
  );
}

export default Account;
