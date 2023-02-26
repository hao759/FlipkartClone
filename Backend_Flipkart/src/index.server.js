const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const env = require("dotenv");

const mongoose = require("mongoose");
const route = require("./routes/");
const db = require("./config/db");

// env.config();
mongoose.set("strictQuery", false);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

route(app);
db.connect();

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
