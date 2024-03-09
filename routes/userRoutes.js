const express = require("express");
const router = express.Router();
const {
  updateOne,
  getOne,
  deleteOne,
  createOne,
} = require("../controllers/handlerFactory");

const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restriction,
} = require("../controllers/authController");



const userModel = require("../models/userModel");

router.post("/signup", signUp);
router.post("/login", login);
// router.post("/forgotPassword", forgotPassword);
// router.patch("/resetPassword/:resetToken", resetPassword);
router.patch("/updatePassword", protect, restriction("admin"), updatePassword);

router.use(protect)


// router
//   .route("/:id")
//   .get(restriction("admin"), getOne(userModel))
//   .patch(restriction("admin"), updateOne(userModel))
//   .delete(restriction("admin"), deleteOne(userModel));

module.exports = router;
