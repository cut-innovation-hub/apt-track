const express = require("express");
const router = express.Router();
const PlanItem = require("../../models/PlanItem");

// create plan items
// post request
// api/plan-item/create
router.post("/create", async (req, res, next) => {
  try {
    // console.log('asdfas asdfasdf')
    const { parent_plan, plan_details, plan_status } = req.body;

    const newPlanItem = new PlanItem({
      parent_plan: parent_plan,
      plan_details: plan_details,
      plan_status: plan_status,
    });

    const savedItem = await  newPlanItem.save();

    return res
      .status(200)
      .send({ message: "Plan Item Saved Successfully", item: savedItem });
  } catch (error) {
    next(error);
  }
});

module.exports = router
