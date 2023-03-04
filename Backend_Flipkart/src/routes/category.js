const express = require("express");
const router = express.Router();
const category = require("../controllers/category");
const slugify = require("slugify");
const { requireSignin, adminMiddleware } = require("../../common-middleware");

const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "upload"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/create",
  requireSignin,
  adminMiddleware,
  upload.single("categoryImage"),
  category.createCategory
);
router.get("/get", category.getCategory);

module.exports = router;
