const express = require("express");
const { requireBusOwnerSignIn } = require("../../middleware/require_auth");
const Route = require("../../models/Route");
const router = express.Router();

// create a route
// post request
// /api/routes/create
router.post("/create", requireBusOwnerSignIn, async (req, res, next) => {
  try {
    const _user = req.user;
    const { coords, route_slug, length, waypoints, road_name } = req.body;
    const newRoute = new Route({
      coords: coords,
      route_slug: route_slug,
      createdBy: _user._id,
      road_length: length,
      waypoints: waypoints,
      road_name: road_name,
    });

    const savedRoute = await newRoute.save();
    return res
      .status(200)
      .send({ message: "saved successfully!", route: savedRoute });
  } catch (error) {
    next(error);
  }
});

// get all company routes
// get request
// /api/routes/company/all
router.get("/company/all", requireBusOwnerSignIn, async (req, res, next) => {
  try {
    const _user = req.user;

    // handling store schema
    let query = [];

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
            { title: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
            {
              "creator.company_name": {
                $regex: req.query.keyword,
                $options: "i",
              },
            },
            { category: { $regex: req.query.keyword, $options: "i" } },
          ],
        },
      });
    }

    let total = await Route.countDocuments(query);
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

    let all_routes = await Route.aggregate(query);

    return res.status(200).send({
      message: "Routes fetched sucessfully",
      length: all_routes.length,
      meta: {
        total: total,
        currentPage: page,
        perPage: perPage,
        totalPages: Math.ceil(total / perPage),
      },
      all_routes: all_routes,
    });
  } catch (error) {
    next(error);
  }
});

// get all routes from search
// get request
// /api/routes/get
router.get("/get", async (req, res, next) => {
  try {
    // handling store schema
    let query = [];

    // handling search queries
    if (req.query.keyword && req.query.keyword != "") {
      query.push({
        //@ts-ignore
        $match: {
          $or: [
            { road_name: { $regex: req.query.keyword, $options: "i" } },
            { route_slug: { $regex: req.query.keyword, $options: "i" } },
          ],
        },
      });
    }

    let total = await Route.countDocuments(query);
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

    let all_routes = await Route.aggregate(query);

    return res.status(200).send({
      message: "Routes fetched sucessfully",
      length: all_routes.length,
      meta: {
        total: total,
        currentPage: page,
        perPage: perPage,
        totalPages: Math.ceil(total / perPage),
      },
      all_routes: all_routes,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
