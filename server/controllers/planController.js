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
exports.editAPlan = async (req, res) => {
  try {
    const { id } = req.params; // the id of the plan
    const { price, name, period } = req.body; // get fields from the client

    // check if the plan exists
    const plan = await Plan.findOne({ _id: id });
    if (!plan) {
      res.status(404).send({ message: "Could not find the selected plan" });
      return;
    }

    // change the fields in the plan object
    plan.name = name;
    plan.price = price;
    plan.period = period;

    // save the plan and capture the error
    const saved_plan = await user.save();
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

// get all plans
// get request
// /api/plan/all
exports.getAllPlans = async (req, res) => {
  try {
    // find all plans
    const all_plans = await Plan.find({});

    // send all plans to client
    return res.status(200).send({ plans: all_plans });
  } catch (error) {
    return res.status(500).send({ message: `error:- ${error}` });
  }
};

// delete a plan
// delete request
// /api/plan/delete/{planId}
exports.deleteAPlan = async (req, res) => {
  // find if plan exists in database
  const { id } = req.params;

  // delte the user and capture the error
  Plan.findOneAndRemove({ _id: id }, (err) => {
    if (err) {
      return res.send({ message: `error :-, ${error} ` });
    }
    return res.send({ message: "Plan deleted successfully!" });
  });
};
