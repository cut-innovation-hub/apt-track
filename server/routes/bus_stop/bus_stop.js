const express = require('express')
const { createABusStop, getAllBusStops, getASingleBusStop } = require('../../controllers/busStopController')
const { requireBusOwnerSignIn } = require('../../middleware/require_auth')
const router = express.Router()

// get all bus stops
// get request
// /api/bus-stop/all
router.get('/all', getAllBusStops)

//create a bus stop
// post request
// /api/bus-stop/create
router.post('/create',requireBusOwnerSignIn, createABusStop)

// get a single bus-stop
// get request
// /api/bus-stop/single/{buStopId}
router.get('/single/:id',getASingleBusStop)

module.exports = router