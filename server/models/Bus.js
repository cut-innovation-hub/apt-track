const mongoose = require("mongoose");

// schema to represent how to but table will have
const busSchema = new mongoose.Schema(
  {
    bus_number: {
      type: String,
      required: true,
    },
    bus_description: {
      type: String,
      required: true,
    },

    // sensor number to identify the sensor
    bus_sensor_number:{
        type: String,
        required: true
    },

    // addresses are for search query purposes
    destination_address: {
      type: String,
    },
    departure_address: {
      type: String,
    },

    // longitude and litutude from arduino and/or geocoder
    destination_lat: {
      type: String,
      required: true,
    },
    departure_long: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// erxport this schema as Bus .. will show as buses in mongodb
module.exports = mongoose.model("Bus", busSchema);
