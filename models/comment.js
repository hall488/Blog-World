const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  likes: { type: Number, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

CommentSchema.virtual("url").get(function () {
  return `/comment/${this._id}`;
});

module.exports = mongoose.model("Comment", CommentSchema);
