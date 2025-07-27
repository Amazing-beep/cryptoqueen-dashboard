import React, { useState, useMemo } from 'react';
import { useCrypto } from '../context/CryptoContext';
import LoadingSpinner from '../components/LoadingSpinner';
import CoinCard from '../components/CoinCard';
import { Search, TrendingUp, Filter } from 'lucide-react';

const CoinList = () => {
  const { coins, loading, error } = useCrypto();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_rank');

  // Filter and sort coins
  const filteredAndSortedCoins = useMemo(() => {
    let filtered = coins;

    // Filter by search term
    if (searchTerm) {
      filtered = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort coins
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_rank':
          return a.market_cap_rank - b.market_cap_rank;
        case 'price':
          return b.current_price - a.current_price;
        case 'price_change':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'market_cap':
          return b.market_cap - a.market_cap;
        case 'volume':
          return b.total_volume - a.total_volume;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [coins, searchTerm, sortBy]);

  if (loading && coins.length === 0) {
    return <LoadingSpinner size="lg" text="Loading cryptocurrencies..." />;
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
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">Cryptocurrency Market</h1>
        </div>
        <p className="text-gray-600">
          Explore the top 100 cryptocurrencies by market capitalization
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="market_cap_rank">Market Cap Rank</option>
            <option value="price">Price</option>
            <option value="price_change">24h Change</option>
            <option value="market_cap">Market Cap</option>
            <option value="volume">Volume</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredAndSortedCoins.length} of {coins.length} cryptocurrencies
        </p>
      </div>

      {/* Coins Grid */}
      {loading ? (
        <LoadingSpinner text="Loading cryptocurrencies..." />
      ) : filteredAndSortedCoins.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No cryptocurrencies found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}

      {/* Load More Button (if needed) */}
      {filteredAndSortedCoins.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            All cryptocurrencies loaded
          </p>
        </div>
      )}
    </div>
  );
};

export default CoinList; 