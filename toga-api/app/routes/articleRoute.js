const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const router = new express.Router();

router.use(requireAuth);
router.get('/', () => {});

module.exports = router;
