const express = require("express");
const router = express.Router();

const controller = require("../controllers/articleController");
const { currentUser, verifyArticle } = require("../auth/auth");

router.get("/", controller.index);

router.get("/list", controller.list);

router.post("/create", currentUser, controller.create);

router.post("/:id/delete", verifyArticle, controller.delete);

router.post("/:id/like", currentUser, controller.like);

router.post("/:id/update", verifyArticle, controller.update);

router.get("/:id", controller.read);

module.exports = router;
