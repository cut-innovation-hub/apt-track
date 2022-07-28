import Link from "next/link";
import React from "react";
import ManageBusesTable from "../../../components/Tables/ManageBusesTable";
import DashboardLayout from "../../../layouts/DashboardLayout";

type Props = {};

const Buses = (props: Props) => {
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full p-8">
        <div className="flex  flex-col ml-auto pb-8">
          <Link href={"/dashboard/buses/create"} passHref>
            <a className="bg-blue-700 text-white p-2 rounded font-semibold hover:bg-blue-800 cursor-pointer">
              Add A Bus
            </a>
          </Link>
        </div>
        <ManageBusesTable />
      </div>
    </DashboardLayout>
  );
};

export default Buses;
