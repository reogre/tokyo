const path = require("path");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, "../public", "index.html"));
});
