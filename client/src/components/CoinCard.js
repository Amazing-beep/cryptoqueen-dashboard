import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const CoinCard = ({ coin }) => {
  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };

  const formatVolume = (volume) => {
    if (volume >= 1e12) {
      return `$${(volume / 1e12).toFixed(2)}T`;
    } else if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else {
      return `$${volume.toLocaleString()}`;
    }
  };

  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <Link to={`/coin/${coin.id}`} className="block">
      <div className="card card-hover h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={coin.image} 
              alt={coin.name}
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/32x32?text=' + coin.symbol.charAt(0);
              }}
            />
            <div>
              <h3 className="font-semibold text-gray-900">{coin.name}</h3>
              <p className="text-sm text-gray-500 uppercase">{coin.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              #{coin.market_cap_rank}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-lg font-bold text-gray-900">{formatPrice(coin.current_price)}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">24h Change</p>
              <div className={`flex items-center space-x-1 ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-medium">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Cap</p>
              <p className="text-sm font-medium text-gray-900">{formatMarketCap(coin.market_cap)}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Volume (24h)</p>
            <p className="text-sm font-medium text-gray-900">{formatVolume(coin.total_volume)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard; 