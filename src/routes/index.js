const express = require("express");
const router = express.Router();

const users = require("./users");
const rooms = require("./rooms");

router.use("/users", users);
router.use("/rooms", rooms);

module.exports = router;
