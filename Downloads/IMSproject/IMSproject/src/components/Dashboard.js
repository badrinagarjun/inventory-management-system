import React, { useState, useEffect } from 'react';
import Sidebar1 from './Sidebar1';
import AppBar1 from './AppBar1';
import Footer from './Footer1';
import { Box, Container, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
// import SalesDashboard from '../SalesDashboard';
import axios from 'axios';
import './Dashboard.css';

const COLORS = ['#233C78', '#7f7f7f', '#FFBB28'];

const Dashboard = () => {
  const [lowStockItems, setLowStockItems] = useState(0);
  const [allItems, setAllItems] = useState(123); // This should be fetched from your backend as well if needed
  const [packed, setPacked] = useState(0);
  const [shipped, setShipped] = useState(0);
  const [delivered, setDelivered] = useState(0);

  // Fetch initial shipment status counts and low stock items count
  useEffect(() => {
    const fetchInitialCounts = async () => {
      try {
        // Fetch shipment status counts
        const response = await axios.get('http://localhost:8080/api/warehouse');
        const data = response.data;

        const initialPacked = data.filter(item => item.shipmentStatus === 'Processing').length;
        const initialShipped = data.filter(item => item.shipmentStatus === 'Shipped').length;
        const initialDelivered = data.filter(item => item.shipmentStatus === 'Delivered').length;

        setPacked(initialPacked);
        setShipped(initialShipped);
        setDelivered(initialDelivered);

        // Fetch low stock items count
        const lowStockResponse = await axios.get('http://localhost:8080/api/items/low-stock-count');
        setLowStockItems(lowStockResponse.data);
      } catch (error) {
        console.error('Error fetching shipment status counts or low stock items:', error);
      }
    };

    fetchInitialCounts();
  }, []);

  const updateDashboard = (previousStatus, newStatus) => {
    // Decrement counts based on the previous status
    if (previousStatus === 'Processing') {
      setPacked(prev => prev - 1);
    } else if (previousStatus === 'Shipped') {
      setShipped(prev => prev - 1);
    } else if (previousStatus === 'Delivered') {
      setDelivered(prev => prev - 1);
    }

    // Increment counts based on the new status
    if (newStatus === 'Processing') {
      setPacked(prev => prev + 1);
    } else if (newStatus === 'Shipped') {
      setShipped(prev => prev + 1);
    } else if (newStatus === 'Delivered') {
      setDelivered(prev => prev + 1);
    }
  };

  // Data for the PieChart reflecting the actual shipment status counts
  const data = [
    { name: 'To be Packed', value: packed },
    { name: 'To be Shipped', value: shipped },
    { name: 'To be Delivered', value: delivered },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFF8EE' }}>
      <Sidebar1 />
      <Box sx={{ flexGrow: 1, padding: '16px' }}>
        <AppBar1 />
        <Container>
          <h1 className="dashboard-title">Dashboard</h1>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className="dashboard-paper sales-activity-paper">
                <h2>Sales Activity</h2>
                <Grid container spacing={0.6}>
                  <Grid item xs={12} md={4}>
                    <Paper className="metric-box">
                      <p style={{ fontSize: '25px', color: 'red' }}>
                        <span>{packed}</span>
                      </p>
                      <span>Qty</span><br />
                      <span>TO BE PACKED</span>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper className="metric-box">
                      <p style={{ fontSize: '25px', color: 'red' }}>
                        <span>{shipped}</span>
                      </p>
                      <span>Pkgs</span><br />
                      <span>TO BE SHIPPED</span>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper className="metric-box">
                      <p style={{ fontSize: '25px', color: 'red' }}>
                        <span>{delivered}</span>
                      </p>
                      <span>Pkgs</span><br />
                      <span>TO BE DELIVERED</span>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className="dashboard-paper">
                <h2>Product Details</h2>
                <Grid container spacing={0.6}>
                  <Grid item xs={12}>
                    <Paper className="metric-box1">
                      <p style={{ fontSize: '25px', color: 'red' }}>
                        Low Stock Items: <span style={{ marginLeft: '20px' }}>{lowStockItems}</span>
                      </p>
                      <p style={{ fontSize: '25px' }}>
                        All Items: <span style={{ marginLeft: '20px' }}>{allItems}</span>
                      </p>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className="dashboard-paper1">
                <h2>Activity Overview</h2>
                <PieChart width={400} height={400}>
                  <Pie
                    data={data}
                    cx={200}
                    cy={160}
                    labelLine={false}
                    outerRadius={150}
                    fill="#233C78"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        {/* <SalesDashboard updateDashboard={updateDashboard} /> */}
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;
