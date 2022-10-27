import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import {
  useDisclosure,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Pagination from "../Pagination/Pagination";
import DeleteModal from "../Modals/DeleteModal";
import {deleteFromArray} from '../../utils/deleteFromArray'

const PER_PAGE = 8;

type Props = {
  buses: any;
  meta_info: any;
  setPage: any;
  page: number;
  table_loading: boolean;
  setBuses:any
};

const ManageBusesTable = ({
  buses,
  meta_info,
  setPage,
  page,
  table_loading,
  setBuses
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bus_plate_number, setBusPlateNumber] = useState("");
  const [bus_id, setBusId] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const confirm_delete_item = async (bus_id: string) => {
    setLoading(true);
    setBuses(deleteFromArray(bus_id, buses));
    onClose();
    toast({
      title: "Bus Deleted Sucessfully!",
      status: "success",
      position: "top-right",
      duration: 9000,
      isClosable: true,
    });
    setLoading(false);
  };

  const set_delete_item = (id: string, name: string) => {
    onOpen();
    setBusId(id);
    setBusPlateNumber(name);
  };

  if (table_loading) {
    return (
      <div className="grid h-96 w-full items-center content-center justify-center">
        <Spinner size={"xl"} />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        {buses?.length < 1 ? (
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
                      Plate Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Driver
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      TO/FROM
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Road Length
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
                    {buses?.map((bus: any, index: number) => (
                      <>
                        <tr key={index}>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="max-w-xs overflow-hidden text-sm font-medium text-gray-900">
                                  {bus.plate_number}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {bus.bus_driver}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {bus.bus_type}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {bus.route.road_name}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {bus.route.road_length}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {bus.bus_status === "stationary" ? (
                              <span className="inline-flex rounded-full  bg-blue-700 px-2 text-xs font-semibold leading-5 text-white">
                                Stationary
                              </span>
                            ) : bus.bus_status === "damaged" ? (
                              <span className="inline-flex rounded-full bg-red-700 px-2 text-xs font-semibold leading-5 text-white">
                                Damaged
                              </span>
                            ) : (
                              <span className="inline-flex rounded-full animate-pulse bg-green-700 px-2 text-xs font-semibold leading-5 text-white">
                                On Route
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex flex-row items-center space-x-2">
                              <Menu size={"xs"}>
                                <MenuButton
                                  as={Button}
                                  rightIcon={
                                    <ChevronDownIcon height={16} width={16} />
                                  }
                                >
                                  Actions
                                </MenuButton>
                                <MenuList>
                                  <MenuItem
                                    onClick={() =>
                                      set_delete_item(bus._id, bus.plate_number)
                                    }
                                  >
                                    Delete
                                  </MenuItem>
                                  <MenuItem>Edit Details</MenuItem>
                                </MenuList>
                              </Menu>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                  </>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <>
        <DeleteModal
          name={bus_plate_number}
          onClick={() => confirm_delete_item(bus_id)}
          loading={loading}
          isOpen={isOpen}
          onClose={onClose}
        />
      </>
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
};

export default ManageBusesTable;
