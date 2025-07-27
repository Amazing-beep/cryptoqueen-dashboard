const axios = require('axios');

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = process.env.CACHE_DURATION || 300000; // 5 minutes

// CoinGecko API base URL
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

/**
 * Get top 100 cryptocurrencies with live data
 */
const getTopCoins = async (req, res) => {
  try {
    const cacheKey = 'top_coins';
    const cached = cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return res.json({
        success: true,
        data: cached.data,
        cached: true,
        timestamp: new Date().toISOString(),
        developer: 'Nkhomotabo Amazing Mkhonta'
      });
    }

    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
        locale: 'en'
      },
      timeout: 10000
    });

    const coins = response.data.map(coin => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      total_volume: coin.total_volume,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_24h: coin.price_change_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap_change_24h: coin.market_cap_change_24h,
      market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h,
      circulating_supply: coin.circulating_supply,
      total_supply: coin.total_supply,
      max_supply: coin.max_supply,
      ath: coin.ath,
      ath_change_percentage: coin.ath_change_percentage,
      ath_date: coin.ath_date,
      atl: coin.atl,
      atl_change_percentage: coin.atl_change_percentage,
      atl_date: coin.atl_date,
      last_updated: coin.last_updated
    }));

    // Cache the result
    cache.set(cacheKey, {
      data: coins,
      timestamp: Date.now()
    });

    res.json({
      success: true,
      data: coins,
      cached: false,
      timestamp: new Date().toISOString(),
      developer: 'Nkhomotabo Amazing Mkhonta'
    });

  } catch (error) {
    console.error('Error fetching top coins:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cryptocurrency data',
      message: 'Unable to retrieve coin information at this time',
      developer: 'Nkhomotabo Amazing Mkhonta'
    });
  }
};

/**
 * Get detailed information about a specific coin
 */
const getCoinDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `coin_${id}`;
    const cached = cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return res.json({
        success: true,
        data: cached.data,
        cached: true,
        timestamp: new Date().toISOString(),
        developer: 'Nkhomotabo Amazing Mkhonta'
      });
    }

    const response = await axios.get(`${COINGECKO_API}/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: true,
        developer_data: true,
        sparkline: false
      },
      timeout: 10000
    });

    const coinData = {
      id: response.data.id,
      symbol: response.data.symbol.toUpperCase(),
      name: response.data.name,
      description: response.data.description.en,
      image: response.data.image,
      market_data: response.data.market_data,
      community_data: response.data.community_data,
      developer_data: response.data.developer_data,
      links: response.data.links,
      genesis_date: response.data.genesis_date,
      last_updated: response.data.last_updated
    };

    // Cache the result
    cache.set(cacheKey, {
      data: coinData,
      timestamp: Date.now()
    });

    res.json({
      success: true,
      data: coinData,
      cached: false,
      timestamp: new Date().toISOString(),
      developer: 'Nkhomotabo Amazing Mkhonta'
    });

  } catch (error) {
    console.error('Error fetching coin details:', error.message);
    
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        error: 'Coin not found',
        message: 'The requested cryptocurrency could not be found',
        developer: 'Nkhomotabo Amazing Mkhonta'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to fetch coin details',
      message: 'Unable to retrieve coin information at this time',
      developer: 'Nkhomotabo Amazing Mkhonta'
    });
  }
};

module.exports = {
  getTopCoins,
  getCoinDetails
}; 