require("dotenv").config();
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User Index");
});

exports.list = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find({}, "username articles comments")
    .populate("articles", "title")
    .exec();

  res.json(allUsers);
});

exports.read = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id, "username articles comments")
    .populate("articles", "title")
    .exec();

  res.json(user);
});

exports.signup = [
  body("username")
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Username must be between 6 and 16 characters")
    .custom(async (username) => {
      if (await User.exists({ username: username })) {
        throw new Error("Username taken");
      }
      return true;
    })
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 6 and 16 characters")
    .escape(),
  body("password_confirm")
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 6 and 16 characters")
    .custom((password_confirm, { req }) => {
      if (password_confirm !== req.body.password) {
        throw new Error("Passwords must match");
      }

      return true;
    })
    .withMessage("Passwords must match")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { username, password } = req.body;

    let user = new User({
      username: username,
      password: password,
    });

    await user.save();

    res.json(`Welcome ${username}!`);
  }),
];

exports.login = [
  body("username")
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 6 and 16 characters")
    .custom(async (username) => {
      if (!(await User.exists({ username: username }))) {
        throw new Error("User not found");
      }
      return true;
    })
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 6 and 16 characters")
    .custom(async (password, { req }) => {
      let user = await User.findOne({ username: req.body.username });
      if (!(await user.isValidPassword(password))) {
        throw new Error("Invalid password");
      }
      return true;
    })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let user = await User.findOne({ username: req.body.username }).exec();
    let token = jwt.sign(
      { id: user.id, username: req.body.username },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    res.json({ id: user.id, token });
  }),
];

exports.delete = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User delete POST");
});

exports.update = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User update POST");
});
