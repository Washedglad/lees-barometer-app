import React from 'react';
import './Sidebar.css';
import { FaAnchor, FaTint, FlaskIcon, FaBook } from 'react-icons/fa';
import { GiSpeedometer } from 'react-icons/gi';
import { MdWaterDrop } from 'react-icons/md';

const Sidebar = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'barometer', icon: GiSpeedometer, label: 'Barometer' },
    { id: 'oxygen', icon: MdWaterDrop, label: 'Dissolved O₂' },
    { id: 'ph', icon: FaTint, label: 'pH Calibration' },
    { id: 'logger', icon: FaBook, label: 'Data Logger' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <FaAnchor className="logo-icon" />
        <h1 className="sidebar-title">Lee's<br/>Barometer</h1>
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
      
      <div className="sidebar-decoration">
        <div className="rope-line"></div>
      </div>
    </aside>
  );
};

export default Sidebar;

