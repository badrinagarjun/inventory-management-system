import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PackagesDashboard.css';

const PackagesDashboard = () => {
  const [notShippedPackages, setNotShippedPackages] = useState([]);
  const [shippedPackages, setShippedPackages] = useState([]);
  const [deliveredPackages, setDeliveredPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/warehouse');
        const data = response.data;

        // Filter the packages based on their shipment status
        const pendingOrProcessing = data.filter(
          (item) => item.shipmentStatus === 'Pending' || item.shipmentStatus === 'Processing'
        );
        const shipped = data.filter((item) => item.shipmentStatus === 'Shipped');
        const delivered = data.filter((item) => item.shipmentStatus === 'Delivered');

        setNotShippedPackages(pendingOrProcessing);
        setShippedPackages(shipped);
        setDeliveredPackages(delivered);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="packages-dashboard">
      <div className="package-column not-shipped">
        <div className="column-header">
          <h2>Packages, Not Shipped</h2>
          <span className="menu-icon">☰</span>
        </div>
        <div className="column-content">
          {notShippedPackages.length > 0 ? (
            notShippedPackages.map((item) => <p key={item.orderNo}>{item.productName}</p>)
          ) : (
            <p>No Records Found</p>
          )}
        </div>
      </div>
      <div className="package-column shipped">
        <div className="column-header">
          <h2>Shipped Packages</h2>
          <span className="menu-icon">☰</span>
        </div>
        <div className="column-content">
          {shippedPackages.length > 0 ? (
            shippedPackages.map((item) => <p key={item.orderNo}>{item.productName}</p>)
          ) : (
            <p>No Records Found</p>
          )}
        </div>
      </div>
      <div className="package-column delivered">
        <div className="column-header">
          <h2>Delivered Packages</h2>
          <span className="menu-icon">☰</span>
        </div>
        <div className="column-content">
          {deliveredPackages.length > 0 ? (
            deliveredPackages.map((item) => <p key={item.orderNo}>{item.productName}</p>)
          ) : (
            <p>No Records Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackagesDashboard;
