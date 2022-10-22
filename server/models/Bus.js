const mongoose = require("mongoose");

// schema to represent how to but table will have
const busSchema = new mongoose.Schema(
  {
    plate_number: {
      type: String,
      required: true,
    },
    bus_description: {
      type: String,
      required: true,
    },
    bus_driver: {
      type: String,
    },

    // sensor number to identify the sensor
    bus_sensor_number: {
      type: String,
    },
    bus_owner: {
      type: String,
      required: true,
    },
    bus_status: {
      type: String,
      default: ['stationary', 'on_route', 'damaged']
    },
    bus_route:{
      type: String,
      default: ''
    },
    bus_type:{
      type: String
    },
    picture: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
  }
);

// erxport this schema as Bus .. will show as buses in mongodb
module.exports = mongoose.model("Bus", busSchema);
