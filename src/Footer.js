import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer25">
      <div className="footer-content21">
        <div className="footer-section21">
          <h2>About Us</h2>
          <p> We help businesses track and manage their inventory levels, orders, sales, and deliveries efficiently. It streamlines operations by providing real-time visibility into stock levels, reducing the risk of overstocking or stockouts.</p>
        </div>
        <div className="footer-section21">
          <h2>Contact Us</h2>
          <ul>
            <li>Email: <a href="mailto:contact@toystore.com">MONASH@gmail.com</a></li>
            <li>contact: <a href="tel:+123456789">+91 9745456868</a></li>
            <li>Address: Plot No 75, 8th Rd, EPIP Zone, Whitefield, Bengaluru, Karnataka, 560066.</li>
          </ul>
        </div>
        <div className="footer-section21">
          <h2>Follow Us</h2>
          <div className="social-icons21">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">F</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">I</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">T</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom21">
        <p>&copy; 2024 MONASH. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
