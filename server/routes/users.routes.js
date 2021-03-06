const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");

router.get("/", user.getAllUsers);
router.post("/", user.registerUser);
router.post("/login", user.login);

module.exports = router;
