const express = require("express");
const { createABus, getCompanyBuses, getAllBuses } = require("../../controllers/busController");
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

module.exports = router;
