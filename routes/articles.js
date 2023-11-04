const express = require("express");
const router = express.Router();

const article_controller = require("../controllers/articleController");
const comment_controller = require("../controllers/commentController");
const { currentUser, verifyArticle, verifyComment } = require("../auth/auth");

router.get("/", article_controller.index);

router.get("/list", article_controller.list);

router.post("/create", currentUser, article_controller.create);

router.post("/:id/delete", verifyArticle, article_controller.delete);

router.post("/:id/like", currentUser, article_controller.like);

router.post("/:id/update", verifyArticle, article_controller.update);

router.get("/:id/comments", comment_controller.list);

router.post("/:id/comments/create", currentUser, comment_controller.create);

router.post(
  "/:id/comments/:cid/delete",
  verifyComment,
  comment_controller.delete
);

router.post(
  "/:id/comments/:cid/update",
  verifyComment,
  comment_controller.update
);

router.get("/:id/comments/:cid", comment_controller.read);

router.get("/:id", article_controller.read);

module.exports = router;
