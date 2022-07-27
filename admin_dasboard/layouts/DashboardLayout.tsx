import { useRouter } from "next/router";
import { useState, ReactElement, useEffect, useContext } from "react";
import DashboardNavbar from "../components/DashboardNavbar/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar";
import { Store } from "../context/Store";

interface Props {
  children: any;
}

function DashboardLayout({ children }: Props): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { state, dispatch } = useContext(Store);
  const { cut_buses_Admin_User } = state;
  const history = useRouter();

  useEffect(() => {
    if (cut_buses_Admin_User?.role !== "bus_admin") {
      history.push("/login");
    }
  }, []);

  return (
    <>
      {cut_buses_Admin_User?.role === "bus_admin" ? (
        <>
          <div className="relative h-screen flex overflow-hidden bg-gray-100 text-gray-700">
            <div className="h-full">
              <DashboardSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            </div>

            {/* // the body of the dashboard */}

            <div className="flex-1 overflow-auto focus:outline-none">
              <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                {/* Page header */}
                <DashboardNavbar setSidebarOpen={setSidebarOpen} />

                {/* // the rest of the dashboard */}
                {children}
              </main>
            </div>
          </div>
        </>
      ) : (
        <div className="relative h-screen flex overflow-hidden bg-gray-100 text-gray-700">
          <div className="h-full">
            <DashboardSidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </div>

          {/* // the body of the dashboard */}

          <div className="flex-1 overflow-auto focus:outline-none">
            <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
              {/* Page header */}
              <DashboardNavbar setSidebarOpen={setSidebarOpen} />

              {/* // the rest of the dashboard */}
              <p className="flex flex-row items-center mx-auto text-gray-800 font-semibold">Please Login to your account</p>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardLayout;
