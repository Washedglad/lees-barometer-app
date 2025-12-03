@echo off
echo ========================================
echo Lee's Barometer ^& Calibration Helper
echo Building Windows Executable
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

echo Building React application...
echo.
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo Creating Windows installer...
echo This may take a few minutes...
echo.
call npm run electron:build:win

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Electron build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo Your application is ready in the dist\ folder:
dir dist\*.exe /b 2>nul
echo.
echo Double-click the installer to install the application.
echo.
pause

