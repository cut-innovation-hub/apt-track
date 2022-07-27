const express = require("express");
const {
  createAnOwnerAccount,
  registerOwnerAccount,
  loginOwnerAccount,
} = require("../../controllers/ownerController");
const {
  requireBusOwnerSignIn,
  requireAdminSignIn,
} = require("../../middleware/require_auth");
const router = express.Router();

// registe an owner account
// post request
// /api/owner/regsiter
router.post("/register", registerOwnerAccount);

// login an owner account
// post request
// /api/owner/login
router.post("/login", loginOwnerAccount);

// create an owner account by applying for an account
// post request
// /api/post/owner/create
router.post("/create", requireBusOwnerSignIn, createAnOwnerAccount);

// edit an owner account
router.put("/edit/:id", requireBusOwnerSignIn, createAnOwnerAccount);

//get a single bus account
router.get("/single/:id", requireAdminSignIn, (req, res) => {
  return res.status(200).send({ message: "get a single owner account" });
});

// get all owner acconts for admin
router.get("/all", requireAdminSignIn, (req, res) => {
  return res.status(200).send({ message: "get all owners and their info" });
});

// delete user account
router.delete("/delete/:id", requireBusOwnerSignIn, (req, res) => {
  return res.status(200).send({ message: "delete user account" });
});

// renew subscription
router.put("/subscribe/:id", requireBusOwnerSignIn, (req, res) => {
  res.send(200).message({ message: "renew subscription of the owner" });
});

module.exports = router;
