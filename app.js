const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const AppError = require("./utils/appError");
// const globalErrorHandler = require("./controller/errorController");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(helmet());

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, // means 100 request per hour
  message: "To many request from this IP, try again after an hour",
});

app.use("/api", limiter);
app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());
app.use(xss());

app.use((req, res, next) => {
  req.requestTIme = new Date().toISOString();
  console.log(req.headers);
  next();
});

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;
