# Lee's Barometer & Calibration Helper - Installation Guide

## Quick Start

### Step 1: Install Node.js

If you don't have Node.js installed:

**Windows:**
1. Download from https://nodejs.org/ (LTS version recommended)
2. Run the installer
3. Follow the installation wizard
4. Restart your computer

**macOS:**
```bash
# Using Homebrew
brew install node
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

Verify installation:
```bash
node --version
npm --version
```

### Step 2: Install Application Dependencies

Open terminal/command prompt in the `lees-barometer-app` folder:

```bash
cd lees-barometer-app
npm install
```

This will download and install all required packages. It may take 2-5 minutes.

### Step 3: Run the Application

**Development Mode** (for testing):
```bash
npm run electron:dev
```

The application will start automatically. You should see:
1. Terminal showing "webpack compiled successfully"
2. The application window opening

## Building Standalone Executable

To create a standalone application that doesn't require terminal:

**Windows:**
```bash
npm run electron:build:win
```

Creates: `dist/Lee's Barometer Helper Setup.exe`

**macOS:**
```bash
npm run electron:build:mac
```

Creates: `dist/Lee's Barometer Helper.dmg`

**Linux:**
```bash
npm run electron:build:linux
```

Creates: `dist/Lee's Barometer Helper.AppImage`

### Running the Built Application

After building:
- **Windows**: Double-click the `.exe` in the `dist` folder
- **macOS**: Open the `.dmg` and drag to Applications
- **Linux**: Make the `.AppImage` executable and run it

## Troubleshooting

### "npm: command not found"

Node.js is not installed or not in PATH. Reinstall Node.js and restart terminal.

### "Cannot find module 'electron'"

Dependencies not installed. Run:
```bash
npm install
```

### Application window is blank

1. Check terminal for errors
2. Try clearing cache:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails on Windows

You may need Windows Build Tools:
```bash
npm install --global windows-build-tools
```

### Sounds not playing

This is normal on first load. Click any button to activate audio context.

### Port 3000 already in use

Another application is using port 3000. Either:
1. Close other React apps
2. Or kill the process:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill
```

## System Requirements

- **OS**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 500MB for development, 200MB for built app
- **Node.js**: v16.0.0 or higher

## Additional Notes

### First-Time Setup Checklist

- [ ] Node.js installed
- [ ] Terminal opened in correct directory
- [ ] `npm install` completed successfully
- [ ] Application starts with `npm run electron:dev`

### For Developers

**File Structure:**
```
lees-barometer-app/
├── public/              # Static files
│   ├── electron.js     # Electron main process
│   └── assets/         # Icons and resources
├── src/                # React source code
│   ├── components/     # React components
│   ├── utils/          # Calculations & sound
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
├── package.json        # Dependencies & scripts
└── README.md           # Documentation
```

**Hot Reload:**
In development mode, changes to React components auto-reload. Changes to `electron.js` require restarting the app.

**Debugging:**
- React DevTools: Press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Opt+I` (macOS)
- Console logs appear in the DevTools console

### Custom Sound Files (Optional)

To replace synthetic sounds with custom audio:

1. Place audio files in `public/assets/sounds/`:
   - `boat_horn.wav`
   - `water_click.wav`

2. The app will automatically try to load them. If files are missing, it falls back to synthetic sounds.

## Support

For issues or questions:
1. Check this guide first
2. Review error messages in terminal
3. Ensure Node.js and npm are up to date
4. Try clean reinstall: delete `node_modules`, run `npm install`

---

⚓ Happy Calibrating!

