const mongoose = require("mongoose");
const validator = require("validator");

const invoiceSchema = new mongoose.Schema({
  jewellryName: {
    type: String,
    required: [true, "jewellryName is required"],
    minLength: 3,
    maxLength: 100,
  },
  userEmail: {
    type: String,
    required: [true, "email is required"],
    minLength: 7,
    maxLength: 50,
    validate: [validator.isEmail, "Email should be valid"],
  },
  address: {
    type: String,
    required: [true, "Address is required"]
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  jewellryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "jewellryID is required"],
    ref: "jewellry",
  },
  pinCode: {
    type: String,

  },
});



module.exports = mongoose.model("Invoice", invoiceSchema);
