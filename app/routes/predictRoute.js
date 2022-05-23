const express = require("express");
const multer = require("multer");
const path = require("path");

const predictController = require("../controller/predictController");
// configure multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(process.cwd(), "images"));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const imageFileFilter = (req, file, callback) => {
  var ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return callback(new Error("Only images are allowed"));
  }
  callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });
const router = express.Router();
router.post("/", upload.single("photo"), predictController);
module.exports = router;
