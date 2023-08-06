const express = require("express");
const app = express();
const routes = require("./routes/routes");
const ExpressError = require("./expressError");

app.use(express.json());

// TODO check line below, designate prefix that makes sense

app.use("/items", routes);

//! ======================================>>>err handling
// 404 not found error handler

app.use(function (req, res, next) {
  return new ExpressError("Matching URL Not Found", 404);
});

// general error handler

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    error: err.message,
  });
});

module.exports = app;
