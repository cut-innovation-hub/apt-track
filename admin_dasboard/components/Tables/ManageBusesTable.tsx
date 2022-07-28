import React, { ReactElement, useState, useContext } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

type Props = {};

const ManageBusesTable = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product_name, setProductName] = useState("");
  const [product_id, setProductId] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const confirm_delete_item = async (product_id: string) => {
   console.log('delte item from table')
  }

  const set_delete_item = (id: string, name: string) => {
    onOpen();
    setProductId(id);
    setProductName(name);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                    TO/FROM
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
                    quantity
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
                    {[1,2,3,4,5]?.map((product: any, index: number) => (
                      <>
                        <tr key={index}>
                          <td
                            className="whitespace-nowrap px-6 py-4"
                            onClick={() =>
                              router.push(
                                `/product/description/$'{product?._id'}`
                              )
                            }
                          >
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100">
                                {/* <img
                                  className="h-10 w-10 rounded-full"
                                  src={product.pictures[0]}
                                  alt=""
                                /> */}
                                <Avatar name="asd" />
                              </div>
                              <div className="ml-4">
                                <div className="max-w-xs overflow-hidden text-sm font-medium text-gray-900">
                                  {'plate'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {'tatenda'}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {'harare'}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {'bulawayo'}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {'product.countInStock'}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span className="inline-flex rounded-full animate-pulse bg-green-700 px-2 text-xs font-semibold leading-5 text-white">
                              On Route
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex flex-row items-center space-x-2">
                              <span
                                onClick={() =>
                                  set_delete_item('product._id', 'plate')
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
                                    `/dashboard/inventory/edit/${'product?._id'}`
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

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalBody className="flex w-full  flex-col items-center ">
                  <TrashIcon
                    height={80}
                    width={80}
                    className="text-blue-primary "
                  />
                  <p className="my-4 text-center text-lg font-semibold text-gray-800">
                    Delete
                  </p>
                  <p className="text-center">
                    Are you sure you want to delete product with name{" "}
                    {"product_name"}?
                  </p>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    onClick={() => confirm_delete_item(product_id)}
                    colorScheme="red"
                    isLoading={loading}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
      {/* <>
        <Pagination
          className="flex self-center pt-8"
          onPageChange={(page: number) => setPage(page)}
          pageSize={PER_PAGE}
          totalCount={data_info?.total}
          currentPage={page}
        />
      </> */}
    </div>
  );
};

export default ManageBusesTable;
