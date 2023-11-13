const Article = require("../models/article");
const User = require("../models/user");
const Category = require("../models/category");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article Index");
});

exports.list = asyncHandler(async (req, res, next) => {
  const allArticles = await Article.find({}, "title user likes views")
    .populate("user", "username")
    .exec();

  res.json(allArticles);
});

exports.read = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id)
    .populate("user", "username")
    .populate("category")
    .populate({
      path: "comments",
      populate: { path: "user", select: "username" },
    })
    .exec();

  res.json(article);
});

exports.like = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id).exec();

  console.log(article);
  if (article.likes.includes(req.currentUser.id)) {
    return res.status(422).json({ message: "User already liked this" });
  }

  article.likes.push(req.currentUser.id);
  await article.save();
  res.json({ messagee: `${req.currentUser.username} liked ${article.title}` });
});

exports.create = [
  body("title")
    .trim()
    .isLength({ min: 6, max: 60 })
    .withMessage("Title must be between 6 and 60 characters")
    .escape(),
  body("category")
    .trim()
    .isLength({ min: 4, max: 16 })
    .withMessage("Category must be between 4 and 16 characters")
    .custom(async (category, { req }) => {
      let id = await Category.exists({ name: category });
      if (!id) {
        throw new Error("Category does not exist");
      }

      req.category_id = id;
      return true;
    }),
  body("text")
    .trim()
    .isLength({ min: 6, max: 64000 })
    .withMessage("Text must be between 6 and 64000 characters")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { title, text } = req.body;

    const [user, category] = await Promise.all([
      User.findById(req.currentUser.id).populate("articles").exec(),
      Category.findById(req.category_id).populate("articles").exec(),
    ]);

    let article = new Article({
      user: req.currentUser.id,
      title: title,
      category: req.category_id,
      text: text,
      likes: [],
      views: 0,
      comments: [],
      published: true,
    });

    user.articles.push(article._id);
    category.articles.push(article._id);

    await Promise.all([article.save(), user.save(), category.save()]);

    res.json({ message: "Created New Article", id: article._id });
  }),
];

exports.delete = [
  body("title")
    .trim()
    .isLength({ min: 6, max: 60 })
    .withMessage("Title must be between 6 and 60 characters")
    .custom(async (title, { req }) => {
      let article = await Article.findById(req.params.id, "title");

      if (title !== article.title) {
        throw new Error("Title does not match");
      }

      return true;
    })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let [article, user] = await Promise.all([
      Article.findById(req.params.id, "title comments category")
        .populate("comments", "_id")
        .populate("category", "articles")
        .exec(),
      User.findById(req.currentUser.id).populate("articles").exec(),
    ]);

    let comment_ids = article.comments.map((c) => c._id);
    let category = article.category;

    category.articles.pull(article._id);
    user.articles.pull(article._id);

    await Promise.all([
      article.deleteOne(),
      Comment.deleteMany({ _id: { $in: comment_ids } }),
      category.save(),
      user.save(),
    ]);

    res.json({ message: `Article '${article.title}' deleted` });
  }),
];

exports.update = [
  body("title")
    .optional({ values: undefined })
    .trim()
    .isLength({ min: 6, max: 60 })
    .withMessage("Title must be between 6 and 60 characters")
    .escape(),
  body("category")
    .optional({ values: undefined })
    .trim()
    .isLength({ min: 4, max: 16 })
    .withMessage("Category must be between 4 and 16 characters")
    .custom(async (category, { req }) => {
      let id = await Category.exists({ name: category });
      if (!id) {
        throw new Error("Category does not exist");
      }

      req.category_id = id;
      return true;
    }),
  body("text")
    .optional({ values: undefined })
    .trim()
    .isLength({ min: 6, max: 64000 })
    .withMessage("Text must be between 6 and 64000 characters")
    .escape(),
  body("published").optional({ values: undefined }).isBoolean().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let article = await Article.findById(req.params.id)
      .populate("category", "articles")
      .exec();

    if (req.body.category !== undefined) {
      let category = await Category.findOne({ name: req.body.category })
        .populate("articles")
        .exec();
      article.category.articles.pull(article._id);
      category.articles.push(article._id);
      await Promise.all([category.save(), article.category.save()]);
      article.category = category._id;
    }

    if (req.body.text !== undefined) {
      article.text = req.body.text;
    }

    if (req.body.title !== undefined) {
      article.title = req.body.title;
    }

    if (req.body.published !== undefined) {
      article.published = req.body.published;
    }

    await article.save();

    res.json({ message: "Updated article" });
  }),
];
