const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
  }

  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;

  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = mongoose.model("User", UserSchema);
