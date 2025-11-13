


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './SalesDashboard.css';

// const SalesDashboard = () => {
//   const [salesData, setSalesData] = useState([]);
//   const [editOrderNo, setEditOrderNo] = useState(null);
//   const [newStatus, setNewStatus] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/warehouse');
//         setSalesData(response.data);
//       } catch (error) {
//         console.error('Error fetching sales data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleEditClick = (orderNo, currentStatus) => {
//     setEditOrderNo(orderNo);
//     setNewStatus(currentStatus);
//   };

//   const handleSaveClick = async (orderNo) => {
//     try {
//       // Update the shipment status in the database
//       await axios.put(`http://localhost:8080/api/warehouse/${orderNo}`, { shipmentStatus: newStatus });
      
//       // Update the local state to reflect the change
//       setSalesData(salesData.map(item => 
//         item.orderNo === orderNo ? { ...item, shipmentStatus: newStatus } : item
//       ));
//       setEditOrderNo(null); // Exit edit mode
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   const handleCancelClick = () => {
//     setEditOrderNo(null); // Exit edit mode without saving
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Pending':
//         return { color: 'orange' };
//       case 'Processing':
//         return { color: 'blue' };
//       case 'Shipped':
//         return { color: 'purple' };
//       case 'Delivered':
//         return { color: 'green' };
//       default:
//         return {};
//     }
//   };

//   return (
//     <div className="sales-dashboard">
//       <h1>Warehouse Management</h1>
//       <table className="sales-table">
//         <thead>
//           <tr>
//             <th>Order Number</th>
//             <th>Product Name</th>
//             <th>Product Price</th>
//             <th>Shipment Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {salesData.map((item) => (
//             <tr key={item.orderNo}>
//               <td>{item.orderNo}</td>
//               <td>{item.productName}</td>
//               <td>{item.productPrice}</td>
//               <td style={getStatusStyle(item.shipmentStatus)}>
//                 {editOrderNo === item.orderNo ? (
//                   <>
//                     <select
//                       value={newStatus}
//                       onChange={(e) => setNewStatus(e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Processing">Processing</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Delivered</option>
//                     </select>
//                     <i
//                       className="fas fa-save"
//                       onClick={() => handleSaveClick(item.orderNo)}
//                       style={{ marginLeft: '10px', cursor: 'pointer', color: 'green' }}
//                     ></i>
//                     <i
//                       className="fas fa-times"
//                       onClick={handleCancelClick}
//                       style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }}
//                     ></i>
//                   </>
//                 ) : (
//                   <>
//                     {item.shipmentStatus}
//                     <i
//                       className="fas fa-edit"
//                       onClick={() => handleEditClick(item.orderNo, item.shipmentStatus)}
//                       style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue' }}
//                     ></i>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalesDashboard;


// SalesDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './SalesDashboard.css';

const SalesDashboard = ({ updateDashboard }) => {
  const [salesData, setSalesData] = useState([]);
  const [editOrderNo, setEditOrderNo] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/warehouse');
        setSalesData(response.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (orderNo, currentStatus) => {
    setEditOrderNo(orderNo);
    setNewStatus(currentStatus);
  };

  const handleSaveClick = async (orderNo) => {
    try {
      // Update the shipment status in the database
      await axios.put(`http://localhost:8080/api/warehouse/${orderNo}`, { shipmentStatus: newStatus });
      
      const previousStatus = salesData.find(item => item.orderNo === orderNo)?.shipmentStatus;
      const updatedSalesData = salesData.map(item => 
        item.orderNo === orderNo ? { ...item, shipmentStatus: newStatus } : item
      );

      setSalesData(updatedSalesData);
      setEditOrderNo(null); // Exit edit mode

      // Update the dashboard counts
      updateDashboard(previousStatus, newStatus);
      
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCancelClick = () => {
    setEditOrderNo(null); // Exit edit mode without saving
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return { color: 'orange' };
      case 'Processing':
        return { color: 'blue' };
      case 'Shipped':
        return { color: 'purple' };
      case 'Delivered':
        return { color: 'green' };
      default:
        return {};
    }
  };

  return (
    <div className="sales-dashboard">
      <h1>Warehouse Management</h1>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Shipment Status</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item) => (
            <tr key={item.orderNo}>
              <td>{item.orderNo}</td>
              <td>{item.productName}</td>
              <td>{item.productPrice}</td>
              <td style={getStatusStyle(item.shipmentStatus)}>
                {editOrderNo === item.orderNo ? (
                  <>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <i
                      className="fas fa-save"
                      onClick={() => handleSaveClick(item.orderNo)}
                      style={{ marginLeft: '10px', cursor: 'pointer', color: 'green' }}
                    ></i>
                    <i
                      className="fas fa-times"
                      onClick={handleCancelClick}
                      style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }}
                    ></i>
                  </>
                ) : (
                  <>
                    {item.shipmentStatus}
                    <i
                      className="fas fa-edit"
                      onClick={() => handleEditClick(item.orderNo, item.shipmentStatus)}
                      style={{ marginLeft: '10px', cursor: 'pointer', color: 'blue' }}
                    ></i>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesDashboard;
