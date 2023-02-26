const express = require("express");
const router = express.Router();
const User1 = require("../models/user");

router.post("/signup", (req, res) => {
  User1.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        mess: "User not found",
      });
    }
  });
  const { firstName, lastName, email, password } = req.body;
  const _user = new User1({
    firstName,
    lastName,
    email,
    password,
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
        user: data,
      });
    }
  });
});
module.exports = router;
