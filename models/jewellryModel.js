const mongoose = require("mongoose");

const jewellrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    price: {
      type: String,
      required: [true, "price is required"],
    },

    colors: [
      {
        name: String,
        available: Boolean
      },
    ],

    image: {
      type: String,
      required: [true, "image is required"],
      default: "default.jpg"
    },

    avgRating: {
      type: Number,
      default: 3.5,
      min: 1,
      max: 5,
    },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//To provide efficient searching of mongodb
// userSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook
// userSchema.pre('save',function(next){
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

// userSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

//usually for child-parent referencing
jewellrySchema.virtual("ratings", {
  ref: "Rating",
  foreignField: "jewellry",
  localField: "_id",
});
// courseSchema.pre(/^find/,function(next){
//     // this.populate("ratings")
//     // console.log(this);
//     // next()
// })
exports.jewellryModel = mongoose.model("Jewellry", jewellrySchema);
exports.jewellrySchema = jewellrySchema;
