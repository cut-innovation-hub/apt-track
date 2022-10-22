const express = require("express");
const { createADriver, getAllCompanyDrivers } = require("../../controllers/driverController");
const { requireBusOwnerSignIn } = require("../../middleware/require_auth");
const router = express.Router();

// create a driver schema
// post request
// /api/driver/create
router.post("/create", requireBusOwnerSignIn, createADriver);

// get all drivers
// get request
// /api/driver/company/all
router.get("/company/all", requireBusOwnerSignIn,getAllCompanyDrivers);

module.exports = router;
