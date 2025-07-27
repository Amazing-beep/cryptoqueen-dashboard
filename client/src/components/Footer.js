import React from 'react';
import { Crown, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Crown className="w-6 h-6 text-yellow-300" />
            <div>
              <h3 className="font-semibold">CryptoQueen Dashboard</h3>
              <p className="text-sm text-gray-400">Empowering Women in Cryptocurrency</p>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Built with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-gray-400">by</span>
            <a 
              href="https://codedbyamazing.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
            >
              Nkhomotabo Amazing Mkhonta
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Nkhomotabo Amazing Mkhonta. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Powered by CoinGecko API & NewsAPI.org
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 