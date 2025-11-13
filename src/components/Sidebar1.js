import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import SalesIcon from '@mui/icons-material/MonetizationOn';
import OrderIcon from '@mui/icons-material/ShoppingCart';
import WarehouseIcon from '@mui/icons-material/Store';
import BarcodeIcon from '@mui/icons-material/QrCode';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import './Sidebar1.css';
import { useAuth } from '../AuthContext';

const Sidebar = () => {
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const { user } = useAuth();

  const handleInventoryClick = () => {
    setInventoryOpen(!inventoryOpen);
  };

  const handleSalesClick = () => {
    setSalesOpen(!salesOpen);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        height: '80vh',
        top: '10vh',
        '& .MuiDrawer-paper': {
          height: '100vh',
          backgroundColor: '#21263C',
          color: '#faf9f9',
          width: '250px',
        },
      }}
    >
      <div className="sidebar-header">
        MONASH
      </div>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <HomeIcon sx={{ color: '#faf9f9' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={handleInventoryClick}>
          <ListItemIcon>
            <InventoryIcon sx={{ color: '#faf9f9' }} />
          </ListItemIcon>
          <ListItemText primary="Inventory" />
          {inventoryOpen ? <ExpandLess sx={{ color: '#faf9f9' }} /> : <ExpandMore sx={{ color: '#faf9f9' }} />}
        </ListItem>
        <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/inventory/items">
              <ListItemText inset primary="Items" />
            </ListItem>
            <ListItem button component={Link} to="/item-groups">
              <ListItemText inset primary="Item Groups" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleSalesClick}>
          <ListItemIcon>
            <SalesIcon sx={{ color: '#faf9f9' }} />
          </ListItemIcon>
          <ListItemText primary="Sales" />
          {salesOpen ? <ExpandLess sx={{ color: '#faf9f9' }} /> : <ExpandMore sx={{ color: '#faf9f9' }} />}
        </ListItem>
        <Collapse in={salesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/sales/orders">
              <ListItemText inset primary="Sales Orders" />
            </ListItem>
            <ListItem button component={Link} to="/sales/packages">
              <ListItemText inset primary="Packages" />
            </ListItem>
          </List>
        </Collapse>
        {user === 'admin' && ( 
          <ListItem button component={Link} to="/add-sales-order">
            <ListItemIcon>
              <WarehouseIcon sx={{ color: '#faf9f9' }} />
            </ListItemIcon>
            <ListItemText primary="Add Products" />
          </ListItem>
        )}
        <ListItem button component={Link} to="/inventory-manager">
          <ListItemIcon>
            <BarcodeIcon sx={{ color: '#faf9f9' }} />
          </ListItemIcon>
          <ListItemText primary="Barcode" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;