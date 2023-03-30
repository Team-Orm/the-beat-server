const express = require("express");
const router = express.Router();

const users = require("./users");
const rooms = require("./rooms");
const records = require("./records");

router.use("/users", users);
router.use("/rooms", rooms);
router.use("/records", records);

module.exports = router;
