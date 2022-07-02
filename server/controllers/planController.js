const Plan = require("../models/Plan");

// create a plan for admins only
// post request
// /api/plan/create
exports.createAPlan = async (req, res) => {
  // get fields from client
  const { price, name, period } = req.body;
  try {
    // validate fields
    if (!name || !price) {
      res.status(400).send({ message: "Name and price are required" });
      return;
    }
    // new plan object
    const new_plan = new Plan({
      name: name,
      price: price,
      period: period,
    });

    // save the plan in the database
    const saved_plan = new_plan.save();
    if (saved_plan) {
      return res.status(200).send({ message: "Plan saved successfully" });
    } else {
      return res
        .status(400)
        .send({ message: "oops an error occured try again" });
    }
  } catch (error) {
    return res.status(500).send({ message: `error:- ${error}` });
  }
};

// create a plan for admins only
// post request
// /api/plan/create/{planId}
exports.editAPlan = async (req, res) =>{
    const {id} = req.params // the id of the plan
    const {price, name, period} = req.body // get fields from the client
}