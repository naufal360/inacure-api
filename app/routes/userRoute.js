const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const userController = require("../controller/userController");
const historyController = require("../controller/historyController");

router.use(requireAuth);
router.get("/profile", userController.getUser);

// history route
router.get("/history", historyController.getHistory);

module.exports = router;
