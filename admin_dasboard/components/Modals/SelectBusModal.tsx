import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { SearchIcon } from "@heroicons/react/outline";
import { Store } from "../../context/Store";
import SingleBusComponent from "../SingleBusComponent/SingleBusComponent";

type Props = {
  setBus?: any;
};

function SelectBusModal({ setBus }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search_query, setSearchQuery] = useState<string>("");
  const [searched_results, setSeatrchResults] = useState<any>();
  const { state: store_state } = useContext(Store);
  const { cut_buses_Admin_User } = store_state;

  const token = cut_buses_Admin_User?.token;
  const url = `${apiUrl}/api/bus/company/all?keyword=${search_query}`;

  const search_handler = async () => {
    const { data } = await axios.get(`${url}`, {
      headers: {
        Authorization: token,
      },
    });
    setSeatrchResults(data);
  };

  return (
    <>
      <div
        onClick={onOpen}
        className="flex border border-gray-200 p-2 cursor-pointer hover:bg-gray-100 rounded-full flex-col w-full text-center"
      >
        Select Bus
      </div>

      <Modal isOpen={isOpen} isCentered onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="capitalize">
            Assign a bus to the driver
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-row items-center p-2 md:p-4 mb-2  bg-gray-100 rounded">
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border-none  outline-none  bg-gray-100 "
                placeholder="Search for a bus"
              />
              <div onClick={search_handler} className="cursor-pointer">
                <SearchIcon height={20} width={20} className="text-gray-500" />
              </div>
            </div>
            {searched_results?.all_buses?.map((item: any, index: number) => (
              <SingleBusComponent
                key={index}
                single_bus={item}
                onClick={() => {
                  setBus(item);
                  onClose();
                }}
              />
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Add New Bus</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SelectBusModal;
