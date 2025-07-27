const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// GET /api/news - Get trending crypto news
router.get('/', newsController.getTrendingNews);

module.exports = router; 