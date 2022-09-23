<GeolocateControl
  style={geolocateControlStyle}
  positionOptions={{ enableHighAccuracy: true }}
  trackUserLocation={true}
  onGeolocate={(position) => {
    // get latitude and longitude of user current location
    setNewLocation([position.coords.latitude, position.coords.longitude]);
  }}
/>