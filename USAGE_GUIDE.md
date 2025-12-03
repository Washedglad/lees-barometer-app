# Lee's Barometer & Calibration Helper - Usage Guide

## Overview

Lee's Barometer & Calibration Helper is a scientific tool designed for marine and field technicians who work with water quality instruments. It provides accurate conversions and calibration assistance for barometers, dissolved oxygen probes, and pH meters.

## Interface Overview

### Main Layout

The application has a nautical blue sidebar on the left with four main sections:
1. **Barometer** - Pressure conversions
2. **Dissolved O₂** - DO saturation calculations
3. **pH Calibration** - pH probe calibration helper
4. **Data Logger** - View and export saved data

### Sound Effects

- **Boat Horn** 📯: Plays when you press major action buttons (Convert, Calculate, Save)
- **Water Ripple** 💧: Plays when navigating between sections

## Feature Guides

### 1. Barometric Pressure Converter

**Purpose:** Convert barometric pressure between different units commonly used in field work.

**How to Use:**
1. Enter pressure value in the input field
2. Select your input unit from dropdown:
   - **mmHg** (millimeters of mercury/Torr) - Standard laboratory unit
   - **inHg** (inches of mercury) - Common in U.S. weather
   - **hPa** (hectopascals/millibars) - Meteorological standard
   - **PSI** (pounds per square inch) - Engineering applications

3. Click **"Convert Pressure"**
4. All equivalent values display instantly

**Example:**
- Input: `760 mmHg`
- Output:
  - 760.00 mmHg (Torr)
  - 29.921 inHg
  - 1013.25 hPa
  - 14.696 PSI

**When to Use:**
- Recording barometric pressure for DO corrections
- Converting pressure readings from different instruments
- Standardizing field data

---

### 2. Dissolved Oxygen (DO) Correction Tool

**Purpose:** Calculate expected DO saturation based on environmental conditions to verify probe calibration.

**How to Use:**

**Inputs:**
1. **Temperature (°C)**: Current water temperature
2. **Salinity (ppt)**: 
   - Enter `0` for fresh water
   - Enter actual salinity for brackish/marine water
3. **Barometric Pressure**: Current atmospheric pressure
   - Choose unit: mmHg or hPa
4. **Probe Reading (optional)**: Your actual DO probe reading for comparison

**Click "Calculate DO Saturation"**

**Outputs:**
- **Expected DO**: What 100% saturated water should read (mg/L)
- **Percentage Saturation**: Current saturation level
- **Comparison Table** (if probe reading entered):
  - Expected vs. actual readings
  - Difference in mg/L and percentage

**Example Scenario:**
You're calibrating a DO probe in water-saturated air:
- Temperature: 20°C
- Salinity: 0 ppt (fresh water)
- Pressure: 760 mmHg
- Expected DO: ~9.09 mg/L

If your probe reads 9.00 mg/L, it's within acceptable range.

**Scientific Basis:**
Uses the Benson & Krause equation with corrections for:
- Temperature (Kelvin conversion)
- Salinity (exponential correction factor)
- Barometric pressure (atmospheric correction)

**When to Use:**
- Field calibration of DO probes
- Verifying probe accuracy
- Troubleshooting unexpected readings
- Recording environmental conditions for data quality

---

### 3. pH Calibration Helper

**Purpose:** Guide proper pH probe calibration and calculate electrode slope.

**Calibration Procedure:**

The app displays a step-by-step procedure:
1. ✓ Warm up probe (5-10 minutes)
2. ✓ Rinse with distilled water
3. ✓ Start with pH 7.0 buffer
4. ✓ Wait for stable reading
5. ✓ Record millivolt (mV) value
6. ✓ Calibrate with pH 4.0 OR pH 10.0 buffer
7. ✓ Check slope percentage

**How to Use:**

**Inputs:**
1. **Temperature (°C)**: Buffer solution temperature
2. **pH 7.0 Buffer (mV)**: Required - your meter's mV reading in pH 7 buffer
3. **pH 4.0 Buffer (mV)**: Optional - for acidic range calibration
4. **pH 10.0 Buffer (mV)**: Optional - for alkaline range calibration

**Click "Calculate Slope & Expected Values"**

**Outputs:**

**Expected mV Values Table:**
Shows theoretical mV readings at your temperature vs. your actual readings. Small differences (<10 mV) are normal.

