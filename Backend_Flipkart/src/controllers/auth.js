const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    // if (err) {
    //   console.log(err);
    //   return res.status(400).json({
    //     mess: err,
    //   });
    // }
    if (user) {
      if (user.authenticate(req.body.password)) {
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        const { firstName, lastName, email, role, fullName } = user;
        return res.status(200).json({
          token,
          user: {
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          mess: "Invalid password",
        });
      }
    } else {
      return res.status(404).json({
        mess: "Khong tim thay tai khoan user nay",
      });
    }
  });
};
exports.signup = async (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        mess: "User not found",
      });
    }
  });
  const { firstName, lastName, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const _user = new User({
    firstName,
    lastName,
    email,
    hashPassword,
    username: lastName + lastName,
  });

  _user.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        mess: "Sth wrong",
      });
    }
    if (data) {
      return res.status(201).json({
        mess: "Success",
        user: data,
      });
    }
  });
};
