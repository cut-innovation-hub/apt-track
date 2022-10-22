import axios from "axios";
import { getRoundedNumber } from "./getRoundedNumber";

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_KEY;

// create a rooute string
export const createRoutesString = (arr) => {
  const routes_string = arr?.toString().replace(/(,[^,]*),/g, "$1;");
  return routes_string;
};

// get the length of the road for walking
export const getWalkingLength = async (string_to) => {
  const { data } = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/walking/${string_to}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${ACCESS_TOKEN}`
  );

  // turn to kilometers
  if (data.routes[0].distance > 1000) {
    return `${getRoundedNumber(data.routes[0].distance / 1000)} km`;
  }
  return `${getRoundedNumber(data.routes[0].distance)} m`;
};

// getthe length of the road for driving
export const getDrivingLength = async (string_to) => {
  const { data } = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${string_to}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${ACCESS_TOKEN}`
  );
  return data.routes[0].distance;
};

// get the time taken for wallking on the road
export const getWalkingRoadTime = async (string_to) => {
  const { data } = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/walking/${string_to}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${ACCESS_TOKEN}`
  );
  return data.routes[0].duration;
};

// get the time taken for driving on the road
export const getDrivingRoadTime = async (string_to) => {
  const { data } = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${string_to}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${ACCESS_TOKEN}`
  );
  return data.routes[0].duration;
};

// get the coodinates for walking on the road
export const getWalikingRoadCoordinates = async (string_to) => {
  const { data } = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/walking/${string_to}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${ACCESS_TOKEN}`
  );
  return data.routes[0].geometry.coordinates;
};

/// get coordinates for road for drivers
export const getDrivingRoadCoordinates = async (string_to) => {
  const { data } = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${string_to}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${ACCESS_TOKEN}`
  );
  return data.routes[0].geometry.coordinates;
};
