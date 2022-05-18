const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const articleController = require('../controller/articleController');

const router = new express.Router();

// MIDDLEWARE REQUIRE AUTHENTICATION
router.use(requireAuth);
router.get('/', articleController.getArticles);
router.post('/post', articleController.postArticles);

module.exports = router;
