import { useEffect, useState } from "react";

export const useCurrentLocation = () => {
  const [current_location, setCurrentlocation] = useState({
    lng: null,
    lat: null,
  });

  useEffect(() => {
    const getInitialCoordinates = async () => {
      await navigator.geolocation.getCurrentPosition(
        (pos) =>
        setCurrentlocation({
            lng: pos.coords.longitude,
            lat: pos.coords.latitude,
          }),

        (err) => console.log(err)
      );
    };
    getInitialCoordinates();
  }, []);

  return current_location;
};

export default useCurrentLocation;
