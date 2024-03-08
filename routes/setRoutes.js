const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} = require("../controllers/handlerFactory");

const { setModel } = require('./../models/setModel');


const { protect, restriction } = require("../controllers/authController");
const { showSetsContainingSpecificJewllery } = require("../controllers/setController");

router.route("/").get(getAll(setModel)).post(protect, restriction("admin"), createOne(setModel));
router.route("/setsSpecificJewllery").get(showSetsContainingSpecificJewllery)
router
  .route("/:id")
  .get(getOne(setModel, "items"))
  .put(protect, restriction("admin"), updateOne(setModel))
  .delete(protect, restriction("admin"), deleteOne(setModel));

module.exports = router;
