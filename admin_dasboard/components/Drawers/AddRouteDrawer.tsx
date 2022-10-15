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
  // for popover
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
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
import LocationPopOver from "../PopOvers/LocationPopOver";
import BlueButton from "../Buttons/BlueButton";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { Store } from "../../context/Store";
import { getError } from "../../utils/getError";

const ACCESS_TOKEN =
  "pk.eyJ1IjoidGF0ZW5kYXp3IiwiYSI6ImNsNXRmZWhmaDBnbXIzcHAzbXRpazN5MjgifQ.eWtGUzOKvmZlA3VKEF5W_A";

type Props = {};

const AddRouteDrawer = (props: Props) => {
  const { state: store_state } = useContext(Store);
  const { cut_buses_Admin_User } = store_state;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [road_loading, setRoadLoading] = useState(false);
  const [route_coords, setRouteCoords] = useState<any>([]);
  const [routes_string, setRouteString] = useState<any>();
  const [markers_set, setMarkersSet] = useState<any>(null);
  const [road_coords, setRoadCoords] = useState<any>(null);
  const [save_loading, setSaveLoading] = useState(false);
  const [road_name, setRoadName] = useState("");

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

  const calculate_road = async () => {
    try {
      if (route_coords?.length <= 1) {
        console.log("one or more positions must be selected");
        return;
      }
      setRoadLoading(true);
      const { data } = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${routes_string}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${ACCESS_TOKEN}`
      );

      setRoadLoading(false);
      setMarkersSet(data);
      setRoadCoords(data);

      // console.log(markers_set)

      //   console.log(
      //     data?.routes[0]?.geometry?.coordinates
      //       .toString()
      //       .replace(/(,[^,]*),/g, "$1;")
      //   );
      console.log(road_coords);
    } catch (error) {
      setRoadLoading(false);
      console.log(getError(error));
    }
  };

  const save_Info = async () => {
    try {
      setSaveLoading(true);
      const { data } = await axios.post(
        `${apiUrl}/api/routes/create`,
        {
          coords: road_coords?.routes[0]?.geometry?.coordinates,
          route_slug: "slug",
          length: road_coords?.routes[0]?.distance,
          waypoints: road_coords?.waypoints,
          road_name: road_name
        },
        {
          headers: {
            Authorization: cut_buses_Admin_User?.token,
          },
        }
      );
      console.log("items saved sucessfully!", data);
      setSaveLoading(false);
    } catch (error) {
      setSaveLoading(false);
      console.log(getError(error));
    }
  };

  // const dataOne = {
  //   type: "Feature",
  //   properties: {},
  //   geometry: {
  //     type: "LineString",
  //     coordinates: [
  //       // [ ln,  lat]
  //       [30.168382, -17.388683],
  //       [30.168382, -17.388683],
  //       [30.168779, -17.389303],
  //       [30.169423, -17.390235],
  //       [30.169932, -17.391043],
  //       [30.169997, -17.391212],
  //       [30.169984, -17.391342],
  //       [30.170018, -17.391386],
  //       [30.17009, -17.391407],
  //       [30.17019, -17.391402],
  //       [30.170343, -17.391372],
  //       [30.170415, -17.391366],
  //       [30.170505, -17.391367],
  //       [30.170658, -17.391389],
  //       [30.170879, -17.391377],
  //       [30.171177, -17.39133],
  //       [30.171177, -17.39133],
  //       [30.171531, -17.391822],
  //       [30.171531, -17.391822],
  //       [30.172207, -17.391335],
  //       [30.173868, -17.390199],
  //       [30.175197, -17.389229],
  //       [30.177653, -17.38754],
  //       [30.17813, -17.387243],
  //       [30.178356, -17.38713],
  //       [30.178687, -17.386943],
  //       [30.179796, -17.386485],
  //       [30.180543, -17.386237],
  //       [30.181303, -17.386056],
  //       [30.18209, -17.385908],
  //       [30.183046, -17.385812],
  //       [30.183371, -17.385782],
  //       [30.183506, -17.385766],
  //       [30.183902, -17.385704],
  //       [30.184321, -17.385624],
  //       [30.184542, -17.385553],
  //       [30.184663, -17.385517],
  //       [30.184832, -17.385446],
  //       [30.185122, -17.38533],
  //       [30.185355, -17.385205],
  //       [30.185792, -17.384926],
  //       [30.186154, -17.384634],
  //       [30.186592, -17.384163],
  //       [30.186997, -17.383602],
  //       [30.187112, -17.383257],
  //       [30.187284, -17.382825],
  //       [30.187583, -17.381966],
  //       [30.187683, -17.381715],
  //       [30.187781, -17.381518],
  //       [30.187852, -17.38137],
  //       [30.188099, -17.38096],
  //       [30.188279, -17.380723],
  //       [30.188493, -17.380472],
  //       [30.188724, -17.380265],
  //       [30.188898, -17.380119],
  //       [30.189089, -17.379975],
  //       [30.190105, -17.379236],
  //       [30.190255, -17.379115],
  //       [30.190405, -17.378972],
  //       [30.190604, -17.378798],
  //       [30.190926, -17.378424],
  //       [30.191516, -17.377618],
  //       [30.192154, -17.37674],
  //       [30.192224, -17.37663],
  //       [30.192567, -17.376149],
  //       [30.192723, -17.375872],
  //       [30.192846, -17.375603],
  //       [30.192983, -17.375273],
  //       [30.193096, -17.37494],
  //       [30.193208, -17.374426],
  //       [30.19328, -17.374066],
  //       [30.19336, -17.373629],
  //       [30.193463, -17.373192],
  //       [30.193579, -17.372757],
  //       [30.193678, -17.37248],
  //       [30.193777, -17.372229],
  //       [30.193943, -17.371927],
  //       [30.194144, -17.371597],
  //       [30.194359, -17.371323],
  //       [30.194488, -17.371175],
  //       [30.194716, -17.370957],
  //       [30.195335, -17.370471],
  //       [30.195496, -17.370338],
  //       [30.196733, -17.369467],
  //       [30.197562, -17.368871],
  //       [30.197841, -17.36864],
  //       [30.19805, -17.3684],
  //       [30.19831, -17.368085],
  //       [30.198522, -17.367739],
  //       [30.198731, -17.367348],
  //       [30.198841, -17.367115],
  //       [30.198922, -17.366882],
  //       [30.199042, -17.36637],
  //       [30.199082, -17.36604],
  //       [30.19909, -17.365717],
  //       [30.199066, -17.36521],
  //       [30.198899, -17.36382],
  //       [30.198849, -17.363334],
  //       [30.198772, -17.362698],
  //       [30.198734, -17.362261],
  //       [30.198712, -17.362033],
  //       [30.19865, -17.361533],
  //       [30.198482, -17.360339],
  //       [30.19846, -17.360162],
  //       [30.198327, -17.359011],
  //       [30.19829, -17.358596],
  //       [30.19829, -17.358596],
  //       [30.199239, -17.358489],
  //       [30.200065, -17.358369],
  //       [30.200212, -17.358339],
  //       [30.200479, -17.358285],
  //       [30.201019, -17.358114],
  //       [30.201271, -17.358019],
  //       [30.201482, -17.357926],
  //       [30.201816, -17.357756],
  //       [30.202159, -17.357584],
  //       [30.202668, -17.3573],
  //       [30.202701, -17.357282],
  //       [30.204079, -17.35657],
  //       [30.204452, -17.356422],
  //       [30.204837, -17.356313],
  //       [30.205099, -17.356278],
  //       [30.205366, -17.356255],
  //       [30.205734, -17.356277],
  //       [30.20584, -17.356281],
  //       [30.206016, -17.356274],
  //       [30.206202, -17.356324],
  //       [30.206303, -17.356354],
  //       [30.206526, -17.356428],
  //       [30.206673, -17.356464],
  //       [30.206673, -17.356464],
  //       [30.206925, -17.355917],
  //       [30.206925, -17.355917],
  //       [30.207057, -17.355953],
  //       [30.207176, -17.355963],
  //       [30.207265, -17.355942],
  //       [30.207334, -17.355912],
  //       [30.207427, -17.35583],
  //       [30.207518, -17.355734],
  //       [30.20762, -17.355558],
  //       [30.207688, -17.355355],
  //       [30.207802, -17.355062],
  //       [30.207954, -17.354488],
  //       [30.208073, -17.353792],
  //       [30.208159, -17.353323],
  //       [30.208269, -17.352958],
  //       [30.208425, -17.352579],
  //       [30.208561, -17.352251],
  //       [30.208636, -17.352059],
  //       [30.208706, -17.351877],
  //       [30.208768, -17.351616],
  //       [30.208811, -17.351322],
  //       [30.208901, -17.350968],
  //       [30.20895, -17.350792],
  //       [30.209044, -17.350656],
  //       [30.209149, -17.350515],
  //       [30.209296, -17.350367],
  //       [30.209562, -17.350208],
  //       [30.209878, -17.349974],
  //       [30.209878, -17.349974],
  //       [30.209728, -17.349824],
  //       [30.209683, -17.349795],
  //       [30.209624, -17.349786],
  //       [30.209267, -17.349756],
  //       [30.208736, -17.3497],
  //     ],
  //   },
  // };

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: road_coords?.routes[0]?.geometry?.coordinates,
    },
  };

  function handleClick(event: any) {
    // var lngLat = event.lngLat;
    setLatitude(event?.lngLat?.lat);
    setLongitude(event?.lngLat?.lng);
    setRouteCoords([...route_coords, [event?.lngLat?.lng, event?.lngLat?.lat]]);
    setRouteString(route_coords?.toString().replace(/(,[^,]*),/g, "$1;"));
    console.log(route_coords.toString().replace(/(,[^,]*),/g, "$1;"));
  }
  return (
    <>
      <div
        onClick={onOpen}
        className="flex bg-blue-700 text-white p-2 rounded font-semibold hover:bg-blue-800 cursor-pointer"
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
            <p className="text-center py-2 text-gray-700 ">
              Select the precide location of your route below
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
              {markers_set && (
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
                  {route_coords?.map((item:any, index:number) => (
                    <Marker
                      key={index}
                      longitude={item[0]}
                      latitude={item[1]}
                      anchor="bottom"
                    >
                      <LocationMarkerIcon
                        height={20}
                        width={20}
                        className="text-red-600"
                      />
                    </Marker>
                  ))}
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
                placeholder="Give your route a name"
              />
            </form>
            <div className="flex flex-row items-center w-full my-4">
              {/* <div className="flex flex-col p-2 text-center rounded font-semibold cursor-pointer hover text-white bg-blue-900 text-sm">
                    Calculate Route
                </div> */}
              <div className="flex-"></div>
              <BlueButton
                loading={road_loading}
                onClick={calculate_road}
                text={"Calculate Route"}
              />
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

export default AddRouteDrawer;
