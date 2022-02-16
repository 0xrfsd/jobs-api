const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/fetch", userController.fetchId);

module.exports = router;
