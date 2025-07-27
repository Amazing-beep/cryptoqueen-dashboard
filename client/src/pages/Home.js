import React from 'react';
import { Link } from 'react-router-dom';
import { useCrypto } from '../context/CryptoContext';
import LoadingSpinner from '../components/LoadingSpinner';
import CoinCard from '../components/CoinCard';
import NewsCard from '../components/NewsCard';
import { TrendingUp, Newspaper, ArrowRight, Crown, Sparkles } from 'lucide-react';

const Home = () => {
  const { coins, news, loading, error } = useCrypto();

  // Safely slice arrays with fallback to empty arrays
  const topCoins = (coins && Array.isArray(coins)) ? coins.slice(0, 6) : [];
  const topNews = (news && Array.isArray(news)) ? news.slice(0, 3) : [];

  if (loading && (!coins || coins.length === 0)) {
    return <LoadingSpinner size="lg" text="Loading CryptoQueen Dashboard..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Crown className="w-8 h-8 text-primary-600" />
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            CryptoQueen Dashboard
          </h1>
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Empowering women to explore and understand cryptocurrency with real-time data and insights
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/coins" className="btn-primary flex items-center justify-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Explore Coins</span>
          </Link>
          <a 
            href="https://codedbyamazing.tech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Top Coins Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Top Cryptocurrencies</h2>
          </div>
          <Link 
            to="/coins" 
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading top cryptocurrencies..." />
        ) : topCoins.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No cryptocurrency data available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </div>
        )}
      </section>

      {/* News Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Latest Crypto News</h2>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading latest news..." />
        ) : topNews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No news articles available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topNews.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose CryptoQueen?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Data</h3>
            <p className="text-gray-600">Get live cryptocurrency prices and market data updated every minute</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Newspaper className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Latest News</h3>
            <p className="text-gray-600">Stay informed with the latest cryptocurrency news and market insights</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Women-Focused</h3>
            <p className="text-gray-600">Designed specifically to empower women in the cryptocurrency space</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 