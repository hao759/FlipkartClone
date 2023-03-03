const express = require("express");
const router = express.Router();
const auth = require("../../controllers/admin/auth");
const common_middle = require("../../../common-middleware");

router.post("/signup", auth.signup);
router.post("/signin", auth.signin);
router.post("/profile", common_middle.requireSignin, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
