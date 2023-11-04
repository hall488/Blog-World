const Comment = require("../models/comment");
const Article = require("../models/article");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Comment Index");
});

exports.list = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id, "comments")
    .populate("comments")
    .exec();

  res.json(article.comments);
});

exports.read = asyncHandler(async (req, res, next) => {
  res.json(`NOT IMPLEMENTED: Comment read: ${req.params.id}`);
});

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

    let [user, article] = await Promise.all([
      User.findById(req.currentUser.id).populate("comments").exec(),
      Article.findById(req.params.id).populate("comments title").exec(),
    ]);

    let comment = new Comment({
      user: req.currentUser.id,
      text: req.body.text,
      likes: 0,
    });

    user.comments.push(comment._id);
    article.comments.push(comment._id);

    await Promise.all([comment.save(), user.save(), article.save()]);

    res.json(`${req.currentUser.username} commented on ${article.title}`);
  }),
];

exports.delete = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let [article, user, comment] = await Promise.all([
    Article.findById(req.params.id).populate("comments title").exec(),
    User.findById(req.currentUser.id).populate("comments").exec(),
    Comment.findById(req.params.cid).exec(),
  ]);

  article.comments.pull(req.params.cid);
  user.comments.pull(req.params.cid);

  await Promise.all([article.save(), user.save(), comment.deleteOne()]);

  res.json({
    message: `${req.currentUser.username} deleted comment on ${article.title}`,
  });
});

exports.update = [
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

    let comment = await Comment.findById(req.params.cid).exec();

    comment.text = req.body.text;

    await comment.save();

    res.json({ message: `Comment Updated` });
  }),
];
