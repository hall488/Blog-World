const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article Index");
});

exports.list = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category List");
});

exports.read = asyncHandler(async (req, res, next) => {
  res.json(`NOT IMPLEMENTED: Category read: ${req.params.id}`);
});

exports.create = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category create POST");
});

exports.delete = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category delete POST");
});

exports.update = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category update POST");
});
