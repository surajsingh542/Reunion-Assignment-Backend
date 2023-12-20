const { validationResult } = require("express-validator");
const AppErr = require("../utils/AppErr");
const fs = require("fs");

const validationErrorHandler = (req, _, next) => {
  // Check if validation failed
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Delete any uploaded files
    if (req.file) fs.unlinkSync(req.file.path);
    if (req.files) req.files.forEach((file) => fs.unlinkSync(file.path));

    return next(new AppErr(errors.array()[0].msg, 406));
  }

  next();
};

module.exports = validationErrorHandler;
