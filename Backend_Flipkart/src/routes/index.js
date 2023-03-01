const auth = require("../routes/auth");

function route(app) {
  app.use("/user", auth);
}

module.exports = route;
