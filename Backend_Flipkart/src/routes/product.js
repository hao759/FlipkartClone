const express = require("express");
const router = express.Router();
const product = require("../controllers/product");
const multer = require("multer");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
// const upload = multer({ dest: "upload/" });
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
  upload.array("productPicture"), //.single
  product.createProduct
);
// router.get("/get", category.getCategory);

module.exports = router;
