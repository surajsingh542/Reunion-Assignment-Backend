const express = require("express");
const validationErrorHandler = require("../../middlewares/validationErrHandler");

const {
  userSignUpValidation,
  userLoginValidation,
} = require("../../utils/fieldValidationSchema");

const {
  userSignupCtrl,
  userLoginCtrl,
} = require("../../controllers/users/users");

const userRoutes = express.Router();

// route /api/signup
userRoutes.post(
  "/signup",
  userSignUpValidation,
  validationErrorHandler,
  userSignupCtrl
);

// route /api/login
userRoutes.post(
  "/login",
  userLoginValidation,
  validationErrorHandler,
  userLoginCtrl
);

module.exports = { userRoutes };
