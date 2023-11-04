const Comment = require("../models/comment");
const Article = require("../models/article");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment Index");
});

exports.list = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment List");
});

exports.read = asyncHandler(async (req, res, next) => {
  res.json(`NOT IMPLEMENTED: Comment read: ${req.params.id}`);
});

// user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   text: { type: String, required: true },
//   likes: { type: Number, required: true },

exports.create = [
  body("text")
    .trim()
    .isLength({ min: 6, max: 255 })
    .withMessage("Text must be between 6 and 255 characters")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    //create comment
    //add comment to article
    //add comment to user
    console.log(req.params.id);

    let [user, article] = await Promise.all([
      User.findById(req.currentUser.id).populate("comments").exec(),
      Article.findById(req.params.id).populate("comments title").exec(),
    ]);

    let comment = new Comment({
      user: req.currentUser.id,
      text: req.body.text,
      likes: 0,
    });

    console.log(user, article);

    user.comments.push(comment._id);
    article.comments.push(comment._id);

    await Promise.all([comment.save(), user.save(), article.save()]);

    res.json(`${req.currentUser.username} commented on ${article.title}`);
  }),
];

exports.delete = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment delete POST");
});

exports.update = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment update POST");
});
