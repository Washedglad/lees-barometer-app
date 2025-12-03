# Quick Start Guide

## For Windows Users

### Step 1: Install Node.js
Download and install from: https://nodejs.org/
(Choose the LTS version)

### Step 2: Install Dependencies
Double-click: `install.bat`

Wait for installation to complete (2-5 minutes)

### Step 3: Run the Application
Double-click: `run.bat`

The application will start automatically!

---

## For macOS/Linux Users

### Step 1: Install Node.js

**macOS (using Homebrew):**
```bash
brew install node
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Other Linux:**
Download from: https://nodejs.org/

### Step 2: Install Dependencies
```bash
chmod +x install.sh
./install.sh
```

### Step 3: Run the Application
```bash
chmod +x run.sh
./run.sh
```

---

## Manual Method (All Platforms)

If the scripts don't work:

```bash
# Install dependencies
npm install

# Run application
npm run electron:dev
```

---

## Building Standalone Executable

**Windows:**
```bash
npm run electron:build:win
```
Find the installer in `dist/` folder

**macOS:**
```bash
npm run electron:build:mac
```
Find the .dmg in `dist/` folder

**Linux:**
```bash
npm run electron:build:linux
```
Find the .AppImage in `dist/` folder

---

## Troubleshooting

**"npm: command not found"**
- Node.js is not installed. Install it from nodejs.org

**"Cannot find module 'react-scripts'"**
- Dependencies not installed. Run `npm install`

**Application window is blank**
- Wait a few seconds for it to load
- Check terminal for error messages
- Try clearing cache: delete `node_modules/` and run `npm install` again

**Port 3000 already in use**
- Another app is using that port
- Close other React/Node applications
- Or restart your computer

---

## Need Help?

See the full documentation:
- `INSTALLATION_GUIDE.md` - Detailed installation instructions
- `USAGE_GUIDE.md` - How to use each feature
- `README.md` - Complete documentation

---

⚓ That's it! Enjoy using Lee's Barometer & Calibration Helper!

