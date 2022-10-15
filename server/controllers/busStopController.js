const BusStop = require("../models/BusStop");

//create a bus stop
// post request
// /api/bus-stop/create
exports.createABusStop = async (req, res, next) => {
  try {
    const { name, lng, lat } = req.body; // values from client
    const _user = req.user; // user who created the bus stop

    // the new bus - stop object from the bus stop schema
    const newBusStop = new BusStop({
      name: name,
      coords: {
        lat: lat,
        lng: lng,
      },
      createdBy: _user._id,
      main_road: '6347c2c22502494b259c12c4'
    });

    // save the new bus stop
    const savedBusStop = await newBusStop.save();

    return res
      .status(200)
      .send({ message: "Bus Stop Saved", BusStop: savedBusStop });
  } catch (error) {
    next(error);
  }
};

// get all bus stops
// get request
// /api/bus-stop/all
exports.getAllBusStops = async (req, res, next) => {
  try {
    const {lng, lat} = req.body
    const all_bustops = await BusStop.find({})
    console.log("get all bus stops");
    return res.status(200).send({message: 'got all get all bus stops successfully', bus_stops: all_bustops})
  } catch (error) {
    next(error);
  }
};

// get a single bus-stop
// get request
// /api/bus-stop/single/{buStopId}
exports.getASingleBusStop = async (req, res, next) => {
  try {
    console.log("get a single bus stop");
  } catch (error) {
    next(error);
  }
};
