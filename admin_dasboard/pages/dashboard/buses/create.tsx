import { Divider, Select } from "@chakra-ui/react";
import React from "react";
import MapboxMap from "../../../components/Map/Map";
import DashboardLayout from "../../../layouts/DashboardLayout";

type Props = {};

const CreateBus = (props: Props) => {
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full md:p-8">
        <p className="text-center font-semibold text-gray-800 text-lg capitalize pb-8">
          create a bus
        </p>
        <div className="grid grid-cols-5 md:gap-8 gap-4">
          <div className="flex flex-col md:col-span-2 col-span-5">
            <label htmlFor="plate" className="text-gray-700 text-md  pb-2">
              Plate Number
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 outline-none"
              placeholder="Enter plate number"
            />
          </div>
          <div className="flex flex-col md:col-span-3 col-span-5">
            <label htmlFor="plate" className="text-gray-700 text-md  pb-2">
              Enter Driver Name
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded p-2 outline-none"
              placeholder="Enter driver name"
            />
          </div>
          <div className="flex flex-col md:col-span-3 col-span-5">
            <label htmlFor="plate" className="text-gray-700 text-md  pb-2">
              Enter Short Bus Description (Optional)
            </label>
            <textarea
              rows={4}
              className="border border-gray-300 rounded p-2 outline-none"
              placeholder="Enter bus description"
            />
          </div>
          <div className="flex flex-col md:col-span-3 col-span-5">
            <label htmlFor="plate" className="text-gray-700 text-md  pb-2">
              Enter bus type
            </label>
            <Select bg={"white"}>
              <option value="option1">bus</option>
              <option value="option2">car</option>
              <option value="option3">cycle</option>
            </Select>
          </div>
          <div className="col-span-5 py-8">
            <div className="border-t border-gray-300 w-full" />
          </div>
          <div className="col-span-5">
            <div className="grid md:grid-cols-2 grid-cols-1  gap-8">
              <div className="flex flex-col md:items-start items-center col-span-1">
                <label htmlFor="plate" className="text-gray-700 text-md  pb-2">
                  Initial location (where the bus starts or ends)
                </label>
                <input
                  type="text"
                  className="border border-gray-300 w-full mb-4 rounded p-2 outline-none"
                  placeholder="Search area"
                />
                <MapboxMap />
              </div>
              <div className="flex flex-col pb-8 md:items-start items-center col-span-1">
                <label htmlFor="plate" className="text-gray-700 text-md  pb-2">
                  Final location
                </label>
                <input
                  type="text"
                  className="border border-gray-300 w-full mb-4 rounded p-2 outline-none"
                  placeholder="Search area"
                />
                <MapboxMap />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-auto pb-8">
            <span className="bg-blue-700 p-2 rounded text-white font-semibold">
            Save Bus
            </span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateBus;
