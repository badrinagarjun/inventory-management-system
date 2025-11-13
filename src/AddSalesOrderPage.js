import React, { useState } from 'react';
import AddSalesOrder from './AddSalesOrder';
import SalesOrderTable from './SalesOrderTable';
import { Container, Grid, Paper } from '@mui/material';
import './AddSalesOrderPage.css';
import Sidebar from './components/Sidebar1';
import AppBar from './components/AppBar1';

const AddSalesOrderPage = () => {
  const [salesOrders, setSalesOrders] = useState([]);

  const addSalesOrder = (order) => {
    setSalesOrders([...salesOrders, order]);
  };

  return (
    <div className="pageContainer">
      <AppBar />
      <div className="contentContainer">
        <Sidebar />
        <div className="mainContent">
          <Container className="centeredContent">
            <Grid container spacing={6} direction="column" alignItems="center">
              <Grid item xs={12} className="addSalesOrderGrid">
                <Paper className="paper">
                  <AddSalesOrder addSalesOrder={addSalesOrder} />
                </Paper>
              </Grid>
              <Grid item xs={12} className="salesOrderTableGrid">
                <Paper className="paper">
                  <h2>Sales Order Table</h2>
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
