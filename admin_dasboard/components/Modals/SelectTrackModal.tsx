import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@heroicons/react/outline";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { apiUrl } from "../../utils/apiUrl";

type Props = {
  setSelectedRoad: any;
  setMapCoords: any;
  isOpen: any;
  onClose: any;
  onOpen: any;
};

function SelectTrackModal({
  setSelectedRoad,
  setMapCoords,
  isOpen,
  onClose,
  onOpen,
}: Props) {
  const [search_query, setSearchQuery] = useState<string>("");
  const history = useRouter();
  const [searched_results, setSeatrchResults] = useState<any>();

  const search_handler = async () => {
    const { data } = await axios.get(
      `${apiUrl}/api/routes/get?keyword=${search_query}`
    );
    setSeatrchResults(data);
    console.log(data);
  };

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex flex-row items-center">
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded border-none p-2 outline-none md:p-4 "
                placeholder="Search for a route"
              />
              <div onClick={search_handler} className="cursor-pointer">
                <SearchIcon height={20} width={20} className="text-gray-500" />
              </div>
            </div>
            <div className="border-t border-gray-200 bg-white">
              {/* <p className="text-center font-semibold capitalize">
                search results
              </p> */}
              {search_query === "" ? (
                <p className="py-3 text-center text-gray-400">
                  Nothing has been searched
                </p>
              ) : (
                <div className="flex flex-col">
                  {searched_results?.length < 1 ? (
                    <p className="py-3 text-center text-gray-400">
                      No results found
                    </p>
                  ) : (
                    <>
                      {searched_results?.all_routes?.map(
                        (item: any, index: number) => (
                          <div
                            onClick={() => {
                              setSelectedRoad({
                                name: item?.road_name,
                                id: item?._id,
                              });
                              setMapCoords(item.coords);
                              onClose();
                              console.log(item);
                            }}
                            key={index}
                            className="flex cursor-pointer flex-row items-center p-2  hover:bg-gray-100"
                          >
                            {/* <Avatar src={item.picture}   rounded={"md"} /> */}

                            <div className="flex flex-col pl-4">
                              <Text
                                noOfLines={1}
                                className="font-semibold text-gray-800"
                              >
                                {item.road_name}
                              </Text>
                              <div className="flex">
                                <p className="text-sm text-gray-400 font-semibold mr-2">
                                  Length:{" "}
                                </p>
                                <Text
                                  noOfLines={1}
                                  className="text-sm text-gray-400"
                                >
                                  {Math.round(
                                    (item.road_length + Number.EPSILON) * 100
                                  ) / 100}
                                </Text>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      <div className="my-1"></div>
                      {searched_results?.length > 8 && (
                        <Link href={"/eplore"}>
                          <a className="pt-2capitalize flex cursor-pointer flex-col border-t border-gray-300 text-center text-gray-500">
                            View all results
                          </a>
                        </Link>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Add New Route</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SelectTrackModal;
