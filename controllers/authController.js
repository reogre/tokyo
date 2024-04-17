const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });

  try {
    await sendEmail({
      email: newUser.email,
      subject: "tokyo2024",
      message: "hype! Your profile is active",
    });

    res.status(201).json({
      status: "success",
      message: "User created and email sent successfuly!",
    });
  } catch (err) {
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500,
    );
  }
});
