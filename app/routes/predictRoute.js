const express = require("express");
const multer = require("multer");
const path = require("path");
const predictController = require("../controller/predictController");

const router = express.Router();
router.post("/", predictController);
module.exports = router;
