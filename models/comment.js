const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({});

CommentSchema.virtual("url").get(function () {
  return `/comment/${this._id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);
