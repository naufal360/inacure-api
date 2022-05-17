const express = require('express');
const router = new express.Router();
const authController = require('../controller/authController');

router.get('/', authController.createUser);

module.exports = router;
