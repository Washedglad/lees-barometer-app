#!/bin/bash

echo "========================================"
echo "Lee's Barometer & Calibration Helper"
echo "Installation Script for macOS/Linux"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js:"
    echo "  macOS: brew install node"
    echo "  Ubuntu/Debian: sudo apt install nodejs npm"
    echo "  Or download from https://nodejs.org/"
    exit 1
fi

echo "Node.js found: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

echo "Installing application dependencies..."
echo "This may take 2-5 minutes..."
echo ""

npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Installation failed!"
    echo "Please check your internet connection and try again."
    exit 1
fi

echo ""
echo "========================================"
echo "Installation Complete!"
echo "========================================"
echo ""
echo "To run the application:"
echo "  npm run electron:dev"
echo ""
echo "To build a standalone executable:"
echo "  macOS: npm run electron:build:mac"
echo "  Linux: npm run electron:build:linux"
echo ""

