const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const bcrypt = require( 'bcrypt')

// regular express to verify email format
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

/**
 * @swagger
 * /auth/register:
 *    post:
 *      description: Use to insert or register a new user
 *    parameters:
 *      - email: email
 *        in: body
 *        description: email of the user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - password: password
 *        in: body
 *        description: password of user that will be encrypted in db
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - role: role
 *        in: body
 *        description: the role of the user, either admin, owner, user
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: User registered sucessfully
 *      '500':
 *        description: Failed to register user
 */
router.post("/", async (req, res) => {
  //get filds from request
  const { email, password, agreed, role } = req.body;

  //validate forms
  if (!agreed) {
    return res
      .status(401)
      .send({ message: "Your have to agree to our terms and conditions" });
  } else if (!emailRegexp.test(email)) {
    return res.status(401).send({ message: "Please enter a valid email" });
  } else if (password.length < 6) {
    return res.status(401).send({ message: "Invalid password" });
  }

  // Check if this user already exisits
  else{
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(500).send({ message: "Email already registered" });
    } else {
      //create new user object
      const newUser = new User({
        role: role,
        email: email,
        password: bcrypt.hashSync(password, 12),
        terms_agreed: agreed
      });
  
      //save in database
      await newUser.save();
      return res.status(200).send("Account Created");
    }
  }
});

module.exports = router;
