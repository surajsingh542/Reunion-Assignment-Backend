const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    emergencyContactNumber: {
      type: String,
    },
    profileImg: {
      type: Object,
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
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

const User = mongoose.model("User", userSchema);
module.exports = User;
