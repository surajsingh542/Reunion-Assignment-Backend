const express = require("express");
const validationErrorHandler = require("../../middlewares/validationErrHandler");

const {
  addPropertyValidation,
  updatePropertyValidation,
  deletePropertyValidation,
} = require("../../utils/fieldValidationSchema");

const {
  addPropertyCtrl,
  getPropertiesCtrl,
  updatePropertyCtrl,
  deletePropertyCtrl,
  getOwnPropertiesCtrl,
} = require("../../controllers/propety/properties");

const isLogin = require("../../middlewares/isLogin");
const isListedByMe = require("../../middlewares/isListedByMe");

const propertyRoutes = express.Router();

// instance of multer
const multer = require("multer");
const storage = require("../../config/cloudinary");
const upload = multer({ storage });

// route /api/property
propertyRoutes.post(
  "/property",
  addPropertyValidation,
  validationErrorHandler,
  isLogin,
  upload.single("property_Img"),
  addPropertyCtrl
);

// route /api/list-properties
propertyRoutes.get("/list-properties", getPropertiesCtrl);

// route /api/property/:id
propertyRoutes.patch(
  "/property/:id",
  updatePropertyValidation,
  validationErrorHandler,
  isLogin,
  isListedByMe,
  upload.single("property_Img"),
  updatePropertyCtrl
);

// route /api/property/:id
propertyRoutes.delete(
  "/property/:id",
  deletePropertyValidation,
  validationErrorHandler,
  isLogin,
  isListedByMe,
  deletePropertyCtrl
);

// route /api/property
propertyRoutes.get("/property", isLogin, getOwnPropertiesCtrl);

module.exports = { propertyRoutes };
