const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
// const generateAccessToken = require("../controllers/auth");

const User = require("../models/user");

exports.token = asyncHandler(async (req, res, next) => {
  //Get token from cookies
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  if (!refreshToken) res.status(401).json("Not Authorized!");
  //   console.log(refreshToken);
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password").exec();
  if (!user) {
    return res.status(403);
  }

  const newAccessToken = generateAccessToken(decoded.id);

  const newUser = await User.findOneAndUpdate(
    { username: user.username },
    { refreshToken: newAccessToken },
    { new: true },
  );
  res;

  next();
});

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_JWT_SECRET, {
    expiresIn: "30s",
  });
};
