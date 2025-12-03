import React from 'react';
import './BarometerConverter.css';
import { FaBook, FaDownload, FaTrash } from 'react-icons/fa';
import { playBoatHorn } from '../utils/soundEffects';

const DataLogger = ({ logData }) => {
  const exportToCSV = () => {
    playBoatHorn();
    
    if (logData.length === 0) {
      alert('No data to export');
      return;
    }
    
    // Create CSV content
    let csvContent = 'Timestamp,Type,Input,Results\n';
    
    logData.forEach(entry => {
      const timestamp = new Date(entry.timestamp).toLocaleString();
      const type = entry.type;
      const input = JSON.stringify(entry.input).replace(/,/g, ';');
      const results = JSON.stringify(entry.results).replace(/,/g, ';');
      csvContent += `"${timestamp}","${type}","${input}","${results}"\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lees-barometer-log-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const formatEntryData = (entry) => {
    const data = [];
    
    if (typeof entry.input === 'object') {
      data.push(...Object.entries(entry.input).map(([key, value]) => 
        `${key}: ${value}`
      ));
    } else {
      data.push(`Input: ${entry.input}`);
    }
    
    return data;
  };

  return (
    <div className="feature-container">
      <div className="feature-header">
        <FaBook className="feature-icon" />
        <h2>Calibration Data Logger</h2>
      </div>
      
      <div className="card">
        <div className="logger-controls">
          <button className="btn-primary" onClick={exportToCSV} disabled={logData.length === 0}>
            <FaDownload /> Export to CSV
          </button>
          <div className="log-count">
            Total Entries: <strong>{logData.length}</strong>
          </div>
        </div>
      </div>
      
      {logData.length === 0 ? (
        <div className="card info-card">
          <p className="empty-state">
            No calibration data logged yet. Perform measurements in other sections and they will appear here.
          </p>
        </div>
      ) : (
        <div className="log-entries">
          {logData.map((entry, index) => (
            <div key={index} className="log-entry card">
              <div className="log-header">
                <span className="log-type">{entry.type}</span>
                <span className="log-timestamp">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="log-body">
                <div className="log-section">
                  <strong>Input Parameters:</strong>
                  <ul className="log-data-list">
                    {formatEntryData(entry).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="log-section">
                  <strong>Results:</strong>
                  <pre className="log-results">
                    {JSON.stringify(entry.results, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataLogger;

