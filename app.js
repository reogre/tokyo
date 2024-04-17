const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");

const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const viewRouter = require("./routes/viewRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// Security HTTP headers
app.use(express.static(path.join(__dirname, "public")));

app.use(helmet());

app.use(cors());

// Logging info for development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from the same IP
const limiter = rateLimit({
  max: 30,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Reading data from body into req.body, file size limited
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data sanitize against NoSQL query injections
app.use(mongoSanitize());

app.use(express.json());

app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
