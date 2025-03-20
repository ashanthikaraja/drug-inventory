import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import orderService from '../../api/orderService';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const data = await orderService.getOrderById(id);
        setOrder(data);
        setError(null);
      } catch (err) {
        setError('Failed to load order details.');
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/orders/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await orderService.deleteOrder(id);
        navigate('/orders');
      } catch (err) {
        setError('Failed to delete order.');
        console.error('Error deleting order:', err);
      }
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
  }

  if (!order) {
    return <Alert severity="warning" sx={{ mt: 4 }}>Order not found.</Alert>;
  }

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <CardHeader
        title={`Order #${order.id}`}
        subheader={
          <Chip
            label={order.status}
            color={order.status === 'Delivered' ? 'success' : 'warning'}
          />
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Supplier:</strong> {order.supplier?.name || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Order Date:</strong>{' '}
              {new Date(order.ordered_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              <strong>Total Amount:</strong> ${order.total_cost?.toFixed(2) || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Delivery Date:</strong>{' '}
              {order.delivery_date
                ? new Date(order.delivery_date).toLocaleDateString()
                : 'Pending'}
            </Typography>
            <Typography variant="body1">
              <strong>Items:</strong>{' '}
              {order.items?.length || 0} (Details not shown here)
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button variant="contained" color="primary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderDetails;