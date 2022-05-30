const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const articleController = require("../controller/articleController");

const router = new express.Router();

// MIDDLEWARE REQUIRE AUTHENTICATION
router.use(requireAuth);
router.get("/", articleController.getArticles);
router.post("/", articleController.postArticles);
router.put("/update", articleController.updateArticle);
router.delete("/delete", articleController.deleteArticle);

module.exports = router;
