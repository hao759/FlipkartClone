const auth = require("../routes/auth");
const admin = require("./admin/auth");

function route(app) {
  app.use("/admin", admin);
  app.use("/user", auth);
}

module.exports = route;
