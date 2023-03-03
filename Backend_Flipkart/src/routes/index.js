const auth = require("./auth");
const admin = require("./admin/auth");
const category = require("./category");
const product = require("./product");

function route(app) {
  app.use("/admin", admin);
  app.use("/user", auth);
  app.use("/category", category);
  app.use("/product", product);
}

module.exports = route;
