const express = require("express");
const router = express.Router();
const {
  getAll,
  createOne,
  updateOne,
} = require("../controllers/handlerFactory");

const { jewellryModel } = require("../models/jewellryModel");

const {
  getAlljewellryData,
  getTop10jewellrys,
  deletejewellry,
} = require("../controllers/jewellryController");

const { protect, restriction } = require("../controllers/authController");

router
  .route("/")
  .get(getAll(jewellryModel))
  .post(protect, restriction("admin"), createOne(jewellryModel));
router.route("/alljewellryData/:id").get(getAlljewellryData);
router.route("/getTop10jewellrys").get(getTop10jewellrys);

//
router
  .route("/:id")
  .put(protect, restriction("admin"), updateOne(jewellryModel))
  .delete(protect, restriction("admin"), deletejewellry);

module.exports = router;
