import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// API base URL - change this for production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Initial state
const initialState = {
  coins: [],
  news: [],
  loading: false,
  error: null,
  selectedCoin: null,
  coinDetails: null
};

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_COINS: 'SET_COINS',
  SET_NEWS: 'SET_NEWS',
  SET_COIN_DETAILS: 'SET_COIN_DETAILS',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const cryptoReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ACTIONS.SET_COINS:
      return { ...state, coins: action.payload, loading: false, error: null };
    case ACTIONS.SET_NEWS:
      return { ...state, news: action.payload, loading: false, error: null };
    case ACTIONS.SET_COIN_DETAILS:
      return { ...state, coinDetails: action.payload, loading: false, error: null };
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Create context
const CryptoContext = createContext();

// Provider component
export const CryptoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cryptoReducer, initialState);

  // API functions
  const fetchCoins = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await axios.get(`${API_BASE_URL}/api/coins`);
      dispatch({ type: ACTIONS.SET_COINS, payload: response.data.data });
    } catch (error) {
      console.error('Error fetching coins:', error);
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: 'Failed to fetch cryptocurrency data. Please try again later.' 
      });
    }
  };

  const fetchCoinDetails = async (coinId) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await axios.get(`${API_BASE_URL}/api/coins/${coinId}`);
      dispatch({ type: ACTIONS.SET_COIN_DETAILS, payload: response.data.data });
    } catch (error) {
      console.error('Error fetching coin details:', error);
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: 'Failed to fetch coin details. Please try again later.' 
      });
    }
  };

  const fetchNews = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await axios.get(`${API_BASE_URL}/api/news`);
      dispatch({ type: ACTIONS.SET_NEWS, payload: response.data.data.articles });
    } catch (error) {
      console.error('Error fetching news:', error);
      dispatch({ 
        type: ACTIONS.SET_ERROR, 
        payload: 'Failed to fetch news. Please try again later.' 
      });
    }
  };

  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  // Load initial data
  useEffect(() => {
    fetchCoins();
    fetchNews();
  }, []);

  const value = {
    ...state,
    fetchCoins,
    fetchCoinDetails,
    fetchNews,
    clearError
  };

  return (
    <CryptoContext.Provider value={value}>
      {children}
    </CryptoContext.Provider>
  );
};

// Custom hook to use the crypto context
export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider');
  }
  return context;
}; 