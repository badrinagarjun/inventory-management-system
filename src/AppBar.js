import React from 'react';
import { useNavigate } from 'react-router-dom';
import './appBar.css';

function AppBar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="app-bar">
      <div className="app-bar-logo" onClick={() => handleNavigation('/')}>
        <h2>MONASH</h2>
      </div>
      <div className="app-bar-menu">
        <button onClick={() => handleNavigation('/about')}>About Us</button>
        <button onClick={() => handleNavigation('/features')}>Features</button>
      </div>
    </div>
  );
}

export default AppBar;
