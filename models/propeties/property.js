const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    propertyName: {
      type: String,
      required: true,
    },
    address: {
      houseAddress1: {
        type: String,
        trim: true,
      },
      streetAddress2: {
        type: String,
        trim: true,
      },
      landmark: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
        required: true,
      },
      state: {
        type: String,
        trim: true,
        required: true,
      },
      zipCode: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
        required: true,
      },
    },
    listedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    propertyType: {
      type: String,
      enum: ["commercial", "housing", "agricultural"],
      required: true,
    },
    rent: {
      type: Number,
      min: 0,
      required: true,
    },
    propertyImg: {
      type: Object,
    },
    area: {
      length: {
        type: Number,
        min: 1,
        required: true,
      },
      width: {
        type: Number,
        min: 1,
        required: true,
      },
    },
    availableFrom: {
      type: Date,
    },
    bed: {
      type: Number,
      min: 0,
      required: true,
    },
    bathroom: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
