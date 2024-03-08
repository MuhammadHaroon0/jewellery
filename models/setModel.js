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

// userSchema.methods.FUNCTIONNAME=function()
// {
//     //member functions
// }
setSchema.post('updateMany', async function () {
  const Set = mongoose.model('Set');
  console.log(Set);
  // Find sets with items length less than 2 and delete them
  await Set.deleteMany({ items: { $exists: true, $size: 1 } });
});


//usually for child-parent referencing
// userSchema.virtual('',{
//
// })

exports.setModel = mongoose.model("Set", setSchema);
