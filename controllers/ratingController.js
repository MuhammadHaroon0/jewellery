const { ratingModel } = require("../models/ratingModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");

exports.getjewellryRatings = catchAsync(async (req, res, next) => {
  const found = await ratingModel.find({ jewellry: req.params.jewellryId });

  if (!found) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  return res.status(200).json(new Response("success", found));
});


