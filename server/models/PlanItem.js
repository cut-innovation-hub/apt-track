const mongoose = require("mongoose");

const planItemSchema = new mongoose.Schema(
  {
    parent_plan: {
      type: String,
      default: [true, "please enter the parent plan"],
    },
    plan_details: {
      type: String,
      required: [true, "Please enter some details about the plan item"],
    },
    plan_status: {
      type: String,
      required: [true, "please enter a plan status"],
      enum: ["available", "un_available"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PlanItem", planItemSchema);
