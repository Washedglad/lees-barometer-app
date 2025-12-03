// Barometric Pressure Conversions
export const convertPressure = (value, fromUnit) => {
  // Convert everything to mmHg first
  let mmHg;
  
  switch (fromUnit) {
    case 'mmHg':
      mmHg = value;
      break;
    case 'inHg':
      mmHg = value * 25.4;
      break;
    case 'hPa':
      mmHg = value * 0.750062;
      break;
    case 'PSI':
      mmHg = value * 51.7149;
      break;
    default:
      mmHg = value;
  }
  
  // Convert from mmHg to all units
  return {
    mmHg: mmHg,
    inHg: mmHg / 25.4,
    hPa: mmHg / 0.750062,
    PSI: mmHg / 51.7149
  };
};

// Dissolved Oxygen Calculations
export const calculateDO = (temperature, salinity, pressure, pressureUnit, probeReading = null) => {
  // Convert pressure to mmHg if needed
  let pressureMmHg = pressure;
  if (pressureUnit === 'hPa') {
    pressureMmHg = pressure * 0.750062;
  }
  
  // Calculate DO saturation using simplified Benson & Krause equation
  // This is an approximation for field use
  const T = temperature + 273.15; // Convert to Kelvin
  const P = pressureMmHg / 760; // Normalize pressure to atm
  
  // Natural log terms for freshwater DO saturation
  const lnDO_fresh = -139.34411 + (1.575701e5 / T) - (6.642308e7 / Math.pow(T, 2)) +
                     (1.243800e10 / Math.pow(T, 3)) - (8.621949e11 / Math.pow(T, 4));
  
  // DO saturation for freshwater at 1 atm (mg/L)
  let DO_sat = Math.exp(lnDO_fresh);
  
  // Salinity correction (approximate)
  if (salinity > 0) {
    const S = salinity;
    const salinity_correction = Math.exp(-0.0001 * S * (33.5 + 0.65 * temperature));
    DO_sat *= salinity_correction;
  }
  
  // Pressure correction
  DO_sat *= P;
  
  // Calculate percentage saturation if probe reading is provided
  let saturation = 100;
  let difference = null;
  let probeSaturation = null;
  let saturationDiff = null;
  
  if (probeReading !== null) {
    probeSaturation = (probeReading / DO_sat) * 100;
    difference = probeReading - DO_sat;
    saturationDiff = probeSaturation - 100;
  }
  
  return {
    expectedDO: DO_sat,
    saturation: saturation,
    probeReading: probeReading,
    probeSaturation: probeSaturation,
    difference: difference,
    saturationDiff: saturationDiff
  };
};

// pH Calibration Calculations
export const getExpectedMv = (temperature) => {
  // Nernst equation: mV change per pH unit at given temperature
  // Slope = (2.303 * R * T) / F
  // At 25°C: ~59.16 mV/pH
  const R = 8.314; // Gas constant (J/(mol·K))
  const F = 96485; // Faraday constant (C/mol)
  const T = temperature + 273.15; // Kelvin
  
  const theoreticalSlope = (2.303 * R * T) / F * 1000; // Convert to mV
  
  // pH 7 is typically 0 mV at calibration (isopotential point)
  // pH 4 is +3 pH units from 7
  // pH 10 is -3 pH units from 7
  
  return {
    ph4: theoreticalSlope * 3,
    ph7: 0,
    ph10: -theoreticalSlope * 3,
    theoreticalSlope: theoreticalSlope
  };
};

export const calculatePhSlope = (mv7, mv4, mv10, temperature) => {
  const expectedMv = getExpectedMv(temperature);
  
  if (mv7 === null || (mv4 === null && mv10 === null)) {
    return null;
  }
  
  // Calculate slope percentage
  let actualSlope;
  let expectedSlope;
  
  if (mv4 !== null) {
    // Using pH 4 and pH 7
    actualSlope = Math.abs(mv4 - mv7) / 3; // mV per pH unit
    expectedSlope = expectedMv.theoreticalSlope;
  } else if (mv10 !== null) {
    // Using pH 10 and pH 7
    actualSlope = Math.abs(mv10 - mv7) / 3; // mV per pH unit
    expectedSlope = expectedMv.theoreticalSlope;
  }
  
  const slopePercentage = (actualSlope / expectedSlope) * 100;
  
  // Determine status
  let status;
  if (slopePercentage >= 95 && slopePercentage <= 105) {
    status = 'good';
  } else if (slopePercentage >= 85 && slopePercentage <= 115) {
    status = 'acceptable';
  } else {
    status = 'poor';
  }
  
  return {
    percentage: slopePercentage,
    actualSlope: actualSlope,
    expectedSlope: expectedSlope,
    status: status
  };
};

