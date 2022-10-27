const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");

// regular express to verify email format
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// register user controller
exports.registerUser = async (req, res) => {
  //get filds from request
  let { email, password, agreed, role, method, username, googleAuthId } =
    req.body;

  // create password for google users
  if (method === "google") {
    password = randomUUID();
  }

  // get user from database
  let user = await User.findOne({ email: email });

  //validate forms
  if (!agreed) {
    return res
      .status(401)
      .send({ message: "Your have to agree to our terms and conditions" });
  }
  if (!emailRegexp.test(email)) {
    return res.status(401).send({ message: "Please enter a valid email" });
  }
  if (user) {
    return res.status(500).send({ message: "Account already exists" });
  }

  // check password length
  if (password.length < 6) {
    return res.status(401).send({ message: "Invalid password" });
  }

  // Check if this user already exisits
  //create new user object
  const newUser = new User({
    role: role,
    email: email,
    password: bcrypt.hashSync(password, 12),
    terms_agreed: agreed,
    authMethod: method,
    username: username,
    googleAuthId: googleAuthId,
  });

  //save in database
  const _user = await newUser.save();
  const token = await jwt.sign(
    {
      name: _user.name,
      email: _user.email,
      _id: _user._id,
      role: _user.role,
      emailVerified: _user.emailApproved,
    },
    process.env.JWT_SECRET
  );
  if (token) {
    const user = {
      name: _user.name,
      email: _user.email,
      _id: _user._id,
      role: _user.role,
      emailVerified: _user.emailApproved,
      token: token,
    };

    return res.status(200).send({ ...user, message: "Account Created" });
  } else {
    return res.status(422).send({ message: "Failed to login, Try again!" });
  }
};

// login user
exports.loginUser = async (req, res) => {
  // fields from request
  const { email, password, googleAuthId } = req.body;

  const _user = await User.findOne({ email: email });

  // user not found
  if (!_user) {
    return res.status(404).send({ message: "Account does not exist!" });
  } else {
    if (!_user.emailApproved) {
      return res.status(403).send({ message: "Verify your email in database" });
    }
    if (_user.authMethod === "google" && googleAuthId === "") {
      return res.status(400).send({ message: "Login Using Google" });
    }

    if (_user.authMethod === "google") {
      // decrypt password value from database
      if (_user.googleAuthId === googleAuthId) {
        const token = await jwt.sign(
          {
            name: _user.name,
            email: _user.email,
            _id: _user._id,
            role: _user.role,
            emailVerified: _user.emailApproved,
            //@ts-ignore
          },
          process.env.JWT_SECRET
        );
        if (token) {
          const user = {
            name: _user.name,
            email: _user.email,
            _id: _user._id,
            role: _user.role,
            emailVerified: _user.emailApproved,
            token: token,
          };

          return res.send({ ...user, message: "logged in sucessfully" });
        } else {
          return res
            .status(422)
            .send({ message: "Failed to login, Try Again" });
        }
      } else {
        return res.status(403).send({ message: "Login using Google" });
      }
    }

    // decrypt password value from database
    const password_correct = await bcrypt.compare(password, _user.password);
    if (password_correct) {
      const token = await jwt.sign(
        {
          name: _user.name,
          email: _user.email,
          _id: _user._id,
          role: _user.role,
          emailVerified: _user.emailApproved,
          //@ts-ignore
        },
        process.env.JWT_SECRET
      );
      if (token) {
        const user = {
          name: _user.name,
          email: _user.email,
          _id: _user._id,
          role: _user.role,
          emailVerified: _user.emailApproved,
          token: token,
        };

        return res.send({ ...user, message: "logged in sucessfully" });
      } else {
        return res
          .status(422)
          .send({ message: "Failed to login, Wrong details!" });
      }
    } else {
      return res.status(400).send({ message: "Wrong login details" });
    }
  }
};
