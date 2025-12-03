import React from 'react';
import './Sidebar.css';
import { FaAnchor, FaTint, FaBook, FaStickyNote, FaExternalLinkAlt } from 'react-icons/fa';
import { GiSpeedometer } from 'react-icons/gi';
import { MdWaterDrop } from 'react-icons/md';

const Sidebar = ({ activeTab, onTabChange, isOpen }) => {
  const menuItems = [
    { id: 'barometer', icon: GiSpeedometer, label: 'Barometer' },
    { id: 'oxygen', icon: MdWaterDrop, label: 'Dissolved O₂' },
    { id: 'ph', icon: FaTint, label: 'pH Calibration' },
    { id: 'notes', icon: FaStickyNote, label: 'Field Notes' },
    { id: 'logger', icon: FaBook, label: 'Data Logger' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="profile-section">
          <img 
            src="/assets/lee-marchman.jpg" 
            alt="Lee Marchman" 
            className="profile-photo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="profile-placeholder">
            <FaAnchor className="placeholder-icon" />
            <span className="placeholder-text">Lee Marchman</span>
          </div>
        </div>
        <h1 className="sidebar-title">Lee's<br/>Barometer<br/>Reading App</h1>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="sidebar-footer">
        <a 
          href="https://www.fieldenvironmental.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="field-environmental-link"
        >
          <FaExternalLinkAlt className="link-icon" />
          <span>Field Environmental</span>
        </a>
        
        <div className="signature">
          Made by <strong>Avery</strong>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

