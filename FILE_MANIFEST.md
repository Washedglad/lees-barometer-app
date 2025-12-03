# Complete File Manifest - Lee's Barometer & Calibration Helper

## 📋 All Files Included in This Project

### 📖 Documentation (Read These First!)
| File | Purpose | When to Read |
|------|---------|--------------|
| `START_HERE.txt` | Quick visual setup guide | **START HERE** - First time users |
| `QUICKSTART.md` | Fast installation steps | Need to install quickly |
| `INSTALLATION_GUIDE.md` | Detailed setup instructions | Having installation problems |
| `USAGE_GUIDE.md` | Feature tutorials & examples | Learning how to use features |
| `README.md` | Complete documentation | General reference |
| `PROJECT_SUMMARY.md` | Technical architecture | Developers/technical users |
| `COMPLETE_PROJECT_OVERVIEW.md` | Comprehensive overview | Understanding the full project |
| `FILE_MANIFEST.md` | This file - complete file list | Finding specific files |

### 🚀 Installation & Run Scripts
| File | Platform | Purpose |
|------|----------|---------|
| `install.bat` | Windows | Install dependencies (double-click) |
| `install.sh` | Mac/Linux | Install dependencies (run in terminal) |
| `run.bat` | Windows | Start application (double-click) |
| `run.sh` | Mac/Linux | Start application (run in terminal) |
| `build.bat` | Windows | Build standalone installer |
| `build.sh` | Mac/Linux | Build standalone installer |

### ⚙️ Configuration Files
| File | Purpose | Edit? |
|------|---------|-------|
| `package.json` | Dependencies & npm scripts | Only if adding packages |
| `package-lock-info.txt` | Info about package-lock.json | Read only |
| `.gitignore` | Git ignore rules | Optional customization |

### 📂 public/ - Static Assets
| File | Purpose |
|------|---------|
| `public/index.html` | HTML template for React |
| `public/electron.js` | Electron main process (desktop app) |
| `public/assets/icon.svg` | Application icon (vector) |
| `public/assets/ICON_INSTRUCTIONS.txt` | How to create PNG icon |

### 📂 src/ - Application Source Code

#### Root Level
| File | Purpose |
|------|---------|
| `src/index.js` | React entry point |
| `src/index.css` | Global CSS styles |
| `src/App.js` | Main application component |
| `src/App.css` | Main application styling |

#### src/components/ - React Components
| File | Feature |
|------|---------|
| `Sidebar.js` | Navigation sidebar |
| `Sidebar.css` | Sidebar styling |
| `BarometerConverter.js` | Pressure conversion tool |
| `DOCorrection.js` | Dissolved oxygen calculator |
| `PhCalibration.js` | pH calibration helper |
| `DataLogger.js` | Log viewer & CSV export |
| `BarometerConverter.css` | Shared component styles |

#### src/utils/ - Utility Functions
| File | Purpose |
|------|---------|
| `calculations.js` | Scientific calculation functions |
| `soundEffects.js` | Audio generation & playback |

### 📁 Folders Created During Install/Build
| Folder | When Created | Purpose |
|--------|--------------|---------|
| `node_modules/` | After `npm install` | All dependency packages |
| `build/` | After `npm run build` | Production React build |
| `dist/` | After build scripts | Standalone installers |

---

## 🎯 File Count Summary

**Documentation:** 8 files  
**Scripts:** 6 files  
**Configuration:** 3 files  
**Public Assets:** 4 files  
**Source Code:** 11 files  

**Total Files:** 32 files  
**Total Lines of Code:** ~2,500 lines

---

## 🔍 Quick File Finder

**Need to...**

| Goal | File to Open |
|------|--------------|
| Get started quickly | `START_HERE.txt` |
| Install the app | `install.bat` (Win) or `install.sh` (Mac/Linux) |
| Run the app | `run.bat` (Win) or `run.sh` (Mac/Linux) |
| Learn how to use features | `USAGE_GUIDE.md` |
| Troubleshoot installation | `INSTALLATION_GUIDE.md` |
| Understand architecture | `PROJECT_SUMMARY.md` |
| See all features | `COMPLETE_PROJECT_OVERVIEW.md` |
| Change colors/theme | `src/App.css`, `src/components/Sidebar.css` |
| Modify calculations | `src/utils/calculations.js` |
| Customize sounds | `src/utils/soundEffects.js` |
| Add new features | Create new file in `src/components/` |
| Add dependencies | Edit `package.json` then run `npm install` |

---

## 📝 File Dependencies

```
App.js
├── Sidebar.js
│   └── Sidebar.css
├── BarometerConverter.js
│   ├── BarometerConverter.css
│   ├── calculations.js (convertPressure)
│   └── soundEffects.js (playBoatHorn)
├── DOCorrection.js
│   ├── BarometerConverter.css
│   ├── calculations.js (calculateDO)
│   └── soundEffects.js (playBoatHorn)
├── PhCalibration.js
│   ├── BarometerConverter.css
│   ├── calculations.js (calculatePhSlope, getExpectedMv)
│   └── soundEffects.js (playBoatHorn)
└── DataLogger.js
    ├── BarometerConverter.css
    └── soundEffects.js (playBoatHorn)
```

