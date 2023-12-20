const Property = require("../../models/propeties/property");
const User = require("../../models/users/user");
const AppErr = require("../../utils/AppErr");

// Add Property
const addPropertyCtrl = async (req, res, next) => {
  try {
    const { propertyName, address } = req.body;

    // check if property already exists
    const propertyFound = await Property.findOne({ propertyName, address });

    if (propertyFound) {
      return next(new AppErr("Property already exists.", 400));
    }

    // Adding Property Listing User Id
    req.body.listedBy = req.userId;

    // If Property Image is Provided
    if (req.file) {
      req.body.propertyImg = {
        img_url: req.file.path,
        cloudinary_id: req.file.filename,
      };
    }

    // Create Property
    const propertyCreated = await Property.create(req.body);

    // Adding the listed Property Id in User
    const user = await User.findById(req.userId);
    user.properties.push(propertyCreated._id);
    await user.save();

    return res.json({
      status: "success",
      data: propertyCreated,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Get Properties
const getPropertiesCtrl = async (req, res, next) => {
  try {
    const properties = await Property.find({}).populate({
      path: "listedBy",
      select: {
        _id: 1,
        firstName: 1,
        lastName: 1,
      },
    });
    res.json({
      status: "success",
      data: properties,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Update Property
const updatePropertyCtrl = async (req, res, next) => {
  try {
    const propertyExists = await Property.findOne({
      address: req.body?.address ?? res.locals.propertyFound.address,
      name: req.body?.propertyName ?? res.locals.propertyFound.propertyName,
      _id: { $ne: req.params.id },
    });

    if (propertyExists) {
      return next(
        new AppErr("Property already exists with same address and name", 400)
      );
    }

    // If Property Image is Provided
    if (req.file) {
      req.body.propertyImg = {
        img_url: req.file.path,
        cloudinary_id: req.file.filename,
      };
    }

    // update the original Property
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true, runValidators: true }
    );

    res.json({
      status: "success",
      data: updatedProperty,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// delete Property
const deletePropertyCtrl = async (req, res, next) => {
  try {
    // delete Property
    await Property.findByIdAndDelete(req.params.id);

    // delete property from user model also
    await User.findByIdAndUpdate(req.userId, {
      $pull: { properties: { $eq: req.params.id } },
    });

    return res.json({
      status: "success",
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Get Own Properties
const getOwnPropertiesCtrl = async (req, res, next) => {
  try {
    const properties = await Property.find({ listedBy: req.userId });
    res.json({
      status: "success",
      data: properties,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  addPropertyCtrl,
  getPropertiesCtrl,
  updatePropertyCtrl,
  deletePropertyCtrl,
  getOwnPropertiesCtrl,
};
