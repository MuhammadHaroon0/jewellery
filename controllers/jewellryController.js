const { jewellryModel } = require("../models/jewellryModel");
const { ratingModel } = require("../models/ratingModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Response = require("../utils/serverResponse");

exports.getAlljewellryData = catchAsync(async (req, res, next) => {
  const found = await jewellryModel
    .findById(req.params.id)
    .populate("ratings");
  if (!found) {
    return next(new AppError("Document not found matching this id!", 404));
  }
  return res.status(200).json(new Response("success", found));
});

exports.deletejewellry = catchAsync(async (req, res, next) => {
  const jewellryId = req.params.id;
  const found = await jewellryModel.findById(jewellryId);
  if (!found) {
    return next(new AppError("Document not found matching this id!", 404));
  }

  await jewellryModel.findByIdAndDelete(jewellryId);
  await ratingModel.deleteMany({ jewellry: jewellryId });

  return res.status(204).json(new Response("success", found));
});

exports.getTop5jewellrys = catchAsync(async (req, res, next) => {
  //ratings is virtual array in jewellrys and it contains objects which have rating atribute

  const top = await jewellryModel.aggregate([
    {
      $lookup: {
        from: "ratings", // Assuming the ratings collection name
        localField: "_id",
        foreignField: "jewellry",
        as: "ratings",
      },
    },
    {
      $unwind: "$ratings",
    },
    {
      $group: {
        _id: "$_id",
        averageRating: {
          $avg: "$ratings.rating",
        },
        jewellry: { $first: "$$ROOT" },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    { $limit: 5 },
    {
      $replaceRoot: { newRoot: "$jewellry" },
    },
  ]);
  if (!top) {
    return next(new AppError("Document not found matching this id!", 404));
  }

  return res.status(200).json(new Response("success", top));
});
