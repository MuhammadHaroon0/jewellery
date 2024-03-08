const mongoose = require("mongoose");

const setSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: 4,
  },
  items: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jewellry",
    }],
    validate:

    {
      validator: function (arr) {
        // Ensure there are at least two elements in the array
        return arr.length >= 2;
      },
      message: props => `The 'items' array must contain at least two elements.`
    }

  }
});




exports.setModel = mongoose.model("Set", setSchema);
