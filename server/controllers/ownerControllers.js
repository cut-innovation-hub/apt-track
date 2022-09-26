const Owner = require("../models/Owner");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// regular express to verify email format
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// register as a bus owner
// post request
// /api/owner/register
exports.registerOwnerAccount = async (req, res) => {
  //get filds from request
  const { email, password, agreed, name } = req.body;

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
  else {
    let user = await Owner.findOne({ email: req.body.email });

    if (user) {
      return res.status(500).send({ message: "Email already registered" });
    } else {
      //create new user object
      const newOwner = new Owner({
        role: "bus_admin",
        email: email,
        password: bcrypt.hashSync(password, 12),
        terms_agreed: agreed,
        company_name: name,
      });

      //save in database
      await newOwner.save();
      return res.status(200).send("Account Created");
    }
  }
};

// login an owner account
// post request
// /api/owner/login
exports.loginOwnerAccount = async (req, res) => {
  try {
    // fields from request
    const { email, password } = req.body;

    const _owner = await Owner.findOne({ email: email });

    // user not found
    if (!_owner) {
      return res.status(404).send({ message: "Account does not exist!" });
    } else {
      if (!_owner.emailApproved) {
        return res.status(403).send({ message: "Please verify your Email" });
      }

      // decrypt password value from database
      const password_correct = await bcrypt.compare(password, _owner.password);
      if (password_correct) {
        const token = await jwt.sign(
          {
            email: _owner.email,
            _id: _owner._id,
            role: _owner.role,
            emailVerified: _owner.emailApproved,
            approved: _owner.approved,
            name: _owner.company_name,
            //@ts-ignore
          },
          process.env.JWT_SECRET
        );
        if (token) {
          const user = {
            email: _owner.email,
            _id: _owner._id,
            role: _owner.role,
            emailVerified: _owner.emailApproved,
            token: token,
            approved: _owner.approved,
            name: _owner.company_name,
          };

          return res.send({ ...user, message: "Logged in sucessfully" });
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
    return res.status(500).send({ message: `${error}` });
  }
};

// create ower accont and lgin user aterwards
// /api/owner/create
// post request
exports.createAnOwnerAccount = async (req, res) => {
  const _owner = req.user;
  const { phone_number, phone_number2, notification_type, email } = req.body;

  // check if phone number was entered
  if (!phone_number) {
    return res.status(401).send({ message: "Please enter a phone number" });
  }

  // check id email was entered
  if (!email) {
    return res.status(401).send({ message: "Please a contact email" });
  }
  try {
    // check if account exists
    const owner = await Owner.findOne({ _id: _owner._id });
    if (!owner) {
      return res
        .status(401)
        .send({ message: "Owner account could not be found" });
    }

    // add new details to owner object
    owner.phone_number = phone_number;
    owner.phone_number2 = phone_number2;
    owner.contact_email = email;
    owner.approved = true;
    owner.notification_type = notification_type;

    // save new owner
    const new_account_dets = await owner.save();

    // login user with new details
    const token = await jwt.sign(
      {
        email: owner.email,
        _id: owner._id,
        role: owner.role,
        emailVerified: owner.emailApproved,
        approved: owner.approved,
        name: owner.company_name,
        //@ts-ignore
      },
      process.env.JWT_SECRET
    );

    if (token) {
      const user = {
        email: owner.email,
        _id: owner._id,
        role: owner.role,
        emailVerified: owner.emailApproved,
        token: token,
        approved: owner.approved,
        name: owner.company_name,
      };

      return res.send({ ...user, message: "Account created successfully!" });
    } else {
      return res.status(422).send({ message: "Failed to create account!" });
    }
  } catch (error) {
    return res.status(500).send({ message: `${error}` });
  }
};
