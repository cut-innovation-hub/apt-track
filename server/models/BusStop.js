const mongoose = require("mongoose");

const busStopSchema = new mongoose.Schema(
  {
    coords: {
      lng: {
        type: String,
      },
      lat: {
        type: String,
      },
    },
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BusStop", busStopSchema);
