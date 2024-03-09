const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var validator = require("validator");
const crypto = require("crypto");
const saltRounds = 12;

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    minLength: 7,
    maxLength: 50,
    validate: [validator.isEmail, "Email should be valid"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
    minLength: 7,
    select: false,
    validate: {
      validator: function (value) {
        // Regular expression to match at least one letter, one number, and one special character
        const regex =
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(value);
      },
      message:
        "Password must contain at least one letter, one number, and one special character.",
    },
  },

  accountType: {
    type: String,
    enum: ["admin", "non-admin"],
    default: "non-admin",
    unique: true
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  lastChangedPassword: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, saltRounds);
  this.confirmPassword = undefined;
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.lastChangedPassword = Date.now() - 1000;

  next();
});

userSchema.methods.correctPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.checkPasswordchanged = function (JWTTIMESTAMP) {
  if (!this.lastChangedPassword) return 0;
  const time = this.lastChangedPassword.getTime() / 1000;
  return time > JWTTIMESTAMP;
};

userSchema.methods.getPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; //expire after 10 minutes
  return resetToken;
};



module.exports = mongoose.model("User", userSchema);
