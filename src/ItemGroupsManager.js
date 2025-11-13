import React, { useState, useEffect } from 'react';
import { IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import './ItemGroupsManager.css';
import { useAuth } from './AuthContext';

const ItemGroupsManager = () => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [groups, setGroups] = useState({});
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [editValues, setEditValues] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/items');
        const items = response.data;

        const groupedItems = items.reduce((acc, item) => {
          if (!acc[item.groupName]) {
            acc[item.groupName] = [];
          }
          acc[item.groupName].push(item);
          return acc;
        }, {});

        setGroups(groupedItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const toggleGroup = (groupName) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const deleteGroup = async (groupName) => {
    const confirmDelete = window.confirm("You have to delete this group and all the items in it. Are you sure?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/items/by-group?groupName=${groupName}`);
        const updatedGroups = { ...groups };
        delete updatedGroups[groupName];
        setGroups(updatedGroups);
      } catch (error) {
        console.error('Error deleting group:', error);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveClick = async (groupName, itemIndex) => {
    const updatedGroups = { ...groups };
    updatedGroups[groupName][itemIndex] = editValues;
    setGroups(updatedGroups);
    setEditItemIndex(null);

    try {
      await axios.put(`http://localhost:8080/api/items/${editValues.id}`, editValues);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (groupName, itemIndex) => {
    const item = groups[groupName][itemIndex];
    try {
      await axios.delete(`http://localhost:8080/api/items/${item.id}`);
      const updatedGroups = { ...groups };
      updatedGroups[groupName] = updatedGroups[groupName].filter((_, index) => index !== itemIndex);
      setGroups(updatedGroups);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="item-groups-manager">
      <h1>Item Groups Manager</h1>
      <ul>
        {Object.keys(groups).map((groupName, index) => (
          <li key={index} className="group-container">
            <div className="group-header">
              <div className="group-name" onClick={() => toggleGroup(groupName)}>
                {groupName}
              </div>
              {user === 'admin' && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteGroup(groupName)}
                  className="delete-button"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
            {expandedGroups[groupName] && (
              <ul className="group-items">
                {groups[groupName].length > 0 ? (
                  groups[groupName].map((item, itemIndex) => (
                    <li key={itemIndex} className="group-item">
                      {editItemIndex && editItemIndex.groupName === groupName && editItemIndex.itemIndex === itemIndex ? (
                        <div className="item-details">
                          <TextField
                            label="Product Name"
                            value={editValues.productName}
                            onChange={(e) => handleInputChange('productName', e.target.value)}
                          />
                          <TextField
                            label="Product SKU"
                            value={editValues.productSKU}
                            onChange={(e) => handleInputChange('productSKU', e.target.value)}
                          />
                          <TextField
                            label="Product Price"
                            value={editValues.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                          />
                          <TextField
                            label="Description"
                            value={editValues.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                          />
                          <IconButton onClick={() => handleSaveClick(groupName, itemIndex)}>
                            <SaveIcon />
                          </IconButton>
                        </div>
                      ) : (
                        <div className="item-details">
                          <span>{item.productName} - {item.productSKU} - {item.price} - {item.description}</span>
                          {user === 'admin' && (
                            <div className="icon-container">
                              <IconButton
                                size="small"
                                onClick={() => deleteItem(groupName, itemIndex)}
                                className="delete-button"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))
                ) : (
                  <li>No items available</li>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemGroupsManager;