**Slope Calculation:**
- **Percentage**: Electrode response as percentage of theoretical
- **Status**:
  - ✓ **Good** (95-105%): Electrode working perfectly
  - ⚠ **Acceptable** (85-95% or 105-115%): Marginal, consider cleaning
  - ✗ **Poor** (<85% or >115%): Replace electrode

**Example:**
At 25°C:
- pH 7.0: Expected ~0 mV
- pH 4.0: Expected ~177 mV
- pH 10.0: Expected ~-177 mV

If you measure pH 7 = 2 mV and pH 4 = 180 mV:
- Slope = 98.3% → **Good**

**Important Reminders:**
- ⚠️ Always calibrate at sample temperature when possible
- ⚠️ Replace buffer solutions regularly
- ⚠️ Never store probe in distilled water (use storage solution)
- ⚠️ Check buffer expiration dates

**Scientific Basis:**
Uses the Nernst equation:
```
E = E₀ - (2.303RT/F) × pH
```
Where the slope factor (2.303RT/F) ≈ 59.16 mV/pH at 25°C

**When to Use:**
- Before field sampling campaigns
- When pH readings seem incorrect
- Monthly quality control checks
- After replacing electrodes
- When troubleshooting pH meters

---

### 4. Calibration Data Logger

**Purpose:** Track calibration history and export data for records.

**How to Use:**

**Viewing Logs:**
- All calculations are automatically saved with timestamps
- Each entry shows:
  - Calculation type
  - Input parameters
  - Results
  - Date and time

**Exporting Data:**
1. Click **"Export to CSV"** button
2. File automatically downloads as:
   `lees-barometer-log-YYYY-MM-DD.csv`
3. Open in Excel, Google Sheets, or any CSV reader

**CSV Format:**
```
Timestamp, Type, Input, Results
"2025-12-03 14:30:00", "pH Calibration", "...", "..."
```

**When to Use:**
- Maintaining quality control records
- Creating calibration certificates
- Tracking instrument performance over time
- Regulatory compliance documentation

---

## Best Practices

### General Tips

1. **Temperature Matters**: Always record temperature during calibrations
2. **Fresh Buffers**: Use fresh calibration buffers (check expiration dates)
3. **Equilibration**: Allow probes to equilibrate before recording readings
4. **Documentation**: Use the data logger to maintain records
5. **Regular Calibration**: 
   - pH: Before each use or daily
   - DO: Weekly or before field campaigns
   - Barometric pressure: Verify monthly

### Data Quality

**DO Measurements:**
- Probe should read 95-105% saturation in air-saturated water
- If <90% or >110%, recalibrate or replace membrane

**pH Measurements:**
- Slope should be 95-105% for accurate measurements
- Rinse probe between buffers
- Use 3-point calibration (pH 4, 7, 10) for best accuracy

**Barometric Pressure:**
- Compare with local weather station
- Should be within 2-3 mmHg
- Account for altitude

### Troubleshooting

**Unexpected DO Reading:**
1. Check temperature - major factor in saturation
2. Verify barometric pressure - affects saturation
3. Check salinity - reduces saturation
4. Inspect membrane for bubbles or damage

**Poor pH Slope:**
1. Clean electrode with appropriate solution
2. Rehydrate in storage solution overnight
3. Check buffer solutions (expired?)
4. Replace electrode if persistently poor

**Conversion Discrepancies:**
1. Ensure correct input unit selected
2. Check for typos in entered values
3. Verify your instrument's units

---

## Keyboard Shortcuts

While the app is focused:
- `Tab`: Navigate between fields
- `Enter`: Submit forms
- `Ctrl/Cmd + Q`: Quit application

---

## Technical Notes

### Calculation Accuracy

All calculations use standard scientific equations:
- Pressure conversions: NIST standard factors
- DO saturation: Benson & Krause (1984)
- pH slope: Nernst equation

Accuracy is suitable for field calibration (±1-2%). For laboratory certification, use NIST-traceable standards.

### Data Privacy

All data is stored locally on your computer. No internet connection required. No data is transmitted to external servers.

---

## Quick Reference Card

### Standard Values at 25°C

**DO Saturation (Fresh Water, 760 mmHg):**
- 100% saturation ≈ 8.24 mg/L

**pH Buffer mV Values:**
- pH 7.0: 0 ± 10 mV
- pH 4.0: +177 ± 15 mV
- pH 10.0: -177 ± 15 mV

**Barometric Pressure:**
- Sea level standard: 760 mmHg = 29.92 inHg = 1013.25 hPa

---

⚓ For technical support or questions, refer to the README.md file.

**Version:** Ship Log v1.0

