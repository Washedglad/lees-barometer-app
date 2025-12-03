# Lee's Barometer & Calibration Helper

A beautiful nautical-themed desktop application for marine and scientific instrument calibration.

![Lee's Barometer](public/assets/icon.svg)

## Features

- **Barometric Pressure Converter**: Convert between mmHg, inHg, hPa (mbar), and PSI
- **Dissolved Oxygen (DO) Correction Tool**: Calculate expected DO saturation with temperature, salinity, and pressure corrections
- **pH Calibration Helper**: Step-by-step pH probe calibration with slope calculation
- **Calibration Data Logger**: Save and export calibration data to CSV

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

### Setup

1. Clone or extract the application
2. Open terminal in the project directory
3. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run electron:dev
```

This will start the React development server and launch the Electron application.

### Building for Production

**Windows:**
```bash
npm run electron:build:win
```

**macOS:**
```bash
npm run electron:build:mac
```

**Linux:**
```bash
npm run electron:build:linux
```

Built applications will be in the `dist` folder.

## Usage

### Barometric Pressure Converter

1. Enter a pressure value
2. Select the input unit (mmHg, inHg, hPa, or PSI)
3. Click "Convert Pressure" to see all equivalent values

### Dissolved Oxygen Tool

1. Enter water temperature in °C
2. Enter salinity (0 for fresh water)
3. Enter barometric pressure
4. Optionally enter your probe reading for comparison
5. Click "Calculate DO Saturation"

### pH Calibration

1. Review the calibration procedure
2. Enter the current temperature
3. Record mV readings from pH buffers (7.0 is required, 4.0 or 10.0 for slope)
4. Click "Calculate Slope & Expected Values"
5. Verify your slope percentage is within acceptable range (85-105%)

### Data Logger

- All calculations are automatically logged with timestamps
- View historical calibration data
- Export to CSV for record-keeping

## Technical Details

### Built With

- **Electron**: Desktop application framework
- **React**: UI framework
- **Web Audio API**: Synthesized sound effects
- **HTML5/CSS3**: Modern, responsive design

### Nautical Theme

- Color Palette:
  - Light Blue: `#E6F3FF`
  - Deep Navy: `#1F4D73`
  - Accent Blue: `#2A6A9F`
- Custom boat horn and water ripple sound effects
- Animated wave background
- Compass rose watermark

### Scientific Calculations

- **Pressure Conversions**: Standard conversion factors
- **DO Saturation**: Benson & Krause equations with salinity and pressure corrections
- **pH Slope**: Nernst equation for temperature-compensated calibration

## Sound Effects

The application uses synthesized sound effects:
- **Boat Horn**: Plays on major actions (Convert, Calculate, Save)
- **Water Click**: Plays on menu navigation and minor interactions

Sounds are generated using the Web Audio API for a lightweight, embedded solution.

## Troubleshooting

**Application won't start:**
- Ensure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be v16+)

**Build fails:**
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`

**Sounds not playing:**
- Some browsers/systems require user interaction before audio can play
- Check browser console for audio context errors

## License

Created for Lee's Barometer & Calibration use.

## Version

Ship Log – v1.0

---

⚓ Built with precision for marine scientific instrumentation

