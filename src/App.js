import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Dashboard from './components/Dashboard';
import AppBar1 from './components/AppBar1';
import Items from './Items';
import AddSalesOrderPage from './AddSalesOrderPage';
import InventoryManager from './InventoryManager';
import CartPage from './CartPage';
import ItemGroupsManager from './ItemGroupsManager';
import Sidebar from './components/Sidebar1';
import PackagesDashboard from './PackagesDashboard';
import SalesDashboard from './SalesDashboard';
import './styles.css';
import { AuthProvider } from './AuthContext';

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/signup';
  const isAboutPage = location.pathname === '/about';
  const isFeaturePage = location.pathname === '/features';

  const showAppBarAndSidebar = !isHomePage && !isLoginPage && !isSignUpPage && !isAboutPage && !isFeaturePage;

  return (
    <AuthProvider>
      <CartProvider>
        <div>
          {showAppBarAndSidebar && <AppBar1 />}
          <div style={{ display: 'flex' }}>
            {showAppBarAndSidebar && <Sidebar />}
            <div style={{ flexGrow: 1, padding: '20px', marginLeft: showAppBarAndSidebar ? '232px' : '0', paddingTop: showAppBarAndSidebar ? '60px' : '0' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/appbar" element={<AppBar1 />} />
                <Route path="/inventory/items" element={<Items />} />
                <Route path="/item-groups" element={<ItemGroupsManager  />} />
                <Route path="/add-sales-order" element={<AddSalesOrderPage />} />
                <Route path="/inventory-manager" element={<InventoryManager />} />
                <Route path="/order-management" element={<CartPage />} />
                <Route path="/sales/packages" element={<PackagesDashboard />} />
                <Route path="/sales/orders" element={<SalesDashboard />} />
              </Routes>
            </div>
          </div>
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
