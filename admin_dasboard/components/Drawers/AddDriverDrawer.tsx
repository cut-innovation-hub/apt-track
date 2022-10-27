import React, { useContext, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Select,
  Divider,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { Store } from "../../context/Store";
import { getError } from "../../utils/getError";
import SelectBusModal from "../Modals/SelectBusModal";
import UploadImage from "../UploadComponents/UploadImage";
import SingleBusComponent from "../SingleBusComponent/SingleBusComponent";

type Props = {
  onOpen:any
  onClose:any
  isOpen:any
};

const AddDriverDrawer = ({onOpen,onClose,isOpen}: Props) => {
  const { state: store_state } = useContext(Store);
  const { cut_buses_Admin_User } = store_state;
  const [save_loading, setSaveLoading] = useState(false);

  // form fields
  const [name, setName] = useState("");
  const [user_id, setUserId] = useState("");
  const [driver_picture, setDriverPicture] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [bus, setBus] = useState<any>(null);
  const toast = useToast();

  console.log("bus info", bus);

  const save_Info = async () => {
    try {
      setSaveLoading(true);
      const { data } = await axios.post(
        `${apiUrl}/api/driver/create`,
        {
          name: name,
          picture: driver_picture,
          gender: gender,
          id_number: user_id,
          bus: bus._id,
          phone_number: number,
        },
        {
          headers: {
            Authorization: cut_buses_Admin_User?.token,
          },
        }
      );
      toast({
        title: "Driver Added.",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      setSaveLoading(false);
    } catch (error) {
      setSaveLoading(false);
      toast({
        title: getError(error),
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      console.log(getError(error));
    }
  };

  return (
    <>
     
      <Drawer size={"xl"} isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a driver</DrawerHeader>
          <DrawerBody>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 space-y-4">
              <div className="col-span-2">
                <UploadImage
                  setPictureForUpload={setDriverPicture}
                  folder_name={"Drivers"}
                />
              </div>
              <div className="col-span-1">
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="name"
                    className="text-gray-700 text-sm font-semibold"
                  >
                    Name
                  </label>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"
                    placeholder="Enter Name ..."
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="user_id"
                    className="text-gray-700 text-sm font-semibold"
                  >
                    National ID
                  </label>
                  <Input
                    onChange={(e) => setUserId(e.target.value)}
                    name="user_id"
                    id="user_id"
                    placeholder="Enter National Id"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="gender"
                    className="text-gray-700 text-sm font-semibold"
                  >
                    Gender
                  </label>
                  <Select
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="Select gender"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Select>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="phone_number"
                    className="text-gray-700 text-sm font-semibold"
                  >
                    Phone Number
                  </label>
                  <Input
                    onChange={(e) => setNumber(e.target.value)}
                    name="phone_number"
                    id="phone_number"
                    placeholder="Enter User Phone Number"
                  />
                </div>
              </div>
              <div className="col-span-1">
                {bus ? (
                  <div className="flex flex-col w-full">
                    <SingleBusComponent
                      single_bus={bus}
                      onClick={() => console.log("bus already selected")}
                    />
                    <div className="flex w-full space-x-4 flex-row items-center">
                      <Divider />
                      <p>Or</p>
                      <Divider />
                    </div>
                    <div className="text-gray-700 m-1 tex-center ">
                      Pick Different Bus
                    </div>
                    <SelectBusModal setBus={setBus} />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col space-y-1 w-full">
                      <label
                        htmlFor="phone_number"
                        className="text-gray-700 text-sm font-semibold"
                      >
                        Select Bus (Optional)
                      </label>
                      <SelectBusModal setBus={setBus} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <Button
              isLoading={save_loading}
              onClick={save_Info}
              type="submit"
              form="my-form"
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddDriverDrawer;
