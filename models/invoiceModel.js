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

  jewellryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "jewellryID is required"],
    ref: "jewellry",
  },
  pinCode: {
    type: String,

  },
});

//To provide efficient searching of mongodb
// userSchema.index({ SOMETHING : 1, SOMETHING: -1 }); //1 for ascending -1 for descending

//Document middlewares,can work before or after save or create
// Pre Save Hook
// invoiceSchema.pre('save',function(next){
//     //query middleware
//     console.log("as");
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

// userSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }

//usually for child-parent referencing
// userSchema.virtual('',{
//
// })

module.exports = mongoose.model("Invoice", invoiceSchema);
