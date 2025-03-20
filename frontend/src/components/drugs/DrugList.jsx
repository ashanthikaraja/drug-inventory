// src/components/drugs/DrugList.jsx
import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, Chip, TextField, Button, Box, Typography, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import drugService from '../../api/drugService';

const DrugList = () => {
  const navigate = useNavigate();
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [drugToDelete, setDrugToDelete] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchDrugs();
  }, [page, rowsPerPage]);

  const fetchDrugs = async () => {
    try {
      setLoading(true);
      const data = await drugService.getAllDrugs({ page: page + 1, page_size: rowsPerPage });
      setDrugs(data.results);
      setTotal(data.count);
      setError(null);
    } catch (err) {
      setError('Failed to fetch drugs.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      try {
        setLoading(true);
        const data = await drugService.getAllDrugs({ search: searchQuery });
        setDrugs(data.results);
        setTotal(data.count);
        setError(null);
      } catch (err) {
        setError('Failed to search drugs.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (drug) => {
    setDrugToDelete(drug);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await drugService.deleteDrug(drugToDelete.id);
      setDrugs(drugs.filter((d) => d.id !== drugToDelete.id));
      setDeleteDialogOpen(false);
      setDrugToDelete(null);
    } catch (err) {
      setError('Failed to delete drug.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 1, mt: 9 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Drug Inventory</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/drugs/new')}>
          Add Drug
        </Button>
      </Box>
      <TextField
        fullWidth
        placeholder="Search drugs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleSearch}
        InputProps={{ startAdornment: <SearchIcon /> }}
        sx={{ mb: 2 }}
      />
      {loading && <LinearProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drugs.map((drug) => (
              <TableRow key={drug.id}>
                <TableCell>{drug.name}</TableCell>
                <TableCell>{drug.category}</TableCell>
                <TableCell>{drug.quantity}</TableCell>
                <TableCell>₹{drug.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip label={drug.in_stock ? 'In Stock' : 'Out of Stock'} color={drug.in_stock ? 'success' : 'error'} />
                </TableCell>
                <TableCell>
                  <Tooltip title="View"><IconButton onClick={() => navigate(`/drugs/${drug.id}`)}><VisibilityIcon /></IconButton></Tooltip>
                  <Tooltip title="Edit"><IconButton onClick={() => navigate(`/drugs/${drug.id}/edit`)}><EditIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton onClick={() => handleDeleteClick(drug)}><DeleteIcon /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete {drugToDelete?.name}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DrugList;