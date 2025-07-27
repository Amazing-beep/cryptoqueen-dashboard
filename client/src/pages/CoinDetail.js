import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCrypto } from '../context/CryptoContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink, Calendar, DollarSign, BarChart3 } from 'lucide-react';

const CoinDetail = () => {
  const { id } = useParams();
  const { coinDetails, loading, error, fetchCoinDetails } = useCrypto();

  useEffect(() => {
    if (id) {
      fetchCoinDetails(id);
    }
  }, [id, fetchCoinDetails]);

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatNumber = (num) => {
    if (num >= 1e12) {
      return `${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
      return `${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `${(num / 1e6).toFixed(2)}M`;
    } else {
      return num.toLocaleString();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading coin details..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/coins" className="btn-primary">
            Back to Coins
          </Link>
        </div>
      </div>
    );
  }

  if (!coinDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Coin not found</h2>
          <p className="text-gray-600 mb-4">The requested cryptocurrency could not be found.</p>
          <Link to="/coins" className="btn-primary">
            Back to Coins
          </Link>
        </div>
      </div>
    );
  }

  const marketData = coinDetails.market_data;
  const isPositive = marketData?.price_change_percentage_24h > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        to="/coins" 
        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Coins</span>
      </Link>

      {/* Coin Header */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <img 
              src={coinDetails.image?.large} 
              alt={coinDetails.name}
              className="w-16 h-16 rounded-full"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/64x64?text=' + coinDetails.symbol.charAt(0);
              }}
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{coinDetails.name}</h1>
              <p className="text-xl text-gray-600 uppercase">{coinDetails.symbol}</p>
              <p className="text-sm text-gray-500">Rank #{marketData?.market_cap_rank || 'N/A'}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(marketData?.current_price?.usd)}
            </p>
            <div className={`flex items-center space-x-1 ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">
                {marketData?.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Market Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Market Cap</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${formatNumber(marketData?.market_cap?.usd)}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Volume (24h)</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            ${formatNumber(marketData?.total_volume?.usd)}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Circulating Supply</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(marketData?.circulating_supply)} {coinDetails.symbol}
          </p>
        </div>

        <div className="card">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Genesis Date</h3>
          </div>
          <p className="text-lg font-medium text-gray-900">
            {formatDate(coinDetails.genesis_date)}
          </p>
        </div>
      </div>

      {/* Price Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Price Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">All Time High</span>
              <span className="font-medium">${formatNumber(marketData?.ath?.usd)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ATH Date</span>
              <span className="font-medium">{formatDate(marketData?.ath_date?.usd)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ATH Change</span>
              <span className="font-medium">{marketData?.ath_change_percentage?.usd?.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">All Time Low</span>
              <span className="font-medium">${formatNumber(marketData?.atl?.usd)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ATL Date</span>
              <span className="font-medium">{formatDate(marketData?.atl_date?.usd)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ATL Change</span>
              <span className="font-medium">{marketData?.atl_change_percentage?.usd?.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Supply Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Supply</span>
              <span className="font-medium">{formatNumber(marketData?.total_supply)} {coinDetails.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max Supply</span>
              <span className="font-medium">
                {marketData?.max_supply ? `${formatNumber(marketData.max_supply)} ${coinDetails.symbol}` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Circulating Supply</span>
              <span className="font-medium">{formatNumber(marketData?.circulating_supply)} {coinDetails.symbol}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {coinDetails.description?.en && (
        <div className="card mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About {coinDetails.name}</h3>
          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: coinDetails.description.en.replace(/\n/g, '<br>') 
            }}
          />
        </div>
      )}

      {/* Links */}
      {coinDetails.links && (
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coinDetails.links.homepage?.[0] && (
              <a
                href={coinDetails.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Official Website</span>
              </a>
            )}
            {coinDetails.links.blockchain_site?.[0] && (
              <a
                href={coinDetails.links.blockchain_site[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Blockchain Explorer</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinDetail; 