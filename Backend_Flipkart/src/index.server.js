const express = require("express");
const app = express();
const env = require("dotenv");

const mongoose = require("mongoose");
const route = require("./routes/");
const db = require("./config/db");
const path = require("path");

env.config();
mongoose.set("strictQuery", false);

// app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/public", express.static(path.join(__dirname, "upload")));

route(app);
db.connect();

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
