#!/bin/bash

echo "========================================"
echo "Lee's Barometer & Calibration Helper"
echo "Building Application"
echo "========================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "ERROR: Dependencies not installed!"
    echo "Please run ./install.sh first."
    exit 1
fi

# Detect platform
if [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORM="mac"
    BUILD_CMD="electron:build:mac"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PLATFORM="linux"
    BUILD_CMD="electron:build:linux"
else
    echo "ERROR: Unsupported platform: $OSTYPE"
    exit 1
fi

echo "Building React application..."
echo ""
npm run build

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Build failed!"
    exit 1
fi

echo ""
echo "Creating $PLATFORM installer..."
echo "This may take a few minutes..."
echo ""
npm run $BUILD_CMD

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Electron build failed!"
    exit 1
fi

echo ""
echo "========================================"
echo "Build Complete!"
echo "========================================"
echo ""
echo "Your application is ready in the dist/ folder:"
ls -lh dist/ 2>/dev/null | grep -E '\.(dmg|AppImage)$' | awk '{print $9}'
echo ""

