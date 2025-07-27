import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown, TrendingUp, Newspaper, Home } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Crown className="w-8 h-8 text-yellow-300" />
            <div>
              <h1 className="text-xl font-bold">CryptoQueen</h1>
              <p className="text-xs text-primary-100">Empowering Women in Crypto</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-primary-100 hover:text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/coins"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/coins') 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-primary-100 hover:text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Coins</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white hover:opacity-80 transition-opacity">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 