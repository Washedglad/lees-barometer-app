import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import BarometerConverter from './components/BarometerConverter';
import DOCorrection from './components/DOCorrection';
import PhCalibration from './components/PhCalibration';
import DataLogger from './components/DataLogger';
import { playBoatHorn, playWaterClick } from './utils/soundEffects';

function App() {
  const [activeTab, setActiveTab] = useState('barometer');
  const [logData, setLogData] = useState([]);

  const handleTabChange = (tab) => {
    playWaterClick();
    setActiveTab(tab);
  };

  const addLogEntry = (entry) => {
    const timestamp = new Date().toISOString();
    const newEntry = { ...entry, timestamp };
    setLogData([newEntry, ...logData]);
  };

  return (
    <div className="app">
      {/* Background Animation */}
      <div className="ocean-bg">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Compass Rose Watermark */}
      <div className="compass-watermark">
        <svg viewBox="0 0 100 100" width="80" height="80">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1F4D73" strokeWidth="1" opacity="0.15"/>
          <circle cx="50" cy="50" r="35" fill="none" stroke="#1F4D73" strokeWidth="0.5" opacity="0.15"/>
          <polygon points="50,5 52,45 50,50 48,45" fill="#1F4D73" opacity="0.15"/>
          <polygon points="50,95 52,55 50,50 48,55" fill="#1F4D73" opacity="0.1"/>
          <polygon points="5,50 45,52 50,50 45,48" fill="#1F4D73" opacity="0.1"/>
          <polygon points="95,50 55,52 50,50 55,48" fill="#1F4D73" opacity="0.1"/>
          <text x="50" y="18" textAnchor="middle" fontSize="12" fill="#1F4D73" opacity="0.2">N</text>
        </svg>
      </div>

      <div className="app-container">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main className="main-content">
          <div className="content-wrapper">
            {activeTab === 'barometer' && <BarometerConverter addLogEntry={addLogEntry} />}
            {activeTab === 'oxygen' && <DOCorrection addLogEntry={addLogEntry} />}
            {activeTab === 'ph' && <PhCalibration addLogEntry={addLogEntry} />}
            {activeTab === 'logger' && <DataLogger logData={logData} />}
          </div>
          
          <footer className="app-footer">
            <span>⚓ Ship Log – v1.0</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;

