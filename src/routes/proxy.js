const express = require("express");
const router = express.Router();
const proxyController = require("./controllers/proxy.Controller");

router.get("/audio-server", proxyController.getBuffer);

module.exports = router;
