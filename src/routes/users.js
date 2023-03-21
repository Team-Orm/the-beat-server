const express = require("express");
const router = express.Router();
const userController = require("./controllers/user.Controller");

router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

module.exports = router;
