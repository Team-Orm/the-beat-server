const express = require("express");
const router = express.Router();
const recordController = require("./controllers/record.Controller");
const verifyToken = require("./middlewares/verifyToken");

router.get("/", verifyToken, recordController.getRecord);
router.post("/new", verifyToken, recordController.saveRecord);

module.exports = router;
