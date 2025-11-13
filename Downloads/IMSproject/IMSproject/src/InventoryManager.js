import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import GenBarcode from './GenBarcode';
import Sidebar from './components/Sidebar1';
import AppBar from './components/AppBar1'; 

const InventoryManager = () => {
  const [inventory] = useState({
    '5': { productName: 'Puma sneaker', productSKU: '5', productPrice: '6000', description: 'For Male' },
    '60': { productName: 'Himalaya', productSKU: '60', productPrice: '150', description: 'Body soap' },
    '200': { productName: 'Jockey vest', productSKU: '200', productPrice: '200', description: 'All size' },
    '15': { productName: 'MI PowerBank', productSKU: '15', productPrice: '2250', description: '20000mah' },
    '75000': { productName: 'Pixel 6a', productSKU: '75000', productPrice: '75000', description: '18gb ram, 128gb rom, marble black.' }
  });

  const [scannedItem, setScannedItem] = useState(null);

  const handleScan = (barcode) => {
    const item = Object.values(inventory).find(product => `${product.productName}-${product.productSKU}` === barcode);
    if (item) {
      setScannedItem(item);
    } else {
      setScannedItem(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar /> 
        <Container style={{ flex: 1, paddingTop: '100px', paddingLeft: '170px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <Typography variant="h4" component="h2" style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
                  Inventory Manager
                </Typography>
                <input
                  type="text"
                  placeholder="Scan Barcode"
                  onChange={(e) => handleScan(e.target.value)}
                  style={{ margin: '20px 0', padding: '10px', fontSize: '16px' }}
                />
                {scannedItem && (
                  <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6" component="h3">
                      Product Name: {scannedItem.productName}
                    </Typography>
                    <Typography variant="body1">
                      SKU: {scannedItem.productSKU}
                    </Typography>
                    <Typography variant="body1">
                      Price: {scannedItem.productPrice}
                    </Typography>
                    <Typography variant="body1">
                      Description: {scannedItem.description}
                    </Typography>
                  </div>
                )}
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Barcode</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.values(inventory).map((item) => (
                        <TableRow key={item.productSKU}>
                          <TableCell>
                            <GenBarcode value={`${item.productName}-${item.productSKU}`} />
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

export default InventoryManager;
