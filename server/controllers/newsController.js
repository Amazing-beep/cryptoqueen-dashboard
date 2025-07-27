const axios = require('axios');

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = process.env.CACHE_DURATION || 300000; // 5 minutes

// NewsAPI configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

/**
 * Get trending cryptocurrency news articles
 */
const getTrendingNews = async (req, res) => {
  try {
    // Check if NewsAPI key is configured
    if (!NEWS_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'News API not configured',
        message: 'News API key is required to fetch news articles',
        developer: 'Nkhomotabo Amazing Mkhonta'
      });
    }

    const cacheKey = 'trending_news';
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

    // Get current date for news query
    const today = new Date();
    const fromDate = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000)); // 7 days ago

    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: 'cryptocurrency OR bitcoin OR ethereum OR blockchain',
        from: fromDate.toISOString().split('T')[0],
        to: today.toISOString().split('T')[0],
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 20,
        apiKey: NEWS_API_KEY
      },
      timeout: 10000
    });

    const articles = response.data.articles.map(article => ({
      source: {
        id: article.source.id,
        name: article.source.name
      },
      author: article.author,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content
    }));

    // Cache the result
    cache.set(cacheKey, {
      data: {
        status: response.data.status,
        totalResults: response.data.totalResults,
        articles: articles
      },
      timestamp: Date.now()
    });

    res.json({
      success: true,
      data: {
        status: response.data.status,
        totalResults: response.data.totalResults,
        articles: articles
      },
      cached: false,
      timestamp: new Date().toISOString(),
      developer: 'Nkhomotabo Amazing Mkhonta'
    });

  } catch (error) {
    console.error('Error fetching news:', error.message);
    
    // Handle specific API errors
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || 'News API error';
      
      if (status === 401) {
        return res.status(500).json({
          success: false,
          error: 'Invalid API key',
          message: 'News API key is invalid or expired',
          developer: 'Nkhomotabo Amazing Mkhonta'
        });
      }
      
      if (status === 429) {
        return res.status(429).json({
          success: false,
          error: 'Rate limit exceeded',
          message: 'Too many requests to News API. Please try again later.',
          developer: 'Nkhomotabo Amazing Mkhonta'
        });
      }
    }

    res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
      message: 'Unable to retrieve news articles at this time',
      developer: 'Nkhomotabo Amazing Mkhonta'
    });
  }
};

module.exports = {
  getTrendingNews
}; 