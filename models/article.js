const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({});

ArticleSchema.virtual("url").get(function () {
  return `/article/${this._id}`;
});

module.exports = mongoose.model("Article", ArticleSchema);
