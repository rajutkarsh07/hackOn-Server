const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = catchAsync(async (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 5);
  const newUser = new User({
    ...req.body,
    password: hash,
  });

  await newUser.save();
  res.status(201).json({
    status: "success",
    message: "User created successfully",
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return next(new AppError("User not exist", 404));
  }

  const isCorrect = bcrypt.compareSync(req.body.password, user.password);
  const token = jwt.sign(
    {
      id: user._id,
      isSeller: user.isSeller,
    },
    process.env.JWT_SECRET
  );

  if (!isCorrect) {
    return next(new AppError("Wrong password or username", 400));
  }

  const { password, ...info } = user._doc;
  res
    .cookie("accessToken", token, {
      httpOnly: true,
    })
    .status(200)
    .send(info);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("accessToken", {
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    status: "success",
    message: "User has been logged out",
  });
});
