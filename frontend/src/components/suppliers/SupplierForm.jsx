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
  CircularProgress,
  Alert,
} from '@mui/material';
import supplierService from '../../api/supplierService';

const SupplierForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact_number: '',
    email: '',
    location: '',
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchSupplier = async () => {
        try {
          setLoading(true);
          const data = await supplierService.getSupplierById(id);
          setFormData({
            name: data.name,
            contact_number: data.phone || '',
            email: data.email || '',
            location: data.address || '',
          });
        } catch (err) {
          setError('Failed to load supplier data.');
          console.error('Error fetching supplier:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchSupplier();
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
        const newForm = {
          name: formData.name,
          phone: formData.contact_number,
          email: formData.email,
          address: formData.location
        }
        await supplierService.updateSupplier(id, newForm);
      } else {
        await supplierService.createSupplier(formData);
      }
      navigate('/suppliers');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} supplier.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} supplier:`, err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 15 }}>
      <CardHeader title={isEditMode ? 'Edit Supplier' : 'New Supplier'} />
      <CardContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button onClick={() => navigate('/suppliers')} disabled={saving}>
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

export default SupplierForm;