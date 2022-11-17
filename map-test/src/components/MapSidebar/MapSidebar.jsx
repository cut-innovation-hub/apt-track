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
import not_found from "../../assets/svgs/not_found.svg";
import { data } from "../../pages/data";
import { searchAreaFromMapbox } from "../../utils/mapbox-functions";
import MapSidebarSearch from "./MapSidebarSearch";

function MapSidebar({ bus_stops, bus_stop_loading }) {
  const [location, setLocation] = useState("");
  const [searched_routes, setSearchedRoutes] = useState(null);
  const { state: state_store, dispatch } = useContext(Store);
  const { selected_road_id } = state_store;
  const [selected_travel_type, setSelectedTravelType] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

  const hard_corded_coords = {
    lng: 30.1777657,
    lat: -17.3829378,
  };

  const set_search_query = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/api/routes/get`;
    const { data } = await axios.get(`${url}?keyword=${location}`);
    setSearchedRoutes(data);
    dispatch({ type: "SET_SELECTED_ROAD_ID", payload: null });
  };

  const search_from_mapbox = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/api/bus-stop/all`;
    const { data } = await axios.get(`${url}?keyword=${query}`);
    const map_box_results = await searchAreaFromMapbox(query, hard_corded_coords);
    setSearchedRoutes(data)
    setSuggestions(map_box_results.suggestions);
  };
  const buses_url = `${apiUrl}/api/bus/get/all?bus_route=${selected_road_id}`;
  const state = useFetch(buses_url);

  return (
    <div className="flex flex-col">
      <form onSubmit={search_from_mapbox} className="flex flex-col">
        <div className="flex flex-row items-center space-x-2">
          <>
            <MapSidebarSearch
              results_from_api={searched_routes}
              query={query}
              setQuery={setQuery}
              location={location}
              setSuggestions={setSuggestions}
              suggestions={suggestions}
              setLocation={setLocation}
            />
          </>
          <div className="flex ml-auto ">
            <button
              type="submit"
              className="hidden bg-blue-900 hover:bg-blue-800 cursor-pointer text-white p-2 rounded text-sm"
            >
              Go
            </button>
          </div>
        </div>
      </form>
      <div className="flex w-full flex-row justify-between space-x-4 py-4 ">
        {data.travel_methods.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedTravelType(item.value);
            }}
            className={`${
              selected_travel_type === item.value
                ? "border-2 border-blue-900 bg-gray-200 text-blue-900 "
                : "border-2 border-gray-100 bg-gray-100 text-gray-700 "
            }flex flex-1 bg-gray-100 hover:bg-gray-200 cursor-pointer font-semibold  p-2 rounded-lg text-sm text-center`}
          >
            <p className="text-center mx-auto">{item.title}</p>
          </div>
        ))}
      </div>
      <>
        {selected_road_id ? (
          <div className="flex flex-col">
            <p className="text-sm text-gray-700 font-semibold text-center py-2 capitalize">
              Buses Travelling On Road
            </p>
            {state?.data?.all_buses?.length < 1 ? (
              <div className="flex text-gray-700 flex flex-col items-center py-4 text-sm text-center font-semibold w-full">
                <img
                  src={not_found}
                  alt="vehicle not found"
                  height={70}
                  width={70}
                />
                <p className="text-center pt-2 capitalize">
                  No Buses Going there at the moment
                </p>
              </div>
            ) : (
              <>
                {state?.data?.all_buses?.map((item, index) => (
                  <SingleBusItem single_bus={item} key={index} />
                ))}
              </>
            )}

            <div className="flex flex-row items-center text-sm font-semibold text-gray-700 space-x-4 py-4">
              <Divider />
              <p>Or</p>
              <Divider />
            </div>
            <p className="text-sm text-gray-700 font-semibold text-center py-2 capitalize">
              Choose different road
            </p>
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
