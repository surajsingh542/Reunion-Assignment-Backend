const AppErr = require("../utils/AppErr");
const getTokenFromCookie = require("../utils/getTokenFromCookie");
const verifyToken = require("../utils/verifyToken");
const User = require("../models/users/user");

const isLogin = async (req, res, next) => {
  const token = getTokenFromCookie(req);
  const decodedUser = verifyToken(token);

  // Saving in req to be accessed by controllers
  req.userId = decodedUser.id;

  if (!decodedUser) {
    return next(new AppErr("Invalid/Expired Token, Please Login Again", 401));
  }

  let userExist = await User.findById(decodedUser.id);

  if (!userExist) {
    return next(new AppErr("User does not exist, Please Login Again", 401));
  }

  // Store authenticated user into object
  res.locals.user = userExist.toJSON();

  next();
};

module.exports = isLogin;
