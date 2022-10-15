const mongoose = require("mongoose");

// user schema
/**
 * @param email - email of user
 * @param password - encrypted password of user
 * @param role - the role of the user
 * @param emailApproved - user has recived email and confirmed
 * @param terms_agreed - user has agreed to the terms and conditions
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "driver", "admin", "bus_admin"],
      default: "user",
    },
    emailApproved:{
      type: Boolean,
      default: true
    },
    terms_agreed:{
      type: Boolean,
      required: true,
      default: false
    },
    email_key:{
      type: String,
      required: [true, 'there is no key']
    },
    email_key_success:{
      type: String,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
