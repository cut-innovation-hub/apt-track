import DashboardSearch from "../../../components/DashboardSearch/DashboardSearch";
import ManageDriversTable from "../../../components/Tables/ManageDriversTable";
import AddDriverRoute from "../../../components/Drawers/AddDriverDrawer";
import DashboardLayout from "../../../layouts/DashboardLayout";
import React, { useContext, useEffect, useState } from "react";
import { useAuthFetch } from "../../../hooks/useAuthFetch";
import { useDisclosure } from "@chakra-ui/react";
import { apiUrl } from "../../../utils/apiUrl";
import { Store } from "../../../context/Store";

function Drivers() {
  const [search_query, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [drivers, setDrivers] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state: store_state } = useContext(Store);
  const { cut_buses_Admin_User } = store_state;
  const token = cut_buses_Admin_User?.token;

  // url for api call
  const url = `${apiUrl}/api/driver/company/all?keyword=${
    search_query ? search_query : ""
  }&page=${page}`;

  const state = useAuthFetch(url, token);

  useEffect(() => {
    setDrivers(state.data.drivers);
  }, [state]);

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full p-8">
        <DashboardSearch
          setSearchQuery={setSearchQuery}
          button_text="Add A New Driver"
          rightButtonOnClick={() => onOpen()}
        />
        <div className="flex  flex-col ml-auto pb-8">
          <span>
            <>
              <AddDriverRoute
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
              />
            </>
          </span>
        </div>
        <>
          <ManageDriversTable
            drivers={drivers}
            drivers_loading={state.status === "fetching"}
            meta_info={state.data.meta}
            page={page}
            setPage={setPage}
            setDrivers={setDrivers}
          />
        </>
      </div>
    </DashboardLayout>
  );
}

export default Drivers;
