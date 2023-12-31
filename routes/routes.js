// RESTFUL routes API using Express Route

const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");

// render a list of shopping items
router.get("/", function (req, res) {
  return res.json({ items });
});

router.post("/", function (req, res, next) {
  try {
    if (!req.body.name) throw new ExpressError("Name is required", 400);
    const newItem = { name: req.body.name.toLowerCase(), price: +req.body.price };
    items.push(newItem);
    return res.status(201).json({ item: newItem });
  } catch (e) {
    return next(e);
  }
});

router.get("/:name", function (req, res) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  res.json({ item: foundItem });
});

router.patch("/:name", function (req, res) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  // error handling with this? what if no price update? what if no name update?
  foundItem.name = req.body.name.toLowerCase();
  foundItem.price = +req.body.price;
  res.json({ item: foundItem });
});

router.delete("/:name", function (req, res) {
  const foundItem = items.findIndex((item) => item.name === req.params.name.toLowerCase());
  if (foundItem === -1) {
    throw new ExpressError("Item not found", 404);
  }
  items.splice(foundItem, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
