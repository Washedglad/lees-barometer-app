import React, { useState, useEffect } from 'react';
import './BarometerConverter.css';
import { GiSpeedometer } from 'react-icons/gi';
import { playBoatHorn } from '../utils/soundEffects';
import { convertPressure } from '../utils/calculations';

const BarometerConverter = ({ addLogEntry }) => {
  const [inputValue, setInputValue] = useState('760');
  const [inputUnit, setInputUnit] = useState('mmHg');
  const [results, setResults] = useState({});

  useEffect(() => {
    if (inputValue && !isNaN(inputValue)) {
      const converted = convertPressure(parseFloat(inputValue), inputUnit);
      setResults(converted);
    }
  }, [inputValue, inputUnit]);

  const handleConvert = () => {
    playBoatHorn();
    if (inputValue && !isNaN(inputValue)) {
      addLogEntry({
        type: 'Barometer Conversion',
        input: `${inputValue} ${inputUnit}`,
        results: results
      });
    }
  };

  return (
    <div className="feature-container">
      <div className="feature-header">
        <GiSpeedometer className="feature-icon" />
        <h2>Barometric Pressure Converter</h2>
      </div>
      
      <div className="card">
        <div className="input-section">
          <label className="input-label">Input Pressure</label>
          <div className="input-row">
            <input
              type="number"
              className="input-field"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              step="0.01"
            />
            <select
              className="select-field"
              value={inputUnit}
              onChange={(e) => setInputUnit(e.target.value)}
            >
              <option value="mmHg">mmHg</option>
              <option value="inHg">inHg</option>
              <option value="hPa">hPa (mbar)</option>
              <option value="PSI">PSI</option>
            </select>
          </div>
        </div>
        
        <button className="btn-primary" onClick={handleConvert}>
          Convert Pressure
        </button>
      </div>
      
      {results && Object.keys(results).length > 0 && (
        <div className="card results-card">
          <h3 className="results-title">
            <GiSpeedometer className="gauge-icon" />
            Converted Values
          </h3>
          <div className="results-grid">
            <div className="result-item">
              <span className="result-label">mmHg (Torr)</span>
              <span className="result-value">{results.mmHg?.toFixed(2)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">inHg (inches)</span>
              <span className="result-value">{results.inHg?.toFixed(3)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">hPa (mbar)</span>
              <span className="result-value">{results.hPa?.toFixed(2)}</span>
            </div>
            <div className="result-item">
              <span className="result-label">PSI</span>
              <span className="result-value">{results.PSI?.toFixed(3)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarometerConverter;

