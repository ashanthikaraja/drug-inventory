import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import LoginForm from '../components/auth/LoginForm';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <Container component="main" sx={{ mt: 25, mb: 25, flex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Drug Inventory Management
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Track your pharmaceutical inventory and supply chain in real-time.
          </Typography>
          
          {!showLogin ? (
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => setShowLogin(true)}
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
          ) : (
            <LoginForm />
          )}
        </Box>
        
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;