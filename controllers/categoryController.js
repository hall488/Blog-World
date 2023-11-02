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

exports.create_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category create GET");
});

exports.create_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category create POST");
});

exports.delete_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category delete GET");
});

exports.delete_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category delete POST");
});

exports.update_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category update GET");
});

exports.update_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category update POST");
});
