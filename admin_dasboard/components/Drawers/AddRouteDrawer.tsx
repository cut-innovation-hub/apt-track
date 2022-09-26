import React, { useState } from "react";
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
} from "@chakra-ui/react";
import ReactMapGL, {
  Marker,
  Source,
  Layer,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocationMarkerIcon } from "@heroicons/react/solid";
// added the following 6 lines.
import mapboxgl from "mapbox-gl";

type Props = {};

const AddRouteDrawer = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

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

  function handleClick(event: any) {
    // var lngLat = event.lngLat;
    setLatitude(event?.lngLat?.lat);
    setLongitude(event?.lngLat?.lng);
    console.log(`long -- ${longitude} : lat -- ${latitude}`);
  }
  return (
    <>
      <div
        onClick={onOpen}
        className="bg-blue-700 text-white p-2 rounded font-semibold hover:bg-blue-800 cursor-pointer"
      >
        Add A Route
      </div>
      <Drawer size={"xl"} isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a road</DrawerHeader>
          <DrawerBody>
            <form
              id="my-form"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submitted");
              }}
              className=""
            >
              <Input name="nickname" placeholder="Search location ..." />
            </form>
            <p className="text-center py-2 text-gray-700 ">Select the precide location of your route below</p>

            <ReactMapGL
              style={{ width: "100%", height: 600 }}
              onClick={handleClick}
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
              {longitude && (
                <Marker
                  longitude={longitude}
                //   @ts-ingore
                  latitude={latitude}
                  anchor="bottom"
                >
                  <LocationMarkerIcon
                    height={20}
                    width={20}
                    className="text-red-600"
                  />
                </Marker>
              )}
              <GeolocateControl />
            </ReactMapGL>
          </DrawerBody>

          <DrawerFooter>
            <Button type="submit" form="my-form">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddRouteDrawer;
