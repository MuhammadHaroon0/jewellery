const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} = require("../controllers/handlerFactory");

const { ratingModel } = require("../models/ratingModel");

const {
  getjewellryRatings,
  addjewellryRatings,
} = require("../controllers/ratingController"); //get a single jewellry ratings

const { protect, restriction } = require("../controllers/authController");

router
  .route("/")
  .get(getAll(ratingModel))
  .post(createOne(ratingModel));

router.route("/getjewellryRatings/:jewellryId").get(getjewellryRatings);

router
  .route("/:id")
  .get(getOne(ratingModel))
  .put(protect, restriction("admin"), updateOne(ratingModel))
  .delete(protect, restriction("admin"), deleteOne(ratingModel));

module.exports = router;
