import React, { useState } from 'react';
import './BarometerConverter.css';
import { MdWaterDrop } from 'react-icons/md';
import { playBoatHorn } from '../utils/soundEffects';
import { calculateDO } from '../utils/calculations';

const DOCorrection = ({ addLogEntry }) => {
  const [temperature, setTemperature] = useState('20');
  const [salinity, setSalinity] = useState('0');
  const [pressure, setPressure] = useState('760');
  const [pressureUnit, setPressureUnit] = useState('mmHg');
  const [probeReading, setProbeReading] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    playBoatHorn();
    
    const temp = parseFloat(temperature);
    const sal = parseFloat(salinity);
    const pres = parseFloat(pressure);
    const probe = probeReading ? parseFloat(probeReading) : null;
    
    if (!isNaN(temp) && !isNaN(sal) && !isNaN(pres)) {
      const doResults = calculateDO(temp, sal, pres, pressureUnit, probe);
      setResults(doResults);
      
      addLogEntry({
        type: 'DO Correction',
        input: { temperature: temp, salinity: sal, pressure: pres, unit: pressureUnit },
        results: doResults
      });
    }
  };

  return (
    <div className="feature-container">
      <div className="feature-header">
        <MdWaterDrop className="feature-icon" />
        <h2>Dissolved Oxygen (DO) Correction Tool</h2>
      </div>
      
      <div className="card">
        <div className="input-grid">
          <div className="input-section">
            <label className="input-label">Temperature (°C)</label>
            <input
              type="number"
              className="input-field"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              step="0.1"
            />
          </div>
          
          <div className="input-section">
            <label className="input-label">Salinity (ppt)</label>
            <input
              type="number"
              className="input-field"
              value={salinity}
              onChange={(e) => setSalinity(e.target.value)}
              step="0.1"
              placeholder="0 for fresh water"
            />
          </div>
          
          <div className="input-section">
            <label className="input-label">Barometric Pressure</label>
            <div className="input-row">
              <input
                type="number"
                className="input-field"
                value={pressure}
                onChange={(e) => setPressure(e.target.value)}
                step="0.1"
              />
              <select
                className="select-field"
                value={pressureUnit}
                onChange={(e) => setPressureUnit(e.target.value)}
              >
                <option value="mmHg">mmHg</option>
                <option value="hPa">hPa</option>
              </select>
            </div>
          </div>
          
          <div className="input-section">
            <label className="input-label">Probe Reading (optional, mg/L)</label>
            <input
              type="number"
              className="input-field"
              value={probeReading}
              onChange={(e) => setProbeReading(e.target.value)}
              step="0.01"
              placeholder="Leave empty to skip comparison"
            />
          </div>
        </div>
        
        <button className="btn-primary" onClick={handleCalculate}>
          Calculate DO Saturation
        </button>
      </div>
      
      {results && (
        <div className="card results-card">
          <h3 className="results-title">
            <MdWaterDrop className="gauge-icon" />
            DO Saturation Results
          </h3>
          <div className="results-grid">
            <div className="result-item highlight">
              <span className="result-label">Expected DO (100% sat)</span>
              <span className="result-value">{results.expectedDO.toFixed(2)} mg/L</span>
            </div>
            <div className="result-item highlight">
              <span className="result-label">Percentage Saturation</span>
              <span className="result-value">{results.saturation.toFixed(1)}%</span>
            </div>
          </div>
          
          {results.probeReading !== null && (
            <div className="comparison-table">
              <h4>Probe Comparison</h4>
              <table>
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Expected</th>
                    <th>Probe Reading</th>
                    <th>Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DO (mg/L)</td>
                    <td>{results.expectedDO.toFixed(2)}</td>
                    <td>{results.probeReading.toFixed(2)}</td>
                    <td className={results.difference >= 0 ? 'positive' : 'negative'}>
                      {results.difference > 0 ? '+' : ''}{results.difference.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>Saturation (%)</td>
                    <td>100.0%</td>
                    <td>{results.probeSaturation.toFixed(1)}%</td>
                    <td className={results.saturationDiff >= 0 ? 'positive' : 'negative'}>
                      {results.saturationDiff > 0 ? '+' : ''}{results.saturationDiff.toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          <div className="info-box">
            <strong>Note:</strong> Calculations use standard equations for DO saturation based on 
            temperature, salinity, and barometric pressure. Values are approximations suitable for 
            field calibration.
          </div>
        </div>
      )}
    </div>
  );
};

export default DOCorrection;

