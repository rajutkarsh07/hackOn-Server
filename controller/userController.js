const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(new AppError("you cannot delete other's account", 403));
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // const allUsers = await User.findAll();
  const allUsers = await User.find();

  res.status(200).json({
    status: "success",
    allUsers,
  });
});
