const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User Index");
});

exports.list = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find({}, "username articles comments")
    .populate("articles comments")
    .exec();

  res.json(allUsers);
});

exports.read = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id, "username articles comments")
    .populate("articles comments")
    .exec();

  res.json(user);
});

exports.create = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User create POST");
});

exports.delete = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User delete POST");
});

exports.update = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User update POST");
});
