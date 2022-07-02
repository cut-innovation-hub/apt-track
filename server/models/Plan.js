const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    description:{
      type:String,
      default: ''
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", planSchema);
