import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CoinList from './pages/CoinList';
import CoinDetail from './pages/CoinDetail';
import { CryptoProvider } from './context/CryptoContext';

function App() {
  return (
    <CryptoProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coins" element={<CoinList />} />
              <Route path="/coin/:id" element={<CoinDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CryptoProvider>
  );
}

export default App; 