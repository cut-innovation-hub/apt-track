import DashboardSearch from "../../../components/DashboardSearch/DashboardSearch";
import ManageBusesTable from "../../../components/Tables/ManageBusesTable";
import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useAuthFetch } from "../../../hooks/useAuthFetch";
import { apiUrl } from "../../../utils/apiUrl";
import { Store } from "../../../context/Store";
import { useRouter } from "next/router";

const Buses = () => {
  const { state: store_state } = useContext(Store);
  const { cut_buses_Admin_User } = store_state;
  const token = cut_buses_Admin_User?.token;
  const [search_query, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const url = `${apiUrl}/api/bus/company/all?keyword=${
    search_query ? search_query : ""
  }&page=${page}`;
  const state = useAuthFetch(url, token);
  const [buses, setBuses] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    setBuses(state.data.all_buses);
  }, [state]);

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full p-8">
        <>
          <DashboardSearch
            rightButtonOnClick={() => router.push("/dashboard/buses/create")}
            button_text={"Add A Bus"}
            setSearchQuery={setSearchQuery}
            placeholder="Search driver, registration number, description etc"
          />
        </>

        <>
          <ManageBusesTable
          setBuses={setBuses}
            page={page}
            setPage={setPage}
            meta_info={state.data.meta}
            buses={buses}
            table_loading={state.status === "fetching"}
          />
        </>
      </div>
    </DashboardLayout>
  );
};

export default Buses;
