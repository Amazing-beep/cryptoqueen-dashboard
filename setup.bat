@echo off
echo 👑 CryptoQueen Dashboard Setup
echo ==============================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm is installed
npm --version
echo.

REM Backend setup
echo 🚀 Setting up Backend...
cd server

if not exist "package.json" (
    echo ❌ package.json not found in server directory
    pause
    exit /b 1
)

echo 📦 Installing backend dependencies...
npm install

if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy env.example .env
    echo ⚠️  Please edit server\.env and add your NewsAPI key
    echo    Get your key from: https://newsapi.org/
) else (
    echo ✅ .env file already exists
)

cd ..

REM Frontend setup
echo.
echo 🎨 Setting up Frontend...
cd client

if not exist "package.json" (
    echo ❌ package.json not found in client directory
    pause
    exit /b 1
)

echo 📦 Installing frontend dependencies...
npm install

cd ..

echo.
echo 🎉 Setup Complete!
echo ==================
echo.
echo To start the application:
echo.
echo 1. Backend (Terminal 1):
echo    cd server
echo    npm run dev
echo.
echo 2. Frontend (Terminal 2):
echo    cd client
echo    npm start
echo.
echo 3. Open your browser to: http://localhost:3000
echo.
echo 📚 For more information, see the README.md file
echo.
echo 👑 Built by Nkhomotabo Amazing Mkhonta
pause 