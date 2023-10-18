const express = require("express");
const userController = require("./../controllers/userController");
const { response } = require("../app");
const { verifyToken } = require("../middleware/token");

const router = express.Router();

// router.get('/test', userController.deleteUser);
router.delete("/:id", verifyToken, userController.deleteUser);
router.get("/:id", verifyToken, userController.getUser);
router.get("/", userController.getAllUsers);

module.exports = router;
