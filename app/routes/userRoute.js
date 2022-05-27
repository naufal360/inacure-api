const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const userController = require("../controller/userController");

router.use(requireAuth);
router.get("/profile", userController.getUser);

module.exports = router;
