const express = require("express");
const { createABus, getCompanyBuses, getAllBuses, getSingleBus } = require("../../controllers/busController");
const { requireBusOwnerSignIn } = require("../../middleware/require_auth");
const router = express.Router();

// create a bus
// post request
// /api/bus/create
router.post("/create", requireBusOwnerSignIn, createABus);

// get each company buses
// get request
// /api/bus/company/all
router.get("/company/all", requireBusOwnerSignIn, getCompanyBuses);

// get all buses
// get request
// /api/bus/get/all
router.get("/get/all", getAllBuses);

// get a single bus
// get request
// /api/bus/single?bus_id=asjkdhflkjashdf
router.get("/single", getSingleBus);

module.exports = router;
