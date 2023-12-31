import type { NextPage } from "next";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  ScaleIcon,
  PencilIcon,
  ArchiveIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  CogIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";
import { Avatar } from "@chakra-ui/react";
import { useContext } from "react";
import { Store } from "../../context/Store";
import BlueButton from "../../components/Buttons/BlueButton";
import { useRouter } from "next/router";
import PassengersActivity from "../../components/Charts/PassengersActivity";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { apiUrl } from "../../utils/apiUrl";

const Home: NextPage = () => {
  const { state } = useContext(Store);
  const { cut_buses_Admin_User } = state;
  const history = useRouter();

  // gettign todats data
  var today = new Date();
  var curHr = today.getHours();
  const url = `${apiUrl}/api/owner/details`;
  const token = cut_buses_Admin_User?.token;

  const user = useAuthFetch(url, token);
  const dashboard_items = [
    {
      icon: <ScaleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />,
      bg_color: "bg-red-200",
      text_color: "text-red-700",
      number: 100,
      location: "/dashboard/balances",
      name: "Account Balance",
    },
    {
      icon: <PencilIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />,
      bg_color: "bg-blue-200",
      text_color: "text-blue-700",
      number: user?.data?.all_buses,
      location: "/dashboard/buses",
      name: "Manage Buses",
    },
    {
      icon: <ArchiveIcon className="h-6 w-6 text-green-600" aria-hidden="true" />,
      bg_color: "bg-green-200",
      text_color: "text-green-700",
      number: user?.data?.all_drivers,
      location: "/dashboard/drivers",
      name: "Manage Drivers",
    },
    {
      icon: (
        <CreditCardIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
      ),
      bg_color: "bg-blue-200",
      text_color: "text-blue-700",
      number: user?.data?.all_buses,
      location: "/dashboard/invoices",
      name: "Cards & Payments",
    },
    {
      icon: (
        <ShoppingBagIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
      ),
      bg_color: "bg-indigo-200",
      text_color: "text-indigo-700",
      number: user?.data?.all_bus_stops,
      location: "/dashboard/bus_stops",
      name: "Bus Stops",
    },
    {
      icon: <CogIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />,
      bg_color: "bg-gray-200",
      text_color: "text-gray-700",
      number: 'Account Settings',
      location: "/dashboard/settings",
      name: "Settings",
    },
  ];

  return (
    <DashboardLayout>
      <main className="relative z-0 flex-1 overflow-y-auto pb-8">
        {/* Page header */}
        <div className="bg-white shadow w-full flex-1">
          <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl bg-white w-full lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="min-w-0 flex-1">
                {/* Profile */}
                <div className="flex items-center">
                  <div className="hidden rounded-full sm:block">
                    <Avatar
                      size="lg"
                      src={cut_buses_Admin_User?.photoURL}
                      name={cut_buses_Admin_User?.name}
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="rounded-full sm:hidden">
                        <Avatar
                          size="lg"
                          src={cut_buses_Admin_User?.photoURL}
                          name={cut_buses_Admin_User?.name}
                        />
                      </div>
                      <div className="flex flex-col ml-3">
                        <h1 className=" md:text-2xl text-xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                          Good{" "}
                          {curHr < 12
                            ? " Morning"
                            : curHr < 18
                            ? " Afternoon "
                            : "Evening"}
                          , {cut_buses_Admin_User?.name}
                        </h1>
                        <dl className=" flex flex-col sm:flex-row sm:flex-wrap">
                          <dt className="sr-only">Account status</dt>
                          {cut_buses_Admin_User?.verified ? (
                            <dd className=" flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                              <CheckCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-blue-400"
                                aria-hidden="true"
                              />
                              Verified account
                            </dd>
                          ) : (
                            <dd className=" flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                              <CheckCircleIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              Account not verified
                            </dd>
                          )}
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <div className="mr-2 flex">
                  {cut_buses_Admin_User?.role === "user" ? (
                    <BlueButton
                      text="Add Bus"
                      outline
                      onClick={() =>
                        history.push("/login?redirect=/dashboard/buses/add")
                      }
                    />
                  ) : (
                    <BlueButton
                      text="Add Bus"
                      outline
                      onClick={() => history.push("/dashboard/buses/add")}
                    />
                  )}
                </div>
                <div className="flex">
                  <BlueButton
                    text="Manage Buses"
                    onClick={() => history.push("/dashboard/buses")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card */}
              {dashboard_items?.map((item, index) => (
                <DashboardCard
                  name={item.name}
                  icon={item.icon}
                  location={item.location}
                  amount={user?.status === 'fetching' ? 'loading...' : item.number}
                  loading={false}
                  bg_color={item.bg_color}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          <PassengersActivity />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Home;
