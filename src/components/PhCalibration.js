import React, { useState } from 'react';
import './BarometerConverter.css';
import { FaTint } from 'react-icons/fa';
import { playBoatHorn } from '../utils/soundEffects';
import { calculatePhSlope, getExpectedMv } from '../utils/calculations';

const PhCalibration = ({ addLogEntry }) => {
  const [temperature, setTemperature] = useState('25');
  const [ph7mv, setPh7mv] = useState('');
  const [ph4mv, setPh4mv] = useState('');
  const [ph10mv, setPh10mv] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    playBoatHorn();
    
    const temp = parseFloat(temperature);
    const mv7 = ph7mv ? parseFloat(ph7mv) : null;
    const mv4 = ph4mv ? parseFloat(ph4mv) : null;
    const mv10 = ph10mv ? parseFloat(ph10mv) : null;
    
    if (!isNaN(temp)) {
      const expectedMv = getExpectedMv(temp);
      const slope = calculatePhSlope(mv7, mv4, mv10, temp);
      
      setResults({
        temperature: temp,
        expectedMv,
        slope,
        mv7,
        mv4,
        mv10
      });
      
      addLogEntry({
        type: 'pH Calibration',
        input: { temperature: temp, ph7mv: mv7, ph4mv: mv4, ph10mv: mv10 },
        results: { slope, expectedMv }
      });
    }
  };

  return (
    <div className="feature-container">
      <div className="feature-header">
        <FaTint className="feature-icon" />
        <h2>pH Calibration Helper</h2>
      </div>
      
      <div className="card info-card">
        <h3>Calibration Procedure</h3>
        <ol className="procedure-list">
          <li>Warm up probe for 5-10 minutes</li>
          <li>Rinse probe with distilled water and gently blot dry</li>
          <li>Start with pH 7.0 buffer solution</li>
          <li>Wait for reading to stabilize (record mV)</li>
          <li>Rinse and calibrate with pH 4.0 OR pH 10.0 buffer</li>
          <li>Verify slope percentage (should be 85-105%)</li>
          <li>Store probe in storage solution when not in use</li>
        </ol>
        
        <div className="reminder-box">
          <strong>⚠️ Important Reminders:</strong>
          <ul>
            <li>Always calibrate at sample temperature when possible</li>
            <li>Replace buffer solutions regularly</li>
            <li>Never store probe in distilled water</li>
            <li>Check expiration dates on buffer solutions</li>
          </ul>
        </div>
      </div>
      
      <div className="card">
        <div className="input-grid">
          <div className="input-section full-width">
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
            <label className="input-label">pH 7.0 Buffer (mV)</label>
            <input
              type="number"
              className="input-field"
              value={ph7mv}
              onChange={(e) => setPh7mv(e.target.value)}
              step="0.1"
              placeholder="Enter mV reading"
            />
          </div>
          
          <div className="input-section">
            <label className="input-label">pH 4.0 Buffer (mV)</label>
            <input
              type="number"
              className="input-field"
              value={ph4mv}
              onChange={(e) => setPh4mv(e.target.value)}
              step="0.1"
              placeholder="Optional"
            />
          </div>
          
          <div className="input-section">
            <label className="input-label">pH 10.0 Buffer (mV)</label>
            <input
              type="number"
              className="input-field"
              value={ph10mv}
              onChange={(e) => setPh10mv(e.target.value)}
              step="0.1"
              placeholder="Optional"
            />
          </div>
        </div>
        
        <button className="btn-primary" onClick={handleCalculate}>
          Calculate Slope & Expected Values
        </button>
      </div>
      
      {results && (
        <div className="card results-card">
          <h3 className="results-title">
            <FaTint className="gauge-icon" />
            Calibration Results
          </h3>
          
          <div className="results-grid">
            <div className="result-item highlight">
              <span className="result-label">Temperature</span>
              <span className="result-value">{results.temperature.toFixed(1)} °C</span>
            </div>
            <div className="result-item highlight">
              <span className="result-label">Expected mV (pH 7)</span>
              <span className="result-value">{results.expectedMv.ph7.toFixed(1)} mV</span>
            </div>
          </div>
          
          <div className="expected-values-table">
            <h4>Expected mV Values at {results.temperature.toFixed(1)}°C</h4>
            <table>
              <thead>
                <tr>
                  <th>pH Buffer</th>
                  <th>Expected mV</th>
                  <th>Your Reading</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>pH 4.0</td>
                  <td>{results.expectedMv.ph4.toFixed(1)} mV</td>
                  <td>{results.mv4 !== null ? results.mv4.toFixed(1) : '—'}</td>
                  <td>{results.mv4 !== null ? (results.mv4 - results.expectedMv.ph4).toFixed(1) : '—'}</td>
                </tr>
                <tr>
                  <td>pH 7.0</td>
                  <td>{results.expectedMv.ph7.toFixed(1)} mV</td>
                  <td>{results.mv7 !== null ? results.mv7.toFixed(1) : '—'}</td>
                  <td>{results.mv7 !== null ? (results.mv7 - results.expectedMv.ph7).toFixed(1) : '—'}</td>
                </tr>
                <tr>
                  <td>pH 10.0</td>
                  <td>{results.expectedMv.ph10.toFixed(1)} mV</td>
                  <td>{results.mv10 !== null ? results.mv10.toFixed(1) : '—'}</td>
                  <td>{results.mv10 !== null ? (results.mv10 - results.expectedMv.ph10).toFixed(1) : '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {results.slope && (
            <div className={`slope-result ${results.slope.status}`}>
              <h4>Slope Calculation</h4>
              <div className="slope-value">
                <span>Slope Percentage:</span>
                <strong>{results.slope.percentage.toFixed(1)}%</strong>
              </div>
              <div className="slope-status">
                Status: <strong>{results.slope.status === 'good' ? '✓ Good' : results.slope.status === 'acceptable' ? '⚠ Acceptable' : '✗ Poor'}</strong>
              </div>
              <p className="slope-info">
                {results.slope.status === 'good' && 'Probe is working well within acceptable range.'}
                {results.slope.status === 'acceptable' && 'Probe is marginal. Consider cleaning or replacing.'}
                {results.slope.status === 'poor' && 'Probe response is poor. Clean or replace the probe.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhCalibration;

