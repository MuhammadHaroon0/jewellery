const express = require("express");
const router = express.Router();
const {
  getAll,
  createOne,
  updateOne,
  getOne
} = require("../controllers/handlerFactory");

const { jewellryModel } = require("../models/jewellryModel");

const {
  getAlljewellryData,
  getTop5jewellrys,
  deletejewellry,
} = require("../controllers/jewellryController");

const { protect, restriction } = require("../controllers/authController");

router
  .route("/")
  .get(getAll(jewellryModel))
  .post(protect, restriction("admin"), createOne(jewellryModel));
router.route("/alljewellryData/:id").get(getAlljewellryData);
router.route("/getTop5jewellries").get(getTop5jewellrys);

//
router
  .route("/:id")
  .put(protect, restriction("admin"), updateOne(jewellryModel))
  .delete(protect, restriction("admin"), deletejewellry)
  .get(getOne(jewellryModel))

module.exports = router;
