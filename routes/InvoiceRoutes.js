const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("../controllers/handlerFactory");

const invoiceModel = require('./../models/invoiceModel');

const { protect, restriction } = require("../controllers/authController");
const { createOne, incompletedOrders, markAsCompleted } = require("../controllers/invoiceController");

router.route("/")
  .get(protect, restriction("admin"), getAll(invoiceModel))
  .post(protect, restriction("admin"), createOne);
router.route("/incompletedOrders")
  .get(protect, restriction("admin"), incompletedOrders);
router.route("/markAsCompleted/:id")
  .patch(protect, restriction("admin"), markAsCompleted);

router
  .route("/:id")
  .get(getOne(invoiceModel))
  .put(protect, restriction("admin"), updateOne(invoiceModel))
  .delete(protect, restriction("admin"), deleteOne(invoiceModel));

module.exports = router;
