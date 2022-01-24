const router = require("express").Router();
const { User } = require("../../models");

router.get("/login");
router.post("/register");

module.exports = router;
