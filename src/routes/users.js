const express = require("express");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

module.exports = router;
