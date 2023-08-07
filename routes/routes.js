// TODO update this and correct to be my API

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
    console.log("before, newItem", items);
    items.push(newItem);
    console.log("before, newItem", items);
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
  const foundCat = items.findIndex((cat) => cat.name === req.params.name);
  if (foundCat === -1) {
    throw new ExpressError("Cat not found", 404);
  }
  items.splice(foundCat, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
