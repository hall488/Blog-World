const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  text: { type: String, required: true },
  likes: { type: Number, required: true },
  views: { type: Number, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  published: { type: Boolean, required: true },
});

ArticleSchema.virtual("url").get(function () {
  return `/article/${this._id}`;
});

module.exports = mongoose.model("Article", ArticleSchema);
