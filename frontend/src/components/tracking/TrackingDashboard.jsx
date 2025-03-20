import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import orderService from '../../api/orderService';
import SupplyChainMap from './SupplyChainMap';

const TrackingDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        setLoading(true);
        const data = await orderService.getAllOrders({ status: 'Shipped' });
        setOrders(data.results || data);
      } catch (err) {
        console.error('Error fetching tracking data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrackingData();
  }, []);

  return (
    <Box sx={{ p: 12 }}>
      <Typography variant="h5" gutterBottom>
        Supply Chain Tracking Dashboard
      </Typography>
      {loading && <LinearProgress sx={{ mb: 2 }} />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Active Shipments
            </Typography>
            {orders.length > 0 ? (
              orders.map((order) => (
                <Card key={order.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">
                      Order #{order.id} - {order.supplier?.name || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      Status: {order.status}
                    </Typography>
                    <Typography variant="body2">
                      Tracking Number: {order.tracking_number || 'N/A'}
                    </Typography>
                    <Typography variant="body2">
                      Delivery Date:{' '}
                      {order.delivery_date
                        ? new Date(order.delivery_date).toLocaleDateString()
                        : 'Pending'}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1">No active shipments found.</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, height: '500px' }}>
            <Typography variant="h6" gutterBottom>
              Supply Chain Map
            </Typography>
            <Box sx={{ height: 'calc(100% - 32px)' }}>
              <SupplyChainMap orders={orders} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TrackingDashboard;