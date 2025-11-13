import React, { useEffect, useState } from 'react';
import './SalesOrderTable.css';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import '@fortawesome/fontawesome-free/css/all.min.css';


const isAdmin = () => {
  return false; // Assume this returns true if the user is an admin
};

const SalesOrderTable1 = () => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedSKU, setEditedSKU] = useState('');

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

  const handleEditClick = (index, currentSKU) => {
    setIsEditing(index);
    setEditedSKU(currentSKU);
  };

  const handleSaveClick = async (index) => {
    const updatedOrders = [...salesOrders];
    updatedOrders[index].productSKU = parseInt(editedSKU, 10); // Convert SKU to integer
    setSalesOrders(updatedOrders);
    setIsEditing(null);

    // Make a PUT request to update the product SKU on the server
    try {
      await axios.put(`http://localhost:8080/api/items/${updatedOrders[index].id}`, {
        ...updatedOrders[index],
        productSKU: updatedOrders[index].productSKU,
      });
    } catch (error) {
      console.error('Error updating product SKU:', error);
    }
  };

  const handleSKUChange = (event) => {
    setEditedSKU(event.target.value);
  };

  return (
    <div>
      <div className="header-container">
        <CSVLink data={csvData} headers={headers} filename="sales_orders.csv">
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            <i className="fas fa-download" style={{ color: '#000' }}></i>
          </button>
        </CSVLink>
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
              <td>
                {isEditing === index ? (
                  <div>
                    <input
                      type="text"
                      value={editedSKU}
                      onChange={handleSKUChange}
                    />
                    <button
                      onClick={() => handleSaveClick(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        marginLeft: '8px',
                      }}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {order.productSKU}
                    {!isAdmin() && (
                      <button
                        onClick={() => handleEditClick(index, order.productSKU)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          marginLeft: '12px', // Adjust this value to move the button further to the right
                        }}
                      >
                        <i className="fas fa-edit" style={{ color: '#000' }}></i>
                      </button>
                    )}
                  </div>
                )}
              </td>
              <td>{order.price}</td>
              <td>{order.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesOrderTable1;
