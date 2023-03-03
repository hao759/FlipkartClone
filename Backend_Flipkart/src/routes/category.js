const express = require("express");
const router = express.Router();
const category = require("../controllers/category");
const slugify = require("slugify");
const { requireSignin, adminMiddleware } = require("../../common-middleware");

router.post("/create", requireSignin, adminMiddleware, category.createCategory);
router.get("/get", category.getCategory);

module.exports = router;
