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

exports.create = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment create POST");
});

exports.delete = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment delete POST");
});

exports.update = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment update POST");
});
