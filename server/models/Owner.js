const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    // the user who created this company
    user_id: {
      type: String,
    },
    // email of the company
    email: {
      type: String,
      required: true,
    },
    // password of the company to enter their dashboard
    password: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: [true, "Please specify a company name"],
    },
    // phone number of the company
    phone_number: {
      type: String,
    },

    // additional phone number of the compant
    phone_number_2: {
      type: String,
    },

    // boolean to see if company has paid or not
    is_paid: {
      type: String,
    },

    // id representing subscription package
    package: {
      type: String,
    },

    // to see when the compan will pay next
    next_paymeny_date: {
      type: Date,
    },

    // checking if email if approved
    emailApproved:{
      type: Boolean,
      default: true
    },

    // check if account has been approved or not
    approved: {
      type: Boolean,
      default: false,
    },

    notification_type: {
      type: String,
    },

    role: {
      type: String,
      required: true,
      default: "bus_admin",
    },
    terms_agreed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Owner", ownerSchema);
