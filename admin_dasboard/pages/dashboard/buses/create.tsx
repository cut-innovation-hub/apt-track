import { Select, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import BlueButton from "../../../components/Buttons/BlueButton";
import SelectTrackModal from "../../../components/Modals/SelectTrackModal";
import { Store } from "../../../context/Store";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { apiUrl } from "../../../utils/apiUrl";
import { getError } from "../../../utils/getError";
import RoutesMap from "../../../components/Map/RoutesMap";
import UploadImage from "../../../components/UploadComponents/UploadImage";

type Props = {};

const CreateBus = (props: Props) => {
  const { state } = useContext(Store);
  const { cut_buses_Admin_User } = state;
  const token = cut_buses_Admin_User?.token;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [map_coords, setMapCoords] = useState("");
  const [plate_name, setPlateNumber] = useState("");
  const [driver, setDriver] = useState("");
  const [description, setDescription] = useState("");
  const [bus_type, setBusType] = useState("bus");
  const [bus_picture, setBusPicture] = useState("");
  const [selected_road, setSelectedRoad] = useState<any>({
    name: "",
    id: "",
  });

  const create_a_bus = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${apiUrl}/api/bus/create`,
        {
          number_plate: plate_name,
          driver: driver,
          status: "stationary",
          description: description,
          bus_route: selected_road.id,
          bus_type: bus_type,
          picture: bus_picture
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast({
        title: "Bus Added.",
        description: "Your Bus has been added successfully to the dashboard.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setDescription("");
      setDriver("");
      setBusType("");
      setSelectedRoad(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(getError(error));
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full md:p-8">
        <p className="text-center font-semibold text-gray-800 text-lg capitalize pb-8">
          create a bus
        </p>
        <div className="grid grid-cols-5 md:gap-8 gap-4">
          <div className="col-span-4">
          <label htmlFor="plate" className="text-gray-700 text-md  pb-2">
              Picture Of Vehicle
            </label>
            <UploadImage
              bg_color="bg-white"
              setPictureForUpload={setBusPicture}
              folder_name={"Buses"}
            />
          </div>
          <div className="flex flex-col md:col-span-2 col-span-5">
            <label htmlFor="plate" className="text-gray-700 text-md  pb-2">
              Plate Number
            </label>
            <input
              type="text"
              value={plate_name}
              onChange={(e) => setPlateNumber(e.target.value)}
              className="border border-gray-300 rounded p-2 outline-none"
              placeholder="Enter plate number"
            />
          </div>
          <div className="flex flex-col md:col-span-3 col-span-5">
            <label htmlFor="plate" className="text-gray-700 text-md  pb-2">
              Enter Driver Name
            </label>
            <input
              type="text"
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              className="border border-gray-300 rounded p-2 outline-none"
              placeholder="Enter driver name"
            />
          </div>
          <div className="flex flex-col md:col-span-3 col-span-5">
            <label htmlFor="plate" className="text-gray-700 text-md  pb-2">
              Enter Short Bus Description (Optional)
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded p-2 outline-none"
              placeholder="Enter bus description"
            />
          </div>
          <div className="flex flex-col md:col-span-3 col-span-5">
            <label htmlFor="plate" className="text-gray-700 text-md  pb-2">
              Enter bus type
            </label>
            <Select onChange={(e) => setBusType(e.target.value)} bg={"white"}>
              <option value="bus">bus</option>
              <option value="car">car</option>
              <option value="cycle">cycle</option>
            </Select>
          </div>
          <div className="col-span-5 py-4">
            <div className="border-t border-gray-300 w-full" />
          </div>
          <p className="col-span-5 text-center font-semibold">
            Click the actual locations on the maps provided below
          </p>
          {selected_road?.name ? (
            <div className="flex w-full col-span-5 h-full flex-1 flex flex-col">
              <div className="flex flex-row items-center  pb-2">
                <div className="flex-1"></div>
                <div
                  onClick={onOpen}
                  className="flex bg-blue-900 cursor-pointer hover:bg-blue-800 font-semibold text-white text-sm p-2 rounded"
                >
                  Select Another Road
                </div>
              </div>

              <div className="flex w-full h-full flex-col flex-1">
                <RoutesMap coords={map_coords} />
              </div>
            </div>
          ) : (
            <>
              <div className="col-span-5">
                <div className="flex flex-col">
                  <label htmlFor="route_input text-sm font-semibold">
                    Select the route of your bus below (Editable)
                  </label>
                  <div className="my-2 w-full">
                    <div
                      onClick={onOpen}
                      className="bg-white rounded p-2 w-full outline-none text-gray-500 text-center rounded-full cursor-pointer hover:bg-gray-50 "
                    >
                      <p>Click here to select a road</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col ml-auto py-8">
          <BlueButton
            text={"create a bus"}
            onClick={create_a_bus}
            loading={loading}
          />
        </div>
      </div>

      <>
        <SelectTrackModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          setMapCoords={setMapCoords}
          setSelectedRoad={setSelectedRoad}
        />
      </>
    </DashboardLayout>
  );
};

export default CreateBus;
