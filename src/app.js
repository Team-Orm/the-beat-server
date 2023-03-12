require("dotenv").config();

const express = require("express");

const app = express();

const indexRouter = require("./routes/index");

app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect(process.env.SECRET_mongodbID, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", console.log.bind(console, "Connected to database.."));

app.use("/api", indexRouter);

app.use(function (req, res, next) {
  const err = new Error("404 Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  if (!err.status) {
    res.locals.message = "500 Internal Server Error";
    res.stack = "";
  }
});

module.exports = app;
