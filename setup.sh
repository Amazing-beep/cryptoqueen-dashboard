#!/bin/bash

echo "👑 CryptoQueen Dashboard Setup"
echo "=============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm is installed: $(npm --version)"
echo ""

# Backend setup
echo "🚀 Setting up Backend..."
cd server

if [ ! -f "package.json" ]; then
    echo "❌ package.json not found in server directory"
    exit 1
fi

echo "📦 Installing backend dependencies..."
npm install

if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit server/.env and add your NewsAPI key"
    echo "   Get your key from: https://newsapi.org/"
else
    echo "✅ .env file already exists"
fi

cd ..

# Frontend setup
echo ""
echo "🎨 Setting up Frontend..."
cd client

if [ ! -f "package.json" ]; then
    echo "❌ package.json not found in client directory"
    exit 1
fi

echo "📦 Installing frontend dependencies..."
npm install

cd ..

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "To start the application:"
echo ""
echo "1. Backend (Terminal 1):"
echo "   cd server"
echo "   npm run dev"
echo ""
echo "2. Frontend (Terminal 2):"
echo "   cd client"
echo "   npm start"
echo ""
echo "3. Open your browser to: http://localhost:3000"
echo ""
echo "📚 For more information, see the README.md file"
echo ""
echo "👑 Built by Nkhomotabo Amazing Mkhonta" 