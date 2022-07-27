const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    // the user who created this company
    user_id: {
      type: String,
      required: true,
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
    // phone number of the company
    phone_number: {
      type: String,
      required: true,
    },

    // additional phone number of the compant
    phone_number_2: {
      type: String,
    },

    // boolean to see if company has paid or not
    is_paid: {
      type: String,
      required: true,
    },

    // id representing subscription package
    package: {
      type: String,
      required: true,
    },

    // to see when the compan will pay next
    next_paymeny_date: {
      type: Date,
    },

    // check if account has been approved or not
    approved: {
      type: Boolean,
      default: false,
    },

    notification_type:{
        type:String,
        required: [true, 'Please neter a notifiation type']
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Owner", ownerSchema);
