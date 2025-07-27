const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coinController');

// GET /api/coins - Get top 100 cryptocurrencies
router.get('/', coinController.getTopCoins);

// GET /api/coins/:id - Get detailed info about a specific coin
router.get('/:id', coinController.getCoinDetails);

module.exports = router; 