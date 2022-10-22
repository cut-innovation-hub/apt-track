const express = require("express");
const { requireBusOwnerSignIn } = require("../../middleware/require_auth");
const router = express.Router();
const Driver = require("../../models/Driver");

// create a driver schema
// post request
// /api/driver/create
router.post("/create", requireBusOwnerSignIn, async (req, res, next) => {
  try {
    const _user = req.user; // logged in company
    const { name, bus, id_number, gender, picture, phone_number } = req.body; // get fields from client

    if (!name) {
      return res.status(400).send({ message: "Please enter a name" });
    }
    if (!id_number) {
      return res.status(400).send({ message: "Please enter a national id" });
    }

    // create new river object
    const newDriver = new Driver({
      name: name,
      picture: picture,
      gender: gender,
      id_number: id_number,
      createdBy: _user._id,
      bus: bus,
      phone_number: phone_number,
    });

    // save the new driver in database
    const saved_driver = await newDriver.save();

    return res
      .status(200)
      .send({ message: "Driver Added Successfully", driver: saved_driver });
  } catch (error) {
    next(error);
  }
});

// get all drivers
// get request
// /api/driver/company/all
router.get("/company/all", requireBusOwnerSignIn, async (req, res, next) => {
  try {
    const _user = req.user;
    let query = [
      {
        $lookup: {
          from: "buses",
          let: { bus: "bus" },
          pipeline: [{ $limit: 1 }],
          as: "bus",
        },
      },
      { $unwind: "$bus" },
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
            { id_number: { $regex: req.query.keyword, $options: "i" } },
            {
              "bus.plate_number": { $regex: req.query.keyword, $options: "i" },
            },
          ],
        },
      });
    }

    // total number of items in database
    let total = await Driver.countDocuments(query);
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
        "bus.bus_sensor_number": 0,
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

    let drivers = await Driver.aggregate(query);

    return res.status(200).send({
      message: "All Bus Stops fetched sucessfully",
      length: drivers.length,
      meta: {
        total: total,
        currentPage: page,
        perPage: perPage,
        totalPages: Math.ceil(total / perPage),
      },
      drivers: drivers,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
