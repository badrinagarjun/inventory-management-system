import React, { useEffect, useState } from 'react';
import './SalesOrderTable.css';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import '@fortawesome/fontawesome-free/css/all.min.css';


const SalesOrderTable = () => {
  const [salesOrders, setSalesOrders] = useState([]);

  useEffect(() => {
    const fetchSalesOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/items');
        setSalesOrders(response.data);
      } catch (error) {
        console.error('Error fetching sales orders:', error);
      }
    };

    fetchSalesOrders();
  }, []);

  // Define CSV headers
  const headers = [
    { label: 'Product Name', key: 'productName' },
    { label: 'Product SKU', key: 'productSKU' },
    { label: 'Product Price', key: 'price' },
    { label: 'Description', key: 'description' }
  ];

  // Prepare CSV data
  const csvData = salesOrders.map(order => ({
    productName: order.productName,
    productSKU: order.productSKU,
    price: order.price,
    description: order.description
  }));

  return (
    <div>
      <div className="header-container">
        {/* <CSVLink data={csvData} headers={headers} filename="sales_orders.csv">
          <button className="icon-button">
            <i className="fas fa-download"></i>
          </button>
        </CSVLink> */}
      </div>
      <table className="sales-order-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product SKU</th>
            <th>Product Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {salesOrders.map((order, index) => (
            <tr key={index}>
              <td>{order.productName}</td>
              <td>{order.productSKU}</td>
              <td>{order.price}</td>
              <td>{order.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesOrderTable;
