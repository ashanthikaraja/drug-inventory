// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem, Avatar, Tooltip, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleNotificationMenuOpen = (event) => setNotificationAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleNotificationMenuClose = () => setNotificationAnchorEl(null);
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1976d2' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          PharmTrack Pro
        </Typography>
        <Box>
          <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Tooltip title="Account">
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <Avatar sx={{ bgcolor: '#fff', color: '#1976d2' }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
      >
        <MenuItem>Low stock alert: Paracetamol</MenuItem>
        <MenuItem>Order #1252 delivered</MenuItem>
        <MenuItem>Low stock alert: Sinarest</MenuItem>
        <MenuItem>Order #4563 pending</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;