import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

type Props = {
  setSearchQuery: any;
  button_text: any;
  rightButtonOnClick:any
  placeholder?:string
};

const DashboardSearch = ({ setSearchQuery, button_text, rightButtonOnClick, placeholder }: Props) => {
  return (
    <div className="mb-8 flex flex-col rounded bg-white p-2 shadow md:p-4">
      <div className="flex flex-col items-center space-x-2 md:flex-row md:space-x-8">
        {/* <p className="text text-gray-700 font-semibold">Products</p> */}
        <div className="mb-4 flex w-full flex-1 flex-row items-center rounded border border-gray-200 px-2 text-gray-500 md:mb-0">
          <SearchIcon height={20} width={20} />
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder ? placeholder : "Search something and press enter"}
            className="flex-1 p-2 outline-none"
          />
        </div>
        <div className="flex  flex-col ">
          <div onClick={rightButtonOnClick}>
            <p className="bg-blue-primary text-white p-2 capitalize rounded font-semibold hover:bg-blue-dark text-sm cursor-pointer">
              {button_text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSearch;
