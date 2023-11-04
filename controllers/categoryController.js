const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Article Index");
});

exports.list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name articles").exec();

  res.json(allCategories);
});

exports.read = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)
    .populate("articles")
    .exec();

  res.json(category);
});

exports.create = [
  body("name")
    .trim()
    .isLength({ min: 4, max: 24 })
    .withMessage("Name must be between 4 and 24 characters")
    .custom(async (name) => {
      if (await Category.exists({ name })) {
        throw new Error("Name taken");
      }
      return true;
    })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let category = new Category({
      name: req.body.name,
      articles: [],
    });

    await category.save();

    res.json(`${req.body.name} category created`);
  }),
];

exports.delete = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category delete POST");
});

exports.update = asyncHandler(async (req, res, next) => {
  res.json("NOT IMPLEMENTED: Category update POST");
});
