const express = require("express");

const { getAll, get, add, replace, remove } = require("../data/data");
const { isValidText, isValidPrice } = require("../util/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const listings = await getAll();

    res.json({ listings });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const listing = await get(req.params.id);
    res.json({ listing });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log("called");
  const data = req.body;
  console.log("this is the data,", data);
  console.log("called");

  let errors = {};

  if (!isValidText(data.name)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(data.description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidPrice(data.price)) {
    errors.price = "Invalid Price.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the listing failed due to validation errors.",
      errors,
    });
  }

  try {
    console.log("we are getting here");
    await add(data);
    res.status(201).json({ message: "listing saved.", listing: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.name)) {
    errors.name = "Invalid name.";
  }

  if (!isValidText(data.description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidPrice(data.price)) {
    errors.price = "Invalid Price.";
  }

  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return res.status(422).json({
      message: "Updating the event failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "Event updated.", listing: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "Listing deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
