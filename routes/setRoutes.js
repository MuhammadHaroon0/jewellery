const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  updateOne,
} = require("../controllers/handlerFactory");

const { setModel } = require('./../models/setModel');

const { addSet, deleteSet } = require("../controllers/setController");

const { protect, restriction } = require("../controllers/authController");

router.route("/").get(getAll(setModel)).post(protect, restriction("admin"), addSet);

router
  .route("/:id")
  .get(getOne(setModel))
  .put(protect, restriction("admin"), updateOne(setModel))
  .delete(protect, restriction("admin"), deleteSet);

module.exports = router;
