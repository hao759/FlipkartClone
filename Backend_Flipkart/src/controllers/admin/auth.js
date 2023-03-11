const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      if (user.authenticate(req.body.password) && user.role == "admin") {
        let token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        const { firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1d" });
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
          mess: "Sai mật khẩu",
        });
      }
    } else {
      return res.status(404).json({
        mess: "Khong tim thay tai khoan admin",
      });
    }
  });
};
exports.signup = async (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        mess: err,
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
    role: "admin",
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

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Đăng xuất thành công",
  });
};
