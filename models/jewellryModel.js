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


jewellrySchema.virtual("ratings", {
  ref: "Rating",
  foreignField: "jewellry",
  localField: "_id",
});

exports.jewellryModel = mongoose.model("Jewellry", jewellrySchema);
exports.jewellrySchema = jewellrySchema;
