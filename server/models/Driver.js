const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    picture: {
      type: String,
    },
    name: {
      type: String,
      default: true,
    },
    id_number: {
      type: String,
      default: true,
    },
    gender: {
      type: String,
      default: "",
    },
    bus: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
    createdBy:{
        type: String,
        required: true
    },
    phone_number:{
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Driver", driverSchema);
