const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    coords: Array,
    route_slug: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    road_length: {
      type: Number,
    },
    waypoints: Array,
    road_name: {
      type: String,
    },
    route_description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Route", routeSchema);
