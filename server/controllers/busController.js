const Bus = require("../models/Bus");
const Owner = require("../models/Owner");

// create a bus
// post request
// /api/bus/create
exports.createABus = async (req, res, next) => {
  try {
    /* 
          information needed for seach bus
      */

    const _user = req.user; // logged in user
    const { number_plate, status, driver, description, bus_route, bus_type, picture } =
      req.body; // info from form

    const user_info = await Owner.findOne({ _id: _user._id }); // check if user is an owner

    if (!user_info) {
      return res
        .status(404)
        .send({ message: "We cant seem to fond your account" });
    }
    if (!number_plate) {
      return res.status(400).send({ message: "Please enter number plate" });
    }
    if (!driver) {
      return res.status(400).send({ message: "Please enter driver name" });
    }

    const newBus = Bus({
      plate_number: number_plate,
      bus_description: description,
      bus_sensor_number: "",
      bus_owner: _user._id,
      bus_driver: driver,
      bus_status: status,
      bus_route: bus_route,
      bus_type: bus_type,
      picture: picture
    });

    const saved_bus = await newBus.save();
    return res.status(200).send({ message: "Bus Saved", bus: saved_bus });
  } catch (error) {
    next(error);
  }
};

// get each company buses
// get request
// /api/bus/company/all
exports.getCompanyBuses = async (req, res, next) => {
  try {
    const _user = req.user; // the logged in company
    // handling store schema
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
        bus_owner: _user._id,
      },
    });

    // handling search queries
    if (req.query.keyword && req.query.keyword != "") {
      query.push({
        //@ts-ignore
        $match: {
          $or: [
            { plate_number: { $regex: req.query.keyword, $options: "i" } },
            { bus_description: { $regex: req.query.keyword, $options: "i" } },
            { bus_status: { $regex: req.query.keyword, $options: "i" } },
            { bus_route: { $regex: req.query.keyword, $options: "i" } },
          ],
        },
      });
    }

    let total = await Bus.countDocuments(query);
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

    let all_buses = await Bus.aggregate(query);

    return res.status(200).send({
      message: "Buses fetched sucessfully",
      length: all_buses.length,
      meta: {
        total: total,
        currentPage: page,
        perPage: perPage,
        totalPages: Math.ceil(total / perPage),
      },
      all_buses: all_buses,
    });
  } catch (error) {
    next(error);
  }
};

// get all buses
// get request
// /api/buses/get
exports.getAllBuses = async (req, res, next) => {
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

    query.push(
      {
        $lookup: {
          from: "owners",
          let: { owner: "bus_owner" },
          pipeline: [{ $limit: 1 }],
          as: "owner",
        },
      },
      { $unwind: "$owner" }
    );

    // handling search queries
    if (req.query.keyword && req.query.keyword != "") {
      query.push({
        //@ts-ignore
        $match: {
          $or: [
            { plate_number: { $regex: req.query.keyword, $options: "i" } },
            { bus_description: { $regex: req.query.keyword, $options: "i" } },
            { bus_status: { $regex: req.query.keyword, $options: "i" } },
            { bus_route: { $regex: req.query.keyword, $options: "i" } },
          ],
        },
      });
    }

    // handle buses for a route
    if (req.query.bus_route && req.query.bus_route !== "") {
      query.push({
        $match: {
          bus_route: req.query.bus_route,
        },
      });
    }

    // total number of items in database
    let total = await Bus.countDocuments(query);
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

    // exclude some fields from response
    query.push({
      //@ts-ignore
      $project: {
        "route.createdAt": 0,
        "route.createdBy": 0,
        "route.waypoints": 0,
        "route.createdAt": 0,
        "owner.password": 0,
        "owner.is_paid": 0,
        "owner.package": 0,
        "owner.emailApproved": 0,
        "owner.notification_type": 0,
        "owner.role": 0,
        "owner.terms_agreed": 0,
        "owner.email": 0,
        "owner.user_id": 0,
        "owner.approved": 0,
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

    let all_buses = await Bus.aggregate(query);

    return res.status(200).send({
      message: "Buses fetched sucessfully",
      length: all_buses.length,
      meta: {
        total: total,
        currentPage: page,
        perPage: perPage,
        totalPages: Math.ceil(total / perPage),
      },
      all_buses: all_buses,
    });
  } catch (error) {
    next(error);
  }
};
