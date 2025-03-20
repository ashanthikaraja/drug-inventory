// src/components/common/Sidebar.jsx
import React from 'react';
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider, Typography, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ open, toggleSidebar }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Drugs', icon: <MedicationIcon />, path: '/drugs' },
    { text: 'Orders', icon: <LocalShippingIcon />, path: '/orders' },
    { text: 'Suppliers', icon: <BusinessIcon />, path: '/suppliers' },
    { text: 'Tracking', icon: <MapIcon />, path: '/tracking' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    if (open && window.innerWidth < theme.breakpoints.values.sm) toggleSidebar();
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#f4f6f8',
          transition: theme.transitions.create('width'),
        },
      }}
    >
      <Box sx={{ p: 2, bgcolor: '#1976d2', color: 'white', textAlign: 'center' }}>
        <Typography variant="h6">PharmTrack Pro</Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
              sx={{
                '&.Mui-selected': { bgcolor: '#e3f2fd', color: '#1976d2' },
                '&:hover': { bgcolor: '#eceff1' },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#1976d2' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;