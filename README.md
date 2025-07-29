# 👑 CryptoQueen Dashboard

A modern, user-friendly cryptocurrency dashboard designed to empower women exploring the world of crypto. Built with real-time data, beautiful UI, and comprehensive features.

**🌐 Live Website:** [https://codedbyamazing.tech/](https://codedbyamazing.tech/)

![CryptoQueen Dashboard](https://img.shields.io/badge/Status-Live%20%26%20Deployed-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-38B2AC)

## 🌟 Features

- **Real-time Cryptocurrency Data** - Live prices, market cap, volume, and price changes
- **Comprehensive Coin Details** - Detailed information for each cryptocurrency
- **Latest Crypto News** - Stay informed with trending cryptocurrency news
- **Search & Filter** - Find cryptocurrencies quickly with advanced search and sorting
- **Responsive Design** - Beautiful UI that works on all devices
- **Women-Focused** - Designed specifically to empower women in crypto
- **Fast & Reliable** - Built with modern technologies and best practices

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Axios** - HTTP client for API calls
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

### Frontend
- **React 18** - UI library with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### APIs
- **CoinGecko API** - Cryptocurrency data (no API key required)
- **NewsAPI.org** - Cryptocurrency news (free tier)

## 📁 Project Structure

```
cryptoqueen-dashboard/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
├── server/                # Node.js backend
│   ├── controllers/       # API controllers
│   ├── routes/           # API routes
│   ├── index.js          # Server entry point
│   ├── package.json      # Backend dependencies
│   └── env.example       # Environment variables template
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables:**
   ```env
   PORT=8080
   NODE_ENV=development
   NEWS_API_KEY=your_newsapi_key_here
   ALLOWED_ORIGINS=http://localhost:3000
   CACHE_DURATION=300000
   ```
6. **Start the server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:8080`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Backend Deployment (Railway)

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Connect your GitHub repository**

3. **Deploy automatically** - Railway will auto-detect your Node.js app

4. **Configure environment variables:**
   ```
   NODE_ENV=production
   NEWS_API_KEY=your_actual_newsapi_key_here
   ALLOWED_ORIGINS=https://codedbyamazing.tech,https://your-vercel-url.vercel.app
   CACHE_DURATION=300000
   ```

5. **Get your Railway URL** (e.g., `https://cryptoqueen-dashboard-production.up.railway.app`)

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Import your GitHub repository**

3. **Configure build settings:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

4. **Add environment variable:**
   ```
   REACT_APP_API_URL=https://your-railway-backend-url.up.railway.app
   ```

5. **Deploy**

### Custom Domain Setup

1. **In Vercel dashboard:**
   - Go to Settings → Domains
   - Add `codedbyamazing.tech`

2. **Configure DNS at your domain registrar:**
   - Add CNAME record pointing to your Vercel project

3. **Wait for DNS propagation** (usually 5-30 minutes)

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=8080                    # Server port
NODE_ENV=production          # Environment (development/production)
NEWS_API_KEY=your_key_here   # NewsAPI.org API key
ALLOWED_ORIGINS=domain1,domain2  # Comma-separated allowed origins
CACHE_DURATION=300000        # Cache duration in milliseconds
```

#### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.up.railway.app  # Backend API URL
```

### API Endpoints

#### Backend API
- `GET /api/coins` - Get top 100 cryptocurrencies
- `GET /api/coins/:id` - Get detailed coin information
- `GET /api/news` - Get trending crypto news
- `GET /health` - Health check endpoint

#### Frontend Routes
- `/` - Home page with overview
- `/coins` - Cryptocurrency list with search/filter
- `/coin/:id` - Detailed coin information

## 🎨 Customization

### Styling
- Modify `client/tailwind.config.js` for theme customization
- Update `client/src/index.css` for custom styles
- Use Tailwind CSS classes for consistent design

### Branding
- Update logo and colors in components
- Modify footer credit information
- Change meta tags in `client/public/index.html`

### Features
- Add new API endpoints in `server/routes/`
- Create new components in `client/src/components/`
- Add new pages in `client/src/pages/`

## 🚀 Performance Optimization

### Backend
- **Caching:** 5-minute cache for API responses
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **Security:** Helmet.js for security headers
- **Error Handling:** Comprehensive error responses

### Frontend
- **Code Splitting:** React Router for lazy loading
- **Optimized Images:** Responsive image handling
- **Caching:** Browser caching for static assets
- **Bundle Optimization:** React production build

## 🔒 Security

- **CORS Protection:** Configured allowed origins
- **Rate Limiting:** Prevents API abuse
- **Security Headers:** Helmet.js implementation
- **Input Validation:** Sanitized API inputs
- **HTTPS Only:** Production deployment requirement

## 📊 API Attribution

This project uses the following APIs:

- **CoinGecko API** - Cryptocurrency data
  - Website: [coingecko.com](https://coingecko.com)
  - Documentation: [coingecko.com/api/documentation](https://coingecko.com/api/documentation)
  - No API key required for basic usage

- **NewsAPI.org** - Cryptocurrency news
  - Website: [newsapi.org](https://newsapi.org)
  - Documentation: [newsapi.org/docs](https://newsapi.org/docs)
  - Free tier available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Nkhomotabo Amazing Mkhonta**
- Website: [codedbyamazing.tech](https://codedbyamazing.tech)
- GitHub: [@your-github-username](https://github.com/your-github-username)


## 🙏 Acknowledgments

- **CoinGecko** for providing comprehensive cryptocurrency data
- **NewsAPI.org** for cryptocurrency news articles
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/cryptoqueen-dashboard/issues) page
2. Create a new issue with detailed information


---

**Made with ❤️ by Nkhomotabo Amazing Mkhonta**

*Empowering women in cryptocurrency, one dashboard at a time.*

---

## 🌐 Live Demo

**Visit the live application:** [https://codedbyamazing.tech/](https://codedbyamazing.tech/)

Experience the CryptoQueen Dashboard in action with real-time cryptocurrency data and news!