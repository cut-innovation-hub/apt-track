import React, { ReactElement, useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { useDisclosure, Avatar, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { deleteFromArray } from "../../utils/deleteFromArray";
import DeleteModal from "../Modals/DeleteModal";
import Pagination from "../Pagination/Pagination";

const PER_PAGE = 8;

interface Props {
  drivers: any;
  meta_info: any;
  drivers_loading: boolean;
  page: number;
  setPage: any;
  setDrivers: any;
}

function ManageDrivers({
  drivers,
  meta_info,
  drivers_loading,
  page,
  setPage,
  setDrivers,
}: Props): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [driver_name, setDriverName] = useState("");
  const [driver_id, setDriverId] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const confirm_delete_item = async (driver_id: string) => {
    setLoading(true);
    setDrivers(deleteFromArray(driver_id, drivers));
    onClose();
    toast({
      title: "Driver Deleted Sucessfully!",
      status: "success",
      position: "top-right",
      duration: 9000,
      isClosable: true,
    });
    setLoading(false);
  };

  const set_delete_item = (id: string, name: string) => {
    onOpen();
    setDriverId(id);
    setDriverName(name);
  };

  if (drivers_loading) {
    return (
      <div className="grid h-96 w-full items-center content-center justify-center">
        <Spinner size={"xl"} />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        {drivers?.length < 1 ? (
          <p className="text-center text-gray-700 w-full flex-1 capitalize">
            No Items Found
          </p>
        ) : (
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="w-full overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      bus
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <>
                    {drivers?.map((driver: any, index: number) => (
                      <>
                        <tr key={index}>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div
                              onClick={() =>
                                router.push(
                                  `/dashboard/drivers/single/${driver._id}`
                                )
                              }
                              className="flex items-center"
                            >
                              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100">
                                <Avatar
                                  name={driver.name}
                                  src={driver.picture}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="max-w-xs overflow-hidden text-sm font-medium text-gray-900">
                                  {driver.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {driver.id_number}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {driver.gender}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {driver.phone_number}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {driver.bus
                                ? driver.bus.plate_number
                                : "Not Assigned"}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {driver?.bus.bus_status === "on_route" ? (
                              <span className="inline-flex rounded-full  animate-pulse  bg-green-700 px-2 text-xs font-semibold leading-5 text-white">
                                On Route
                              </span>
                            ) : driver?.bus.bus_status === "damaged" ? (
                              <span className="inline-flex rounded-full bg-red-700 px-2 text-xs font-semibold leading-5 text-white">
                                Damaged
                              </span>
                            ) : (
                              <span className="inline-flex rounded-full bg-blue-700 px-2 text-xs font-semibold leading-5 text-white">
                                Stationary
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex flex-row items-center space-x-2">
                              <span
                                onClick={() =>
                                  set_delete_item(driver._id, driver.name)
                                }
                                className="cursor-pointer"
                              >
                                <TrashIcon
                                  height={20}
                                  width={20}
                                  className="text-red-400 "
                                />
                              </span>
                              <span
                                onClick={() =>
                                  router.push(
                                    `/dashboard/inventory/edit/${"product?._id"}`
                                  )
                                }
                                className="cursor-pointer"
                              >
                                <PencilIcon
                                  height={20}
                                  width={20}
                                  className="cursor-pointer text-gray-500"
                                />
                              </span>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                  </>
                </tbody>
              </table>

              <>
                <DeleteModal
                  name={driver_name}
                  loading={loading}
                  isOpen={isOpen}
                  onClose={onClose}
                  onClick={() => confirm_delete_item(driver_id)}
                />
              </>
            </div>
          </div>
        )}
      </div>
      <>
        <Pagination
          className="flex self-center pt-8"
          onPageChange={(page: number) => setPage(page)}
          pageSize={PER_PAGE}
          totalCount={meta_info?.total}
          currentPage={page}
        />
      </>
    </div>
  );
}

export default ManageDrivers;
