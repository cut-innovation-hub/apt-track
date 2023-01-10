const express = require("express");
const { createADriver, getAllCompanyDrivers, getSingleDriver } = require("../../controllers/driverController");
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

// get a single driver
// get request
// /api/driver/single?bus_id=asjkdhflkjashdf
router.get('/single', getSingleDriver)

module.exports = router;
