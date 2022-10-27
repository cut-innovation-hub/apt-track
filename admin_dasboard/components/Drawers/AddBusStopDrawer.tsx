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
  Divider,
} from "@chakra-ui/react";
import ReactMapGL, {
  Marker,
  Source,
  Layer,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { Store } from "../../context/Store";
import { getError } from "../../utils/getError";
import UploadImage from "../UploadComponents/UploadImage";
import SelectRoadModal from "../Modals/SelectRoadModal";

type Props = {};

function AddBusStopDrawer({}: Props) {
  const { state: store_state } = useContext(Store);
  const { cut_buses_Admin_User } = store_state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [longitude, setLongitude] = useState<any>(null);
  const [latitude, setLatitude] = useState<any>(null);
  const [save_loading, setSaveLoading] = useState(false);
  const [road_name, setRoadName] = useState("");
  const [picture, setPicture] = useState("");
  const [road, setRoad] = useState<any>();

  const [state, setState] = useState({
    latitude: null,
    longitude: null,
    zoom: 13.8,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    width: 600,
    height: 600,
  });

  const save_Info = async () => {
    try {
      setSaveLoading(true);
      const { data } = await axios.post(
        `${apiUrl}/api/bus-stop/create`,
        {
          route_slug: "slug",
          name: road_name,
          lng: longitude,
          lat: latitude,
          picture: picture,
          main_road: road._id,
        },
        {
          headers: {
            Authorization: cut_buses_Admin_User?.token,
          },
        }
      );
      setRoadName("");
      setPicture("");
      console.log("items saved sucessfully!", data);
      setSaveLoading(false);
    } catch (error) {
      setSaveLoading(false);
      console.log(getError(error));
    }
  };

  function handleClick(event: any) {
    // var lngLat = event.lngLat;
    setLatitude(event?.lngLat?.lat);
    setLongitude(event?.lngLat?.lng);
  }

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: road?.coords,
    },
  };

  return (
    <>
      <div
        onClick={onOpen}
        className="flex bg-blue-700 text-white p-2 rounded font-semibold hover:bg-blue-800 cursor-pointer"
      >
        Add Bus Stop
      </div>
      <Drawer size={"xl"} isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add Bus Stop</DrawerHeader>
          <DrawerBody>
            <div className="col-span-2 flex flex-col mb-8">
              <p className="text-center py-2 text-gray-700 ">
                Select a picture for your bus stop
              </p>
              <UploadImage
                setPictureForUpload={setPicture}
                folder_name={"BusStop"}
              />
            </div>
            {road && (
              <p className="text-center bg-gray-100 rounded p-2">
                {road.road_name}
              </p>
            )}

            {road && (
              <div className="flex flex-row items-center space-x-4 py-4">
                <Divider />
                <p>Or</p>
                <Divider />
              </div>
            )}
            <div className="mb-4">
              <SelectRoadModal selected_road={road} setRoad={setRoad} />
            </div>
            <p className="text-center py-2 text-gray-700 ">
              Select the precise location of your bus stop below
            </p>

            <ReactMapGL
              style={{ width: "100%", height: 600 }}
              onDblClick={handleClick}
              onMove={(newViewport: any) => {
                // console.log(newViewport)
                setState(newViewport.viewState);
              }}
              {...state}
              mapStyle={"mapbox://styles/mapbox/basic-v9"}
              mapboxAccessToken={
                process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_ACCESS_TOKEN
              }
            >
              {road && (
                <Source id="polylineLayer" type="geojson" data={dataOne}>
                  <Layer
                    id="lineLayer"
                    type="line"
                    source="my-data"
                    layout={{
                      "line-join": "round",
                      "line-cap": "round",
                    }}
                    paint={{
                      "line-color": "rgba(3, 170, 238, 0.5)",
                      "line-width": 5,
                    }}
                  />
                </Source>
              )}
              {longitude && (
                <>
                  <Marker
                    longitude={longitude}
                    latitude={latitude}
                    anchor="bottom"
                  >
                    <LocationMarkerIcon
                      height={20}
                      width={20}
                      className="text-red-600"
                    />
                  </Marker>
                </>
              )}
              <GeolocateControl />
            </ReactMapGL>
            <div className="mt-4"></div>
            <form
              id="my-form"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submitted");
              }}
              className=""
            >
              <Input
                onChange={(e) => setRoadName(e.target.value)}
                name="nickname"
                placeholder="Give your bus stop a name"
              />
            </form>
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
}

export default AddBusStopDrawer;
