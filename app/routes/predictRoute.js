const express = require("express");
const multer = require("multer");
const path = require("path");
const predictController = require("../controller/predictController");

// configure multer
const imageFileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return callback(new Error("Only images are allowed"));
  }
  callback(null, true);
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();
router.post("/", predictController);
module.exports = router;
