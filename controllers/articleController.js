const Article = require("../models/article");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article Index");
});

exports.list = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article List");
});

exports.read = asyncHandler(async (req, res, next) => {
  res.json(`NOT IMPLEMENTED: Article read: ${req.params.id}`);
});

exports.create = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article create POST");
});

exports.delete = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article delete POST");
});

exports.update = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article update POST");
});
