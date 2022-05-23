const express = require("express");
const multer = require("multer");
const path = require("path");
const requireAuth = require('../middleware/requireAuth');


const predictController = require("../controller/predictController");
const { required } = require("joi");
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
  const ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return callback(new Error("Only images are allowed"));
  }
  callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });
const router = express.Router();
router.use(requireAuth);
router.post("/", upload.single("photo"), predictController);
module.exports = router;
