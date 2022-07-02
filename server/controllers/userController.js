const User = require("../models/User");
const bcrypt = require("bcrypt");

// edit user info
exports.editUserInfo = async (req, res) => {
  try {
    // get iformation from client
    const { email, old_password, new_password } = req.body;

    // find if user exists in database
    const { id } = req.params;

    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(404).send({ message: "Could not find the user" });
      return;
    }

    // check if user is allowed to edit the acciut
    if (req.user._id !== id) {
      res.status(403).send({ message: "You can only edit your account" });
      return;
    }

    // if user wants to edit password
    if (old_password && new_password) {
      // decrypt password value from database
      const password_correct = await bcrypt.compare(
        old_password,
        user.password
      );
      // if password decrypted set the new password
      if (password_correct) {
        user.password = bcrypt.hashSync(new_password, 12);
        await user.save();
        return res.status(200).send({ message: "Account has been updated" });
      } else {
        res.status(403).send({ message: "Old password is incorrect" });
        return;
      }
    }
    return res
      .status(403)
      .send({ message: "Both old and new passord required" });

    // the user has been found
  } catch (error) {
    return res.status(500).send({ message: `error :-, ${error} ` });
  }
  // res.send({user: req.user})
};

// delete user
// /api/user/delete/{userId}
// delete request
exports.delteUser = async (req, res) => {
  console.log("delete user account");
  res.status(200).send({ message: "delte user from here" });
};
