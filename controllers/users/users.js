const User = require("../../models/users/user");
const bcrypt = require("bcryptjs");
const AppErr = require("../../utils/AppErr");
const generateToken = require("../../utils/generateToken");

// User SignUp
const userSignupCtrl = async (req, res, next) => {
  try {
    const { password } = req.body;

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    req.body.password = hashedPassword;

    // Create User
    const user = await User.create(req.body);

    const token = generateToken(user._id, process.env.tokenAge);

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: process.env.tokenAge,
      })
      .json({
        status: "success",
        data: user,
        token,
        expiresIn: process.env.tokenAge,
      });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// User Login
const userLoginCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let userFound = await User.findOne({
      email,
    });

    if (!userFound) {
      return next(new AppErr("Invalid Login Credentials", 401));
    }

    // check for password validity
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return next(new AppErr("Invalid Login Credentials", 401));
    }

    const token = generateToken(userFound._id, process.env.tokenAge);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: process.env.tokenAge,
      })
      .json({
        status: "success",
        user: userFound,
        token,
        expiresIn: process.env.tokenAge,
      });
  } catch (error) {
    return next(new AppErr(error, 500));
  }
};

module.exports = {
  userSignupCtrl,
  userLoginCtrl,
};
