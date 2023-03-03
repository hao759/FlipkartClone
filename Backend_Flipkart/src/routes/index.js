const auth = require("./auth");
const admin = require("./admin/auth");
const category = require("./category");

function route(app) {
  app.use("/admin", admin);
  app.use("/user", auth);
  app.use("/category", category);
}

module.exports = route;
