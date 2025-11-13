import React, { useState } from 'react';
import SalesOrderTable from './SalesOrderTable1';
import { Container, Grid, Paper } from '@mui/material';
import Sidebar from './components/Sidebar1';
import AppBar from './components/AppBar1';
import './SalesOrderTable.css';


const AddSalesOrderPage = () => {
  const [salesOrders, setSalesOrders] = useState([]);

  const addSalesOrder = (order) => {
    setSalesOrders([...salesOrders, order]);
  };

  return (
    <div className="pageContainer" style={{backgroundColor:'#FFF8EE'}}>
      <AppBar />
      <div className="contentContainer">
        <Sidebar />
        <div className="mainContent" style={{marginLeft:'10px'}}>
          <Container className="centeredContent">
            <Grid container spacing={6} direction="column" alignItems="center">
              <Grid item xs={12} className="salesOrderTableGrid">
                <Paper className="paper">
                  <h2>Purchase Items</h2>
                  <SalesOrderTable salesOrders={salesOrders} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AddSalesOrderPage;
