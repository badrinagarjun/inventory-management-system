// import React, { useState } from 'react';
// import axios from 'axios';

// const AddSalesOrder = () => {
//   const [salesOrder, setSalesOrder] = useState({
//     productName: '',
//     productSKU: '',
//     price: '',
//     description: '',
//     groupName: '', 
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSalesOrder(prevOrder => ({
//       ...prevOrder,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8080/api/items', salesOrder);
      
//       window.location.reload();
//     } catch (error) {
//       console.error('Error adding item:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form">
//       <h2>Add New Item</h2>
      
//       <input
//         type="text"
//         name="productName"
//         value={salesOrder.productName}
//         onChange={handleChange}
//         placeholder="Product Name"
//         required
//       />

//       <input
//         type="text"
//         name="productSKU"
//         value={salesOrder.productSKU}
//         onChange={handleChange}
//         placeholder="Product SKU"
//         required
//       />
      
//       <input
//         type="number"
//         name="price"
//         value={salesOrder.price}
//         onChange={handleChange}
//         placeholder="Product Price"
//         required
//       />
      
//       <input
//         type="text"
//         name="description"
//         value={salesOrder.description}
//         onChange={handleChange}
//         placeholder="Description"
//         required
//       />

//       <input
//         type="text"
//         name="groupName"
//         value={salesOrder.groupName}
//         onChange={handleChange}
//         placeholder="Group Name"
//         required
//       />
      
//       <button type="submit">Add Item</button>
//     </form>
//   );
// };

// export default AddSalesOrder;


import React, { useState } from 'react';
import axios from 'axios';

const AddSalesOrder = () => {
  const [salesOrder, setSalesOrder] = useState({
    productName: '',
    productSKU: '',
    price: '',
    description: '',
    groupName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalesOrder(prevOrder => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data for both Items and Warehouse
      const itemData = {
        productName: salesOrder.productName,
        productSKU: parseInt(salesOrder.productSKU, 10),
        price: parseFloat(salesOrder.price),
        description: salesOrder.description,
        groupName: salesOrder.groupName,
      };

      const warehouseData = {
        productName: salesOrder.productName,
        productPrice: salesOrder.price,
        shipmentStatus: "Pending", // Example default status
      };

      // Post data to both endpoints
      await axios.post('http://localhost:8080/api/items', itemData);
      await axios.post('http://localhost:8080/api/warehouse', warehouseData);

      // Notify ItemGroupsManager of the new item
      window.location.reload(); // Ideally use a more sophisticated state management
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add New Item</h2>
      
      <input
        type="text"
        name="productName"
        value={salesOrder.productName}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        type="text"
        name="productSKU"
        value={salesOrder.productSKU}
        onChange={handleChange}
        placeholder="Product SKU"
        required
      />
      <input
        type="number"
        name="price"
        value={salesOrder.price}
        onChange={handleChange}
        placeholder="Product Price"
        required
      />
      <input
        type="text"
        name="description"
        value={salesOrder.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="groupName"
        value={salesOrder.groupName}
        onChange={handleChange}
        placeholder="Group Name"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddSalesOrder;