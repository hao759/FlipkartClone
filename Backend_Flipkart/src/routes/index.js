const auth = require("./auth");
const admin = require("./admin/auth");
const category = require("./category");
const product = require("./product");
const cart = require("./cart");

function route(app) {
  app.use("/admin", admin);
  app.use("/user", auth);
  app.use("/category", category);
  app.use("/product", product);
  app.use("/cart", cart);
}

module.exports = route;
