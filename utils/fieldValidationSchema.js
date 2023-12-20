const { body, param } = require("express-validator");
const User = require("../models/users/user");

const userSignUpValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is required")
    .isString()
    .withMessage("Please enter a valid string"),

  body("lastName")
    .optional()
    .trim()
    .isString()
    .withMessage("Please enter a valid string")
    .notEmpty()
    .withMessage("Last Name is empty"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail()
    .custom(async (value) => {
      const userFound = await User.findOne({ email: value });
      if (userFound) {
        throw new Error("Email Already in use");
      }
    }),

  body("contactNumber")
    .trim()
    .notEmpty()
    .withMessage("Contact Number is required")
    .isMobilePhone("en-IN")
    .withMessage("Please enter a valid Contact Number."),

  body("emergencyContactNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Contact Number is empty")
    .isMobilePhone("en-IN")
    .withMessage("Please enter a valid Contact Number."),

  body("gender")
    .optional()
    .trim()
    .isString()
    .withMessage("Please enter a valid string")
    .notEmpty()
    .withMessage("Gender is empty"),

  body("dob")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Date of Birth is empty")
    .isDate()
    .withMessage("Must be a valid date")
    .toDate(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long"),
];

const userLoginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long"),
];

const addPropertyValidation = [
  body("propertyName")
    .trim()
    .notEmpty()
    .withMessage("Property Name is required."),

  body("address")
    .notEmpty()
    .withMessage("Please provide the address")
    .isObject()
    .withMessage("Please provide a valid address object"),

  body("address.houseAddress1")
    .optional()
    .isString()
    .withMessage("Please provide a valid house address 1")
    .notEmpty()
    .withMessage("House address 1 is empty"),

  body("address.streetAddress2")
    .optional()
    .isString()
    .withMessage("Please provide a valid street address 2")
    .notEmpty()
    .withMessage("Street address 2 is empty"),

  body("address.landmark")
    .optional()
    .isString()
    .withMessage("Please provide a valid landmark")
    .notEmpty()
    .withMessage("Landmark is empty"),

  body("address.city")
    .trim()
    .isString()
    .withMessage("Please provide a valid city")
    .notEmpty()
    .withMessage("City is empty"),

  body("address.state")
    .trim()
    .isString()
    .withMessage("Please provide a valid state/province")
    .notEmpty()
    .withMessage("State/Province is empty"),

  body("address.zipCode")
    .optional()
    .notEmpty()
    .withMessage("Postal/Zip code is empty")
    .isPostalCode("IN")
    .withMessage("Please provide a valid Postal/Zip code"),

  body("address.country")
    .trim()
    .isString()
    .withMessage("Please provide a valid country")
    .notEmpty()
    .withMessage("Country is empty"),

  body("propertyType")
    .trim()
    .notEmpty()
    .withMessage("Please provide the Property Type")
    .isIn(["commercial", "housing", "agricultural"])
    .withMessage(
      "Please specify either `commercial`, `housing`, or `agricultural`"
    ),

  body("rent")
    .notEmpty()
    .withMessage("Please provide the Per Month Rent")
    .toInt(10)
    .isInt({ min: 0, allow_leading_zeroes: false })
    .withMessage("Please enter a valid value of rent"),

  body("area")
    .notEmpty()
    .withMessage("Please provide the area")
    .isObject()
    .withMessage("Please provide a valid area object"),

  body("area.length")
    .notEmpty()
    .withMessage("Please provide the length of property")
    .toInt(10)
    .isInt({ gt: 0, allow_leading_zeroes: false })
    .withMessage("Please enter a valid value of length"),

  body("area.width")
    .notEmpty()
    .withMessage("Please provide the width of property")
    .toInt(10)
    .isInt({ gt: 0, allow_leading_zeroes: false })
    .withMessage("Please enter a valid value of width"),

  body("bed")
    .notEmpty()
    .withMessage("Please provide the number of beds")
    .toInt(10)
    .isInt({ min: 0, allow_leading_zeroes: false })
    .withMessage("Please enter a valid value of bed"),

  body("bathroom")
    .notEmpty()
    .withMessage("Please provide the number of bathrooms")
    .toInt(10)
    .isInt({ min: 0, allow_leading_zeroes: false })
    .withMessage("Please enter a valid value of bathroom"),

  body("availableFrom")
    .trim()
    .notEmpty()
    .withMessage("Availability Date is empty")
    .isDate()
    .withMessage("Must be a valid available date YYYY-MM-DD")
    .toDate(),
];

