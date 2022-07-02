const express = require("express");
const {
  createAPlan,
  editAPlan,
  getAllPlans,
  deleteAPlan,
} = require("../../controllers/planController");
const { requireAdminSignIn } = require("../../middleware/require_auth");
const router = express.Router();

/**
 * @swagger
 * /plan/create:
 *    post:
 *      summary: create a new plan
 *      description: Create a new subscription plan where users will choose which subscription package they want
 *    parameters:
 *      - name: price
 *      - in: body
 *        description: the price of the plan type
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: name
 *      - in: body
 *        description: the name of the plan
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: period
 *      - in: body
 *        description: the period of payment of the plan e.g monthly, weekly
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Plan created successfully
 *      '500':
 *        description: Failed to create the plan
 */
router.post("/create", requireAdminSignIn, createAPlan);

/**
 * @swagger
 * /plan/edit/{planId}:
 *    put:
 *      summary: edit a plan
 *      description: Edit an already existing package. Change plan name or price
 *    parameters:
 *      - name: price
 *      - in: body
 *        description: the price of the plan type
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: name
 *      - in: body
 *        description: the name of the plan
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: period
 *      - in: body
 *        description: the period of payment of the plan e.g monthly, weekly
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Plan created successfully
 *      '500':
 *        description: Failed to create the plan
 */
router.put("/edit/:id", requireAdminSignIn, editAPlan);

/**
 * @swagger
 * /plan/all:
 *    get:
 *      summary: get all plans
 *      description: Get a list of all subscriptions and plans to display to buyer and admins
 *    responses:
 *      '200':
 *        description: All plans fetched successfully
 *      '500':
 *        description: There was an erroe diplaying the plans
 */
router.get("/all", getAllPlans);

/**
 * @swagger
 * /user/delete/{planId}:
 *    delete:
 *      summary: delete plan using plan id
 *      description: use to delete plan info and the entire plan from the database
 *    parameters:
 *      - name: planId
 *      - in: path
 *        description: the id of the plan to be deleted
 *    responses:
 *      '200':
 *        description: Plan deleted sucessfully
 *      '500':
 *        description: Failed to delete plan
 */
router.delete("/delete/:id", requireAdminSignIn, deleteAPlan);

module.exports = router;
