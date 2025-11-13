import React from 'react';
import { Container, Grid, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useCart } from './CartContext'; 
import Sidebar from './components/Sidebar1';
import AppBar from './components/AppBar1';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart(); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#FFF8EE' }}>
      <AppBar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Container style={{ flex: 1, paddingTop: '100px', paddingLeft: '170px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <Typography variant="h4" component="h2" style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
                  Cart
                </Typography>
                <TableContainer>
                  <Table className='carts'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Product SKU</TableCell>
                        <TableCell>Product Price</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.productSKU}</TableCell>
                          <TableCell>{item.productPrice}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>
                            <Button variant="contained" color="secondary" onClick={() => removeFromCart(index)}>
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default CartPage;
