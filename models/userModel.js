const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tell us your name!"],
  },
  phone: {
    type: String,
    required: [true, "Type your phone number"],
    unique: true,
    validate: {
      validator: function (el) {
        // sMobilePhone(str [, locale [, options]])
        return validator.isMobilePhone(el, "ru-RU", { strictMode: true });
      },
      message: "Provide a valid phone number",
    },
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
