import { useRouter } from "next/router";
import { useState, ReactElement, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
const DashboardNavbar = dynamic(
  () => import("../components/DashboardNavbar/DashboardNavbar"),
  { ssr: false }
);
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar";
import { Store } from "../context/Store";

interface Props {
  children: any;
}

function DashboardLayout({ children }: Props): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { state } = useContext(Store);
  const { cut_buses_Admin_User } = state;
  const history = useRouter();

  useEffect(() => {
    if (cut_buses_Admin_User?.role !== "bus_admin") {
      history.push("/login");
    }
  }, []);

  return (
    <main className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        <div className="flex">
          <DashboardSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex w-full flex-col">
            <DashboardNavbar setSidebarOpen={setSidebarOpen} />
          </div>
          <div className="flex flex-1 bg-blue-300 overflow-y-auto paragraph px-4">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;
