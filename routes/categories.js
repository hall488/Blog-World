const express = require("express");
const router = express.Router();

const controller = require("../controllers/categoryController");
const { currentUser } = require("../auth/auth");

router.get("/", controller.index);

router.get("/list", controller.list);

router.post("/create", currentUser, controller.create);

router.post("/:id/delete", controller.delete);

router.post("/:id/update", controller.update);

router.get("/:id", controller.read);

module.exports = router;
