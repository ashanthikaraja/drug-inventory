import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Drugs from './pages/Drugs';
import Orders from './pages/Orders';
import Suppliers from './pages/Suppliers';
import Tracking from './pages/Tracking';
import DrugDetails from './components/drugs/DrugDetails';
import DrugForm from './components/drugs/DrugForm';
import OrderDetails from './components/orders/OrderDetails';
import OrderForm from './components/orders/OrderForm';
import SupplierDetails from './components/suppliers/SupplierDetails';
import SupplierForm from './components/suppliers/SupplierForm';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/drugs" element={<Drugs />} />
            <Route path="/drugs/:id" element={<DrugDetails />} />
            <Route path="/drugs/new" element={<DrugForm />} />
            <Route path="/drugs/:id/edit" element={<DrugForm />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/orders/new" element={<OrderForm />} />
            <Route path="/orders/:id/edit" element={<OrderForm />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/suppliers/:id" element={<SupplierDetails />} />
            <Route path="/suppliers/new" element={<SupplierForm />} />
            <Route path="/suppliers/:id/edit" element={<SupplierForm />} />
            <Route path="/tracking" element={<Tracking />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;