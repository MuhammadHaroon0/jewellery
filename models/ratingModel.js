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
  jewellry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jewellry",
    required: [true, "Jewellry id is required"]
  },
});

//To provide efficient searching of mongodb
// userSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook
// userSchema.pre('save',function(next){
//     //query middleware
//     next()
// })

// userSchema.pre(/^find/,function(next){
//     //query middleware
//     next()
// })

//Post Save Hook
//The save hook doenst works for findAndUpdate and insertMany etc
// tourSchema.post('save', function (doc, next) {
//   next();
// });

//? Aggeregation Middleware, works before or after aggregation function
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: {  } });
//   next();
// });
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
// userSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

exports.ratingModel = mongoose.model("Rating", ratingSchema);
