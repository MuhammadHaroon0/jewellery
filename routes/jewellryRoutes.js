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
  getTop5jewellrys,
  deletejewellry,
  uploadImage,
  resizeImage,
} = require("../controllers/jewellryController");

const { protect, restriction } = require("../controllers/authController");
const { uploadToCloudinary } = require("../utils/cloudinary");

router
  .route("/")
  .get(getAll(jewellryModel))
  .post(protect, restriction("admin"), uploadImage, resizeImage, uploadToCloudinary, createOne(jewellryModel));
router.route("/getTop5jewellries").get(getTop5jewellrys);

//
router
  .route("/:id")
  .get(getOne(jewellryModel, "ratings"))
  .put(protect, restriction("admin"), uploadImage, resizeImage, uploadToCloudinary, updateOne(jewellryModel))
  .delete(protect, restriction("admin"), deletejewellry)

module.exports = router;
