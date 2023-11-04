const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const { currentUser, verifyUser } = require("../auth/auth");

router.get("/", controller.index);

router.get("/list", controller.list);

router.post("/verify", currentUser, controller.verify);

router.post("/login", controller.login);

router.post("/signup", controller.signup);

router.post("/:id/delete", verifyUser, controller.delete);

router.post("/:id/update", verifyUser, controller.update);

router.get("/:id", controller.read);

module.exports = router;
