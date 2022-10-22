import React, { useState } from "react";
import { PrinterIcon } from "@heroicons/react/outline";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

type Props = {};

const ManageTransactionsTable = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product_name, setProductName] = useState("");
  const [product_id, setProductId] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const confirm_delete_item = async (product_id: string) => {
   console.log('delte item from table')
  }

  const set_delete_item = (id: string, name: string) => {
    onOpen();
    setProductId(id);
    setProductName(name);
  };

  const transaction_data = [
    {name:'1st trans', date:'12/12/2022', amount: 500, type: 'Cash', curr:'USD', status: 'success', id:'1werfg'},
    {name:'bako trans', date:'17/11/2021', amount: 678, type: 'Cash', curr:'USD', status: 'failed',id: '3wefg'},
 

  ]

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
                    Transaction Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Amount
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
                    Currency
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
                    {transaction_data?.map((transaction: any, index: number) => (
                      <>
                        <tr key={index}>
                          <td
                            className="whitespace-nowrap px-6 py-4" >
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="max-w-xs overflow-hidden text-sm font-medium text-gray-900">
                                  {transaction.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {transaction.date}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {transaction.amount}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {transaction.type}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {transaction.curr}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {
                                transaction?.status === 'success' ? (
                                    <span className="inline-flex rounded-full bg-green-700 px-2 text-xs font-semibold leading-5 text-white">
                              {transaction.status}
                            </span>
                                ):(
                                    <span className="inline-flex rounded-full bg-red-700 px-2 text-xs font-semibold leading-5 text-white">
                              {transaction.status}
                            </span>
                                )
                            }
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <div className="flex flex-row items-center space-x-2">
                              <span
                                onClick={() => router.push(`/dashboard/transactions/receipt/${transaction.id}`)}
                                className="cursor-pointer"
                              >
                                <PrinterIcon
                                  height={20}
                                  width={20}
                                  className="text-black-400 "
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
                  <PrinterIcon
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

export default ManageTransactionsTable;