require("dotenv").config();
const jwt = require("jsonwebtoken");
const Article = require("../models/article");

exports.verifyUser = (req, res, next) => {
  jwt.verify(req.body.token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      res.json(err);
    } else if (req.params.id !== decoded.id) {
      res.status(422).json({ error: "Unauthorized" });
    } else {
      req.currentUser = decoded;
      next();
    }
  });
};

exports.verifyArticle = (req, res, next) => {
  jwt.verify(req.body.token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) {
      return res.json(err);
    } else {
      let article = await Article.findById(req.params.id)
        .populate("user")
        .exec();
      if (!article) {
        return res.status(422).json({ error: "Article does not exist" });
      } else if (article.user.id !== decoded.id) {
        return res.status(422).json({ error: "Unauthorized" });
      } else {
        req.currentUser = decoded;
        next();
      }
    }
  });
};

exports.currentUser = (req, res, next) => {
  jwt.verify(req.body.token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.json(err);
    } else {
      req.currentUser = decoded;

      next();
    }
  });
};
