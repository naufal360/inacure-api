const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const articleController = require("../controller/articleController");
const uploadController = require("../controller/uploadController");


const router = new express.Router();

// MIDDLEWARE REQUIRE AUTHENTICATION
router.use(requireAuth);
router.get("/", articleController.getArticles);
router.post("/", articleController.postArticles);
router.put("/update", articleController.updateArticle);
router.delete("/delete", articleController.deleteArticle);

// Upload Route
router.post("/upload", uploadController.postUpload);
router.get("/upload", uploadController.getUploads);
router.delete("/upload", uploadController.deleteUpload);

module.exports = router;
