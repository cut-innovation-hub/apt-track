const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");

// regular express to verify email format
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// register user controller
exports.registerUser = async (req, res, next) => {
  try {
    //get filds from request
    let {
      email,
      password,
      agreed,
      role,
      method,
      username,
      googleAuthId,
      photoURL,
      phoneNumber,
    } = req.body;

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
      role: "passenger",
      email: email,
      password: bcrypt.hashSync(password, 12),
      terms_agreed: agreed,
      authMethod: method,
      username: username,
      googleAuthId: googleAuthId,
      photoURL: photoURL,
      phoneNumber: phoneNumber,
    });

    //save in database
    const _user = await newUser.save();
    let token;
    if (method === "google") {
      token = await jwt.sign(
        {
          name: _user.name,
          email: _user.email,
          _id: _user._id,
          role: _user.role,
          emailVerified: _user.emailApproved,
          username: _user.username,
          photoURL: _user.photoURL,
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
          username: _user.username,
          photoURL: _user.photoURL,
          token: token,
        };

        return res.status(200).send({ ...user, message: "Account Created" });
      } else {
        return res.status(422).send({ message: "Failed to login, Try again!" });
      }
    }
    return res.status(200).send({ message: "Account Created" });
  } catch (error) {
    next(error);
  }
};

// login user
exports.loginUser = async (req, res, next) => {
  try {
    // fields from request
    const { email, password, googleAuthId } = req.body;

    const _user = await User.findOne({ email: email });

    console.log("usser logge 9n", _user);

    // user not found
    if (!_user) {
      return res.status(404).send({ message: "Account does not exist!" });
    } else {
      if (!_user.emailApproved) {
        return res
          .status(403)
          .send({ message: "Verify your email in database" });
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
              username: _user.username,
              photoURL: _user.photoURL,
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
              username: _user.username,
              photoURL: _user.photoURL,
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
            username: _user.username,
            photoURL: _user.photoURL,
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
            username: _user.username,
            photoURL: _user.photoURL,
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
  } catch (error) {
    next(error);
  }
};
