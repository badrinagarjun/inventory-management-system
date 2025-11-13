// Footer.js
import React from 'react';
import './Footer1.css';

function Footer() {
  return (
    <footer className="footer1">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About Us</h2>
          <p>We offer robust inventory and order management system tailored for growing businesses. It streamlines inventory management, order fulfillment, and multi-channel sales, providing powerful tools for analytics, demand forecasting, and customer relationship management.</p>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <ul>
            <li>Email: <a href="mailto:contact@toystore.com">MONASH@yahoo.com</a></li>
            <li>contact: <a href="tel:+123456789">+91 8838251296</a></li>
            <li>Address: Ashok Nagar, Bengaluru, Karnataka 560001</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">F</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">I</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">T</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MONASH. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;