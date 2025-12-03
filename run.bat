@echo off
echo ========================================
echo Lee's Barometer ^& Calibration Helper
echo Starting Application...
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo ERROR: Dependencies not installed!
    echo Please run install.bat first.
    echo.
    pause
    exit /b 1
)

echo Starting development server...
echo The application will open automatically.
echo.
echo Press Ctrl+C to stop the application.
echo.

call npm run electron:dev

