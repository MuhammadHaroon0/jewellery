const mongoose = require("mongoose");
const { jewellryModel } = require("./jewellryModel");

const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "rating is required"],
  },
  review: {
    type: String,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  userName: {
    type: String,

  },
  jewellry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jewellry",
    required: [true, "Jewellry id is required"]
  },
});


ratingSchema.statics.getAvgRating = async function (jewellryId) {
  const stats = await this.aggregate([
    {
      $match: { jewellry: jewellryId },
    },
    {
      $group: {
        _id: "$jewellry",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  await jewellryModel.findByIdAndUpdate(jewellryId, {
    avgRating: stats[0].avgRating,
  });
};
ratingSchema.post("save", function () {
  this.constructor.getAvgRating(this.jewellry); //updating avg rating soon after creating the document in jewellry model
});


exports.ratingModel = mongoose.model("Rating", ratingSchema);
