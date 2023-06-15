const express = require("express");
const router = express.Router();
const userController = require("./controllers/user.Controller");

router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

router.post("/local/login", userController.localLogin);
router.post("/local/register", userController.localRegister);

router.delete("/delete", userController.deleteLocalUser);

module.exports = router;
