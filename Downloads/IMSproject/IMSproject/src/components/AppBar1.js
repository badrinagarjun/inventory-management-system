import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppBar1.css';

const AppBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.toLowerCase() === 'items') {
      navigate('/inventory/items');
    } else if (searchQuery.toLowerCase() === 'item groups') {
      navigate('/item-groups');
    } else if (searchQuery.toLowerCase() === 'cart') {
      navigate('/order-management');
    } else if (searchQuery.toLowerCase() === 'barcode') {
      navigate('/inventory-manager');
    } else if (searchQuery.toLowerCase() === 'add products') {
      navigate('/add-sales-order');
    } else {
      alert('No results found');
    }
  };

  return (
    <div className="app-bar1">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="search-input"
        />
      
      
        <button type="submit" className="search-button">Search</button>
        </form>
      <div className="app-bar-menu">
        <div className="dropdown">
          <button className="dropbtn">Profile</button>
          <div className="dropdown-content">
            <a href="#logout" onClick={handleLogout}>Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
