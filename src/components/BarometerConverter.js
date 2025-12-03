import React, { useState, useEffect } from 'react';
import './BarometerConverter.css';
import { GiSpeedometer } from 'react-icons/gi';
import { FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import { playBoatHorn, playWaterClick } from '../utils/soundEffects';
import { convertPressure } from '../utils/calculations';
import { getCurrentBarometricPressure } from '../utils/weatherService';

const BarometerConverter = ({ addLogEntry }) => {
  const [inputValue, setInputValue] = useState('760');
  const [inputUnit, setInputUnit] = useState('mmHg');
  const [results, setResults] = useState({});
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationData, setLocationData] = useState(null);

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
        results: results,
        location: locationData
      });
    }
  };

  const handleGetCurrentPressure = async () => {
    playWaterClick();
    setLoadingLocation(true);
    setLocationData(null);

    try {
      const data = await getCurrentBarometricPressure();
      
      if (data.success) {
        // Set the pressure value in hPa
        setInputValue(data.pressure_hPa.toFixed(2));
        setInputUnit('hPa');
        
        // Store location data
        setLocationData({
          location: data.locationName,
          latitude: data.latitude.toFixed(4),
          longitude: data.longitude.toFixed(4),
          elevation: data.elevation ? `${data.elevation}m` : 'N/A',
          temperature: data.temperature_C ? `${data.temperature_C.toFixed(1)}°C` : 'N/A',
          timestamp: new Date(data.timestamp).toLocaleString()
        });
        
        playBoatHorn();
      } else {
        alert(`Error getting location: ${data.error}\n\nPlease:\n1. Allow location access in your browser\n2. Make sure location services are enabled\n3. Check your internet connection`);
      }
    } catch (error) {
      alert(`Failed to get current pressure: ${error.message}`);
    } finally {
      setLoadingLocation(false);
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
        
        <button 
          className="btn-secondary" 
          onClick={handleGetCurrentPressure}
          disabled={loadingLocation}
        >
          {loadingLocation ? (
            <>
              <FaSpinner className="spinner" />
              Getting Location...
            </>
          ) : (
            <>
              <FaMapMarkerAlt />
              Get Current Location Pressure
            </>
          )}
        </button>
        
        <button className="btn-primary" onClick={handleConvert}>
          Convert Pressure
        </button>
      </div>
      
      {locationData && (
        <div className="card location-info-card">
          <h3 className="location-title">
            <FaMapMarkerAlt className="location-icon" />
            Current Location Data
          </h3>
          <div className="location-grid">
            <div className="location-item">
              <span className="location-label">Location</span>
              <span className="location-value">{locationData.location}</span>
            </div>
            <div className="location-item">
              <span className="location-label">Coordinates</span>
              <span className="location-value">{locationData.latitude}, {locationData.longitude}</span>
            </div>
            <div className="location-item">
              <span className="location-label">Elevation</span>
              <span className="location-value">{locationData.elevation}</span>
            </div>
            <div className="location-item">
              <span className="location-label">Temperature</span>
              <span className="location-value">{locationData.temperature}</span>
            </div>
            <div className="location-item full-width">
              <span className="location-label">Retrieved</span>
              <span className="location-value">{locationData.timestamp}</span>
            </div>
          </div>
          <div className="info-box">
            <strong>📍 Note:</strong> This reading is from a nearby weather station. 
            For precise measurements, use a calibrated barometer at your exact location.
          </div>
        </div>
      )}
      
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

