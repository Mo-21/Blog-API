const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.user_register = [
  body("username")
    .trim()
    .isLength({ max: 25 })
    .withMessage("Max 25 characters allowed")
    .isAlpha()
    .withMessage("Please only use English Alphabet")
    .escape(),
  body("password").trim().escape(),
  body("passwordConfirmation")
    .trim()
    .escape()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      res.status(400).json("Please fill all fields");
    }

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      try {
        const userExists = await User.findOne({ email }).exec();
        if (userExists) res.status(400).json("User already exists!");

        bcrypt.hash(password, 10, async (err, hashedPassword) => {
          if (err) res.status(400).json(err);
          const user = new User({
            username: username,
            password: hashedPassword,
            email: email,
          });
          await user.save();
          if (user)
            res.status(201).json({
              _id: user.id,
              name: user.username,
              email: user.email,
              password: user.password,
              token: generateToken(user._id),
            });
        });
      } catch (err) {
        res.status(400).json(err);
      }
    }
  }),
];

exports.user_login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.username,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json("Invalid Credentials");
  }
});

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
