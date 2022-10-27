const BusStop = require("../models/BusStop");

//create a bus stop
// post request
// /api/bus-stop/create
exports.createABusStop = async (req, res, next) => {
  try {
    const { name, lng, lat, picture, main_road } = req.body; // values from client
    const _user = req.user; // user who created the bus stop

    // the new bus - stop object from the bus stop schema
    const newBusStop = new BusStop({
      name: name,
      coords: {
        lat: lat,
        lng: lng,
      },
      createdBy: _user._id,
      main_road: main_road,
      picture: picture
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
    // query array for all queries
    let query = [
      {
        $lookup: {
          from: "routes",
          let: { route: "route" },
          pipeline: [{ $limit: 1 }],
          as: "route",
        },
      },
      { $unwind: "$route" },
    ];

    // handling search queries
    if (req.query.keyword && req.query.keyword != "") {
      query.push({
        //@ts-ignore
        $match: {
          $or: [
            { name: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
            { "route.road_name": { $regex: req.query.keyword, $options: "i" } },
          ],
        },
      });
    }

    // handling search queries
    if (req.query.road_id && req.query.road_id != "") {
      query.push({
        //@ts-ignore
        $match: {
          "route._id": road_id,
        },
      });
    }

    // total number of items in database
    let total = await BusStop.countDocuments(query);
    //@ts-ignore
    let page = req.query.page ? parseInt(req.query.page) : 1;
    //@ts-ignore
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 16;
    let skip = (page - 1) * perPage;

    query.push({
      //@ts-ignore
      $skip: skip,
    });
    query.push({
      //@ts-ignore
      $limit: perPage,
    });

    // exclude some fields
    query.push({
      //@ts-ignore
      $project: {
        "route.createdAt": 0,
        "route.createdBy": 0,
        "route.waypoints": 0,
        "route.createdAt": 0,
      },
    });

    // handling sort
    if (req.query.sortBy && req.query.sortOrder) {
      var sort = {};
      //@ts-ignore
      sort[req.query.sortBy] = req.query.sortOrder == "asc" ? 1 : -1;
      query.push({
        //@ts-ignore
        $sort: sort,
      });
    } else {
      query.push({
        //@ts-ignore
        $sort: { createdAt: -1 },
      });
    }

    let all_bustops = await BusStop.aggregate(query);

    return res.status(200).send({
      message: "All Bus Stops fetched sucessfully",
      length: all_bustops.length,
      meta: {
        total: total,
        currentPage: page,
        perPage: perPage,
        totalPages: Math.ceil(total / perPage),
      },
      all_bustops: all_bustops,
    });
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

// get searched bus stops
// get request
// /api/bus-stop/searched
exports.getSearchedBusStops = async (req, res, next) => {
  try {
    /* 
       how this function works
       -- get a query from client
          - qury is on form destination of the user
        -- we get the route that goes to the users destination
        -- we get all bus stops involved with that route
    */
    // query array for all queries
    let query = [
      {
        $lookup: {
          from: "routes",
          let: { route: "route" },
          pipeline: [{ $limit: 1 }],
          as: "route",
        },
      },
      { $unwind: "$route" },
    ];

    query.push({
      //@ts-ignore
      $match: {
        "route.road_name": _user._id,
      },
    });

    // handling search queries
    if (req.query.keyword && req.query.keyword != "") {
      query.push({
        //@ts-ignore
        $match: {
          $or: [
            { name: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
            { "route.road_name": { $regex: req.query.keyword, $options: "i" } },
          ],
        },
      });
    }

    console.log("get all searched bus stops for a given route");
  } catch (error) {
    next(error);
  }
};

// get company bus stops
// get request
// /api/bus-stop/company/get
exports.getCompanyBusStops = async (req, res, next) => {
  try {
    const _user = req.user
    // query array for all queries
    let query = [
      {
        $lookup: {
          from: "routes",
          let: { route: "route" },
          pipeline: [{ $limit: 1 }],
          as: "route",
        },
      },
      { $unwind: "$route" },
    ];

    query.push({
      //@ts-ignore
      $match: {
        createdBy: _user._id,
      },
    });

    // handling search queries
    if (req.query.keyword && req.query.keyword != "") {
      query.push({
        //@ts-ignore
        $match: {
          $or: [
            { name: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
            { "route.road_name": { $regex: req.query.keyword, $options: "i" } },
          ],
        },
      });
    }

    // total number of items in database
    let total = await BusStop.countDocuments(query);
    //@ts-ignore
    let page = req.query.page ? parseInt(req.query.page) : 1;
    //@ts-ignore
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 16;
    let skip = (page - 1) * perPage;

    query.push({
      //@ts-ignore
      $skip: skip,
    });
    query.push({
      //@ts-ignore
      $limit: perPage,
    });

    // exclude some fields
    query.push({
      //@ts-ignore
      $project: {
        "route.createdBy": 0,
        "route.waypoints": 0,
        "route.createdAt": 0,
      },
    });

    // handling sort
    if (req.query.sortBy && req.query.sortOrder) {
      var sort = {};
      //@ts-ignore
      sort[req.query.sortBy] = req.query.sortOrder == "asc" ? 1 : -1;
      query.push({
        //@ts-ignore
        $sort: sort,
      });
    } else {
      query.push({
        //@ts-ignore
        $sort: { createdAt: -1 },
      });
    }

    let all_bustops = await BusStop.aggregate(query);

    return res.status(200).send({
      message: "All Bus Stops fetched sucessfully",
      length: all_bustops.length,
      meta: {
        total: total,
        currentPage: page,
        perPage: perPage,
        totalPages: Math.ceil(total / perPage),
      },
      all_bustops: all_bustops,
    });
  } catch (error) {
    next(error);
  }
};
