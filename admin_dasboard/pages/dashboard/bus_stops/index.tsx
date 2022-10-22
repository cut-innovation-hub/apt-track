import Link from "next/link";
import React, { useContext } from "react";
import AddBusStopDrawer from "../../../components/Drawers/AddBusStopDrawer";
import { Store } from "../../../context/Store";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { apiUrl } from "../../../utils/apiUrl";
import { useAuthFetch } from "../../../hooks/useAuthFetch";
import ManageBusStopsTable from "../../../components/Tables/ManageBusStopsTable";

type Props = {};

function BusStops({}: Props) {
  const { state: store_state } = useContext(Store);
  const { cut_buses_Admin_User } = store_state;
  const token = cut_buses_Admin_User?.token;
  const url = `${apiUrl}/api/bus-stop/company/get`;

  const state = useAuthFetch(url, token);

  console.log(state);

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full max-w-7xl p-8">
        <div className="flex  flex-row items-center w-full  pb-8">
          <p className="flex-1 text-lg font-semibold">Manage Bus Stops</p>
          <Link href={"/dashboard/buses/create"} passHref>
            <AddBusStopDrawer />
          </Link>
        </div>
        <>
          <ManageBusStopsTable />
        </>
      </div>
    </DashboardLayout>
  );
}

export default BusStops;
