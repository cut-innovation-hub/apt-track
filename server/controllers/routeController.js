const Route = require("../models/Route");

exports.getAllSearchedRoutes = async (req, res, next) => {
  try {
    /* 
        receive query from client
        get all routes involved with that query
    */

    // query array for all queries
    let query = [];

    // handling search queries
    if (req.query.keyword && req.query.keyword != "") {
      query.push({
        //@ts-ignore
        $match: {
          $or: [
            { road_name: { $regex: req.query.keyword, $options: "i" } },
            { route_description: { $regex: req.query.keyword, $options: "i" } },
          ],
        },
      });
    }

    // total number of items in database
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

    let all_bustops = await Route.aggregate(query);

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
