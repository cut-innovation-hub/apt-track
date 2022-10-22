import { Divider } from "@chakra-ui/react";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Store } from "../../context/Store";
import { useFetch } from "../../hooks/useFetch";
import { apiUrl } from "../../utils/apiUrl";
import BusStopComponent from "../BusStopComponent/BusStopComponent";
import SideBarBusStopLoading from "../Loading/SideBarBusStopLoading";
import RouteSidebarComponent from "../RouteSidebarComponent/RouteSidebarComponent";
import SingleBusItem from "../SingleBusItem/SingleBusItem";
import not_found from '../../assets/svgs/not_found.svg'

function MapSidebar({ bus_stops, bus_stop_loading }) {
  const [location, setLocation] = useState("");
  const [searched_routes, setSearchedRoutes] = useState(null);
  const { state: state_store, dispatch } = useContext(Store);
  const { selected_road_id } = state_store;

  const set_search_query = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/api/routes/get`;
    const { data } = await axios.get(`${url}?keyword=${location}`);
    setSearchedRoutes(data);
    dispatch({type: 'SET_SELECTED_ROAD_ID', payload: null})
  };

  const buses_url = `${apiUrl}/api/bus/get/all?bus_route=${selected_road_id}`;
  const state = useFetch(buses_url);

  return (
    <div className="flex flex-col">
      <form onSubmit={set_search_query} className="flex py-2 flex-col">
        <p className="text-sm font-semibold pb-2 text-center">
          Where do you want to go
        </p>
        <div className="flex flex-row items-center p-2 bg-gray-100 rounded-lg text-gray-600 space-x-2">
          <LocationMarkerIcon height={20} width={20} />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location "
            className="bg-none bg-gray-100 outline-none w-full"
          />
        </div>
        <div className="flex ml-auto mt-2">
          <button
            type="submit"
            className="flex bg-blue-900 hover:bg-blue-800 cursor-pointer text-white p-2 rounded text-xs"
          >
            Go
          </button>
        </div>
      </form>
      <>
        {selected_road_id ? (
          <div className="flex flex-col">
            <p className="text-sm text-gray-700 font-semibold text-center py-2 capitalize">
              Buses Travelling On Road
            </p>
           {
             state?.data?.all_buses?.length < 1 ?(
               <div className="flex text-gray-700 flex flex-col items-center py-4 text-sm text-center font-semibold w-full">
                 <img src={not_found} alt="vehicle not found" height={70} width={70} />
                 <p className="text-center pt-2 capitalize">No Buses Going there at the moment</p>
               </div>
             ):(
               <>
                {state?.data?.all_buses?.map((item, index) => (
              <SingleBusItem single_bus={item} key={index} />
            ))}
               </>
             )
           }


            <div className="flex flex-row items-center text-sm font-semibold text-gray-700 space-x-4 py-4">
              <Divider />
              <p>Or</p>
              <Divider />
            </div>
            <p className="text-sm text-gray-700 font-semibold text-center py-2 capitalize">Choose different road</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-700 font-semibold text-center py-2 capitalize">
              {searched_routes ? (
                <p>Click on road to find buses</p>
              ) : (
                <p>Bus Stops Near You</p>
              )}
            </p>
          </>
        )}
      </>

      <div className="grid grid-cols-1 divide-y divide-gray-100">
        {bus_stop_loading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <SideBarBusStopLoading key={index} />
            ))}
          </>
        ) : (
          <>
            {searched_routes ? (
              <>
                {searched_routes?.all_routes?.length < 1 ? (
                  <>
                    <p className="text-center text-gray-700 font-semibold p-2 w-full capitalize">
                      No Roads Found
                    </p>
                  </>
                ) : (
                  <>
                    {searched_routes?.all_routes?.map((item, index) => (
                      <RouteSidebarComponent
                        road_id={item._id}
                        key={index}
                        picture={item.picture}
                        name={item.road_name}
                        length={item.road_length}
                        coords={item.coords}
                      />
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
                {bus_stops?.map((item, index) => (
                  <BusStopComponent
                    key={index}
                    picture={item.picture}
                    name={item.name}
                    distance={6}
                    coords={item.coords}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MapSidebar;
