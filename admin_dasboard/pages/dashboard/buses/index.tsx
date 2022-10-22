import Link from "next/link";
import React, { useContext } from "react";
import ManageBusesTable from "../../../components/Tables/ManageBusesTable";
import { Store } from "../../../context/Store";
import { useAuthFetch } from "../../../hooks/useAuthFetch";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { apiUrl } from "../../../utils/apiUrl";

type Props = {};

const Buses = (props: Props) => {
  const {state:store_state} = useContext(Store)
  const {cut_buses_Admin_User} = store_state
  const token = cut_buses_Admin_User?.token
  const url = `${apiUrl}/api/bus/company/all`
  const state = useAuthFetch(url, token)

  console.log(state)
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
        <ManageBusesTable table_info={state} />
      </div>
    </DashboardLayout>
  );
};

export default Buses;
