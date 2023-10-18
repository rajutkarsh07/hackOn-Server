const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(new AppError("You are not authenticated", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return next(new AppError("Token is not valid", 403));
    }
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
