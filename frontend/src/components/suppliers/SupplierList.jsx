import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Box,
  Typography,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import supplierService from '../../api/supplierService';

const SupplierList = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSuppliers();
  }, [page, rowsPerPage]);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const data = await supplierService.getAllSuppliers({
        page: page + 1,
        page_size: rowsPerPage,
      });
      setSuppliers(data.results || data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchQuery) {
      try {
        setLoading(true);
        const data = await supplierService.getAllSuppliers({ search: searchQuery });
        setSuppliers(data.results || data);
        setLoading(false);
      } catch (err) {
        console.error('Error searching suppliers:', err);
        setLoading(false);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden', p: 12 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Suppliers</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/suppliers/new')}
        >
          New Supplier
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Search suppliers by name or contact..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {loading && <LinearProgress sx={{ mt: 2 }} />}

      <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)', mt: 2 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log(suppliers)}
            {suppliers.map((supplier) => (
              
              <TableRow hover key={supplier.id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.phone || 'N/A'}</TableCell>
                <TableCell>{supplier.email || 'N/A'}</TableCell>
                <TableCell>{supplier.address || 'N/A'}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View Details">
                    <IconButton size="small" onClick={() => navigate(`/suppliers/${supplier.id}`)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => navigate(`/suppliers/${supplier.id}/edit`)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={100} // Replace with actual total from API
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default SupplierList;