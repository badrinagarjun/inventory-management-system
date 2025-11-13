import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './AppBar1.css';

const AppBar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    navigate('/'); // Redirect to Home page
  };

  return (
    <div className="app-bar">
      {/* <div className="app-bar-left">
        <button className="sign-out-button" onClick={handleLogout}>Sign Out</button>
      </div> */}
      <h1>MONASH</h1>
      <div className="app-bar-menu">
        {/* <img src="/path/to/icon.png" alt="User Icon" className="user-icon" /> */}
        <div className="dropdown">
          {/* <button className="dropbtn">My Account</button> */}
          <div className="dropdown-content">
            {/* <a href="#profile">Profile</a>
            <a href="#settings">Settings</a> */}
            <a href="#logout" onClick={handleLogout}>Logout</a> {/* Add onClick event to handleLogout */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
