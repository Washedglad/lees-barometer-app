@echo off
echo ========================================
echo Lee's Barometer ^& Calibration Helper
echo Installation Script for Windows
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js found: 
node --version
echo npm version: 
npm --version
echo.

echo Installing application dependencies...
echo This may take 2-5 minutes...
echo.

call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Installation failed!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To run the application:
echo   npm run electron:dev
echo.
echo To build a standalone executable:
echo   npm run electron:build:win
echo.
pause

