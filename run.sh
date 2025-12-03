#!/bin/bash

echo "========================================"
echo "Lee's Barometer & Calibration Helper"
echo "Starting Application..."
echo "========================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "ERROR: Dependencies not installed!"
    echo "Please run ./install.sh first."
    exit 1
fi

echo "Starting development server..."
echo "The application will open automatically."
echo ""
echo "Press Ctrl+C to stop the application."
echo ""

npm run electron:dev