---

## 🎨 File Sizes (Approximate)

**Source Code:**
- `App.js`: ~80 lines
- `App.css`: ~120 lines
- `Sidebar.js`: ~60 lines
- `Sidebar.css`: ~150 lines
- `BarometerConverter.js`: ~100 lines
- `DOCorrection.js`: ~170 lines
- `PhCalibration.js`: ~220 lines
- `DataLogger.js`: ~120 lines
- `BarometerConverter.css`: ~600 lines
- `calculations.js`: ~180 lines
- `soundEffects.js`: ~150 lines

**Documentation:**
- `README.md`: ~250 lines
- `USAGE_GUIDE.md`: ~450 lines
- `INSTALLATION_GUIDE.md`: ~200 lines
- `PROJECT_SUMMARY.md`: ~550 lines
- `COMPLETE_PROJECT_OVERVIEW.md`: ~650 lines

---

## 🔧 How to Modify Specific Features

### Change Theme Colors
**Files to edit:**
1. `src/App.css` - Lines with `#1F4D73` and `#E6F3FF`
2. `src/components/Sidebar.css` - Gradient colors
3. `src/components/BarometerConverter.css` - Button and card colors

### Modify Calculations
**Files to edit:**
1. `src/utils/calculations.js`
   - `convertPressure()` - Pressure conversions
   - `calculateDO()` - DO saturation
   - `calculatePhSlope()` - pH calibration
   - `getExpectedMv()` - Expected mV values

### Customize Sounds
**Files to edit:**
1. `src/utils/soundEffects.js`
   - `generateBoatHorn()` - Adjust frequency/duration
   - `generateWaterClick()` - Modify click sound
   - Or uncomment `loadAudioFiles()` to use custom WAV files

### Add New Features
**Steps:**
1. Create new component in `src/components/YourFeature.js`
2. Import in `src/App.js`
3. Add to sidebar in `src/components/Sidebar.js`
4. Add route in `App.js` state management

---

## 📦 Package.json Scripts Reference

Run these commands in terminal:

| Command | Action |
|---------|--------|
| `npm install` | Install all dependencies |
| `npm start` | Start React dev server only |
| `npm run electron:dev` | Start full Electron app (recommended) |
| `npm run build` | Build production React app |
| `npm run electron:build` | Build for current platform |
| `npm run electron:build:win` | Build Windows installer |
| `npm run electron:build:mac` | Build macOS DMG |
| `npm run electron:build:linux` | Build Linux AppImage |

---

## ✅ Verification Checklist

Use this to verify your installation:

- [ ] All 32 files present
- [ ] `package.json` exists
- [ ] `src/` folder contains 11 files
- [ ] `public/` folder contains 4 files
- [ ] Documentation files readable
- [ ] Scripts have correct file extensions (.bat for Windows, .sh for Unix)

After `npm install`:
- [ ] `node_modules/` folder created
- [ ] `package-lock.json` generated
- [ ] No error messages in terminal

After running app:
- [ ] Application window opens
- [ ] All 4 menu items work
- [ ] Sounds play when clicking buttons
- [ ] Calculations work correctly
- [ ] Theme colors visible

---

## 🎓 File Reading Order for Learning

**Complete Beginner:**
1. `START_HERE.txt` - Visual quick start
2. `QUICKSTART.md` - Get it running
3. `USAGE_GUIDE.md` - Learn the features

**Experienced Developer:**
1. `PROJECT_SUMMARY.md` - Architecture overview
2. `src/App.js` - See main structure
3. `src/utils/calculations.js` - Understand logic
4. `COMPLETE_PROJECT_OVERVIEW.md` - Full details

**Designer/UI Developer:**
1. `COMPLETE_PROJECT_OVERVIEW.md` - See theme details
2. `src/App.css` - Main styling
3. `src/components/Sidebar.css` - Navigation design
4. `src/components/BarometerConverter.css` - Component styles

**Scientist/End User:**
1. `START_HERE.txt` - Installation
2. `USAGE_GUIDE.md` - How to use
3. `README.md` - Reference when needed

---

## 🗑️ What You Can Safely Delete

**If you only want to run the app:**
- Keep: Everything except documentation (unless you need help)
- Optional: Can delete `PROJECT_SUMMARY.md`, `COMPLETE_PROJECT_OVERVIEW.md`
- Do NOT delete: `package.json`, `src/`, `public/`, scripts

**If you're customizing:**
- Keep: Everything
- You'll need documentation for reference

**Never delete:**
- `package.json` - Required for dependencies
- `src/` folder - Contains all application code
- `public/` folder - Contains assets and Electron config
- `node_modules/` - After npm install (needed to run)

---

## 📚 Additional Resources

**Not included but useful:**
- Node.js: https://nodejs.org/
- React Docs: https://react.dev/
- Electron Docs: https://www.electronjs.org/
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

⚓ **All files accounted for and ready to use!**

**Last Updated:** December 3, 2025  
**File Manifest Version:** 1.0

