const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const coinRoutes = require('./routes/coins');
const newsRoutes = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 8080;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CryptoQueen Dashboard API is running',
    timestamp: new Date().toISOString(),
    developer: 'Nkhomotabo Amazing Mkhonta'
  });
});

// API routes
app.use('/api/coins', coinRoutes);
app.use('/api/news', newsRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CryptoQueen Dashboard API',
    developer: 'Nkhomotabo Amazing Mkhonta',
    endpoints: {
      coins: '/api/coins',
      coinDetails: '/api/coins/:id',
      news: '/api/news'
    },
    documentation: 'Built to empower women exploring cryptocurrency'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: ['/api/coins', '/api/coins/:id', '/api/news']
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on our end. Please try again later.',
    developer: 'Nkhomotabo Amazing Mkhonta'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CryptoQueen Dashboard API running on port ${PORT}`);
  console.log(`👑 Built by Nkhomotabo Amazing Mkhonta`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 