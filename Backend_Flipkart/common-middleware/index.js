const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Cần đăng nhập để tiếp tục" }); //Authorization required
  }
  next();
  //jwt.decode()
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role != "user") {
    return res.status(400).json({
      mess: "Chỉ có user mới có quyền này",
    });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role != "admin") {
    return res.status(400).json({
      mess: "Chỉ có admin mới có quyền này",
    });
  }
  next();
};