const updatePropertyValidation = [
  body("propertyName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Property Name is required."),

  body("address")
    .optional()
    .notEmpty()
    .withMessage("Please provide the address")
    .isObject()
    .withMessage("Please provide a valid address object"),

  body("address.houseAddress1")
    .optional()
    .isString()
    .withMessage("Please provide a valid house address 1")
    .notEmpty()
    .withMessage("House address 1 is empty"),

  body("address.streetAddress2")
    .optional()
    .isString()
    .withMessage("Please provide a valid street address 2")
    .notEmpty()
    .withMessage("Street address 2 is empty"),

  body("address.landmark")
    .optional()
    .isString()
    .withMessage("Please provide a valid landmark")
    .notEmpty()
    .withMessage("Landmark is empty"),

  body("address.city")
    .optional()
    .trim()
    .isString()
    .withMessage("Please provide a valid city")
    .notEmpty()
    .withMessage("City is empty"),

  body("address.state")
    .optional()
    .trim()
    .isString()
    .withMessage("Please provide a valid state/province")
    .notEmpty()
    .withMessage("State/Province is empty"),

  body("address.zipCode")
    .optional()
    .notEmpty()
    .withMessage("Postal/Zip code is empty")
    .isPostalCode("IN")
    .withMessage("Please provide a valid Postal/Zip code"),

  body("address.country")
    .optional()
    .trim()
    .isString()
    .withMessage("Please provide a valid country")
    .notEmpty()
    .withMessage("Country is empty"),

  body("propertyType")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Please provide the Property Type")
    .isIn(["commercial", "housing", "agricultural"])
    .withMessage(
      "Please specify either `commercial`, `housing`, or `agricultural`"
    ),

  body("rent")
    .optional()
    .notEmpty()
    .withMessage("Please provide the Per Month Rent")
    .toInt(10)
    .isInt({ min: 0, allow_leading_zeroes: false })
    .withMessage("Please enter a valid value of rent"),

  body("area")
    .optional()
    .notEmpty()
    .withMessage("Please provide the area")
    .isObject()
    .withMessage("Please provide a valid area object"),

  body("area.length")
    .optional()
    .notEmpty()
    .withMessage("Please provide the length of property")
    .toInt(10)
    .isInt({ gt: 0, allow_leading_zeroes: false })
    .withMessage("Please enter a valid value of length"),

  body("area.width")
    .optional()
    .notEmpty()
    .withMessage("Please provide the width of property")
    .toInt(10)
    .isInt({ gt: 0, allow_leading_zeroes: false })
    .withMessage("Please enter a valid value of width"),

  body("bed")
    .optional()
    .notEmpty()
    .withMessage("Please provide the number of beds")
    .toInt(10)
    .isInt({ min: 0, allow_leading_zeroes: false })
    .withMessage("Please enter a valid value of bed"),

  body("bathroom")
    .optional()
    .notEmpty()
    .withMessage("Please provide the number of bathrooms")
    .toInt(10)
    .isInt({ min: 0, allow_leading_zeroes: false })
    .withMessage("Please enter a valid value of bathroom"),

  param("id")
    .exists()
    .withMessage("Please provide property Id")
    .isMongoId()
    .withMessage("Please provide valid property Id"),

  body("availableFrom")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Availability Date is empty")
    .isDate()
    .withMessage("Must be a valid available date YYYY-MM-DD")
    .toDate(),
];

const deletePropertyValidation = [
  param("id")
    .exists()
    .withMessage("Please provide property Id")
    .isMongoId()
    .withMessage("Please provide valid property Id"),
];

module.exports = {
  userSignUpValidation,
  userLoginValidation,
  addPropertyValidation,
  updatePropertyValidation,
  deletePropertyValidation,
};
