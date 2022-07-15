const router = require("express").Router();

const user = require("./user");
const admin = require("./admin");
const auth = require("./auth");


router.use("/auth", auth);
router.use("/user", user);
router.use("/admin", admin);


module.exports = router;