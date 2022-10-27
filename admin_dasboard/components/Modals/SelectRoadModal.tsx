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
import RouteComponent from "../RouteComponent/RouteComponent";

type Props = {
  setRoad?: any;
  selected_road?: any;
};

function SelectRoadModal({ setRoad, selected_road }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search_query, setSearchQuery] = useState<string>("");
  const [searched_results, setSeatrchResults] = useState<any>();
  const { state: store_state } = useContext(Store);
  const { cut_buses_Admin_User } = store_state;

  const token = cut_buses_Admin_User?.token;
  const url = `${apiUrl}/api/routes/get?keyword=${search_query}`;

  const search_handler = async () => {
    const { data } = await axios.get(`${url}`);
    setSeatrchResults(data);
    console.log(data);
  };
  return (
    <>
      <div
        onClick={onOpen}
        className="flex border border-gray-200 p-2 cursor-pointer hover:bg-gray-100 rounded-full flex-col w-full text-center"
      >
        {selected_road ? "Select A Different Road " : "Select A Road"}
      </div>

      <Modal isOpen={isOpen} isCentered onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="capitalize">
            {selected_road ? "Select A Different Road " : "Assign A Road"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-row items-center p-2 md:p-4 mb-2  bg-gray-100 rounded">
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border-none  outline-none  bg-gray-100 "
                placeholder="Search for a road"
              />
              <div onClick={search_handler} className="cursor-pointer">
                <SearchIcon height={20} width={20} className="text-gray-500" />
              </div>
            </div>
            {searched_results?.all_routes?.map((item: any, index: number) => (
              <RouteComponent
                key={index}
                single_road={item}
                onClick={() => {
                  setRoad(item);
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

export default SelectRoadModal;
