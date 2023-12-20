const AppErr = require("../utils/AppErr");
const Property = require("../models/propeties/property");

const isListedByMe = async (req, res, next) => {
  const propertyFound = await Property.findById(req.params.id);
  if (!propertyFound) {
    return next(new AppErr("Property not found", 404));
  }

  // check if property listed by logged in user
  if (propertyFound.listedBy.toString() !== req.userId.toString()) {
    return next(new AppErr("Property is not listed  by you.", 403));
  }

  // Store found property into object
  res.locals.propertyFound = propertyFound.toJSON();

  next();
};

module.exports = isListedByMe;
