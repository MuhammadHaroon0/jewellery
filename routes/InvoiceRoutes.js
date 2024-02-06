const express = require("express");
const router = express.Router();
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/handlerFactory");

const invoiceModel = require('./../models/invoiceModel');

const { protect, restriction } = require("../controllers/authController");

router.use(protect)
router.route("/").get(restriction("admin"), getAll(invoiceModel)).post(createOne(invoiceModel));

router
  .route("/:id")
  .get(restriction("admin"), getOne(invoiceModel))
  .put(restriction("admin"), updateOne(invoiceModel))
  .delete(restriction("admin"), deleteOne(invoiceModel));

module.exports = router;
