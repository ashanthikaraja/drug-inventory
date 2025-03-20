import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Alert,
} from '@mui/material';
import orderService from '../../api/orderService';

const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    drug: '',
    supplier: '',
    quantity_ordered: '',
    ordered_at: '',
    delivery_date: '',
    total_cost: '',
    tracking_number: '',
    status: '',
    items: [],
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchOrder = async () => {
        try {
          setLoading(true);
          const data = await orderService.getOrderById(id);
          setFormData({
            drug: data.drug?.id || '',
            supplier: data.supplier?.id || '',
            quantity_ordered: data.quantity_ordered || 0,
            tracking_number: data.tracking_number || '',
            ordered_at: data.ordered_at.split('T')[0],
            delivery_date: data.delivery_date?.split('T')[0] || '',
            total_cost: data.total_cost || 0,
            status: data.status,
            items: data.items || [],
          });
        } catch (err) {
          setError('Failed to load order data.');
          console.error('Error fetching order:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (isEditMode) {
        await orderService.updateOrder(id, formData);
      } else {
        await orderService.createOrder(formData);
      }
      navigate('/orders');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} order.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} order:`, err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 12 }}>
      <CardHeader title={isEditMode ? 'Edit Order' : 'New Order'} />
      <CardContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit} method="POST">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Drug ID"
                name="drug"
                value={formData.drug}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Supplier ID"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                type="number"
                name="quantity_ordered"
                value={formData.quantity_ordered}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Order Date"
                type="date"
                name="ordered_at"
                value={formData.ordered_at}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Delivery Date"
                type="date"
                name="delivery_date"
                value={formData.delivery_date}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Amount (₹)"
                type="number"
                name="total_cost"
                value={formData.total_cost}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ step: '0.01' }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Tracking Number"
                name="tracking_number"
                value={formData.tracking_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                select
                SelectProps={{ native: true }}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </TextField>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button onClick={() => navigate('/orders')} disabled={saving}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? 'Saving...' : isEditMode ? 'Update' : 'Create'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderForm;