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

exports.create_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article create GET");
});

exports.create_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article create POST");
});

exports.delete_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article delete GET");
});

exports.delete_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article delete POST");
});

exports.update_get = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article update GET");
});

exports.update_post = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article update POST");
});
