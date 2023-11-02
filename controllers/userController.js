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
  res.json(`NOT IMPLEMENTED: User read: ${req.params.id}`);
});

exports.create_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User create GET");
});

exports.create_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User create POST");
});

exports.delete_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User delete GET");
});

exports.delete_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User delete POST");
});

exports.update_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User update GET");
});

exports.update_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: User update POST");
});
