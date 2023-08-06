const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakedb");

console.log("imported items", items);

router.get("/", function (req, res) {
  res.json({ items });
});

router.get("/");

// router.post("/", function (req, res) {
//   res.json({ items });
// });

module.exports = router;
