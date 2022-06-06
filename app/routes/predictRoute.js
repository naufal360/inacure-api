const express = require("express");
const predictController = require("../controller/predictController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);
router.post("/", predictController);
module.exports = router;
