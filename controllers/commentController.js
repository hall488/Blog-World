const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment Index");
});

exports.list = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment List");
});

exports.read = asyncHandler(async (req, res, next) => {
  res.json(`NOT IMPLEMENTED: Comment read: ${req.params.id}`);
});

exports.create_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment create GET");
});

exports.create_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment create POST");
});

exports.delete_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment delete GET");
});

exports.delete_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment delete POST");
});

exports.update_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment update GET");
});

exports.update_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment update POST");
});
