import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import supplierService from '../../api/supplierService';

const SupplierDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupplierDetails = async () => {
      try {
        setLoading(true);
        const data = await supplierService.getSupplierById(id);
        setSupplier(data);
        setError(null);
      } catch (err) {
        setError('Failed to load supplier details.');
        console.error('Error fetching supplier details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSupplierDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/suppliers/${id}/edit`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await supplierService.deleteSupplier(id);
        navigate('/suppliers');
      } catch (err) {
        setError('Failed to delete supplier.');
        console.error('Error deleting supplier:', err);
      }
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }

  if (error) {
    return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
  }

  if (!supplier) {
    return <Alert severity="warning" sx={{ mt: 4 }}>Supplier not found.</Alert>;
  }

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <CardHeader title={supplier.name} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Contact:</strong> {supplier.contact_number || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {supplier.email || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Location:</strong> {supplier.location || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Performance Rating:</strong>{' '}
              {supplier.performance_rating || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Drugs Supplied:</strong>{' '}
              {supplier.drugs_supplied?.length || 0}
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

export default SupplierDetails;