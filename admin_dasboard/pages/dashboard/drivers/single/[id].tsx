import { Avatar, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import DashboardLayout from "../../../../layouts/DashboardLayout";

type Props = {};

function SingleDriver({}: Props) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full max-w-7xl md:p-16 p-2 mx-auto">
        <div className="flex flex-row items-center space-x-4">
          <Avatar name="Tatenda Bako" size={"lg"} />
          <div className="flex flex-col">
            <p>tatenda Bako</p>
            <p>0771445411</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-24">
          <div className="col-span-1 flex flex-col">
            <label
              htmlFor="name"
              className="m-2 text-sm text-gray-700 capitalize"
            >
              name
            </label>
            <input
              type="text"
              placeholder="name"
              className="border border-gray-200 rounded-lg p-2 outline-none"
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <label
              htmlFor="name"
              className="m-2 text-sm text-gray-700 capitalize"
            >
              National Id
            </label>
            <input
              type="text"
              placeholder="Namtional Id"
              className="border border-gray-200 rounded-lg p-2 outline-none"
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <label
              htmlFor="name"
              className="m-2 text-sm text-gray-700 capitalize"
            >
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-200 rounded-lg p-2 outline-none"
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <label
              htmlFor="name"
              className="m-2 text-sm text-gray-700 capitalize"
            >
              Gender
            </label>
            <Select placeholder="Select gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </div>
          <div className="col-span-2 flex flex-col items-center mt-16">
              <span className="bg-blue-900 rounded-lg hover:bg-blue-800 cursor-pointer text-white mx-auto p-2">
              Save Changes
              </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SingleDriver;
