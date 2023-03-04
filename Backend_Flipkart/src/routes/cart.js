const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart");
const { requireSignin, userMiddleware } = require("../../common-middleware");

router.post("/addtoCart", requireSignin, userMiddleware, cart.addItemtoCart);
// router.get("/get", category.getCategory);

module.exports = router;
