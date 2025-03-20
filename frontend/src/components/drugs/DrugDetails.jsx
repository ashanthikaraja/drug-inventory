// src/components/drugs/DrugDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import drugService from '../../api/drugService'; // Import the default export
import { Card, Button, Badge, Row, Col, Spinner, Alert } from 'react-bootstrap';

const DrugDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drug, setDrug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        setLoading(true);
        const data = await drugService.getDrugById(id);
        setDrug(data);
        setError(null);
      } catch (err) {
        setError('Failed to load drug details. ' + err.message);
        console.error('Error fetching drug details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/drugs/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this drug?')) {
      try {
        await drugService.deleteDrug(id);
        navigate('/drugs');
      } catch (err) {
        setError('Failed to delete drug. ' + err.message);
        console.error('Error deleting drug:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!drug) {
    return <Alert variant="warning">Drug not found.</Alert>;
  }

  return (
    <div className="drug-details my-4">
      <Card>
        <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
          {drug.name}
          <Badge bg={drug.in_stock ? "success" : "danger"}>
            {drug.in_stock ? "In Stock" : "Out of Stock"}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Generic Name:</strong> {drug.generic_name}</p>
              <p><strong>Category:</strong> {drug.category}</p>
              <p><strong>Dosage Form:</strong> {drug.dosage_form}</p>
              <p><strong>Strength:</strong> {drug.strength}</p>
              <p><strong>Manufacturer:</strong> {drug.manufacturer}</p>
            </Col>
            <Col md={6}>
              <p><strong>NDC Code:</strong> {drug.ndc_code}</p>
              <p><strong>Current Stock:</strong> {drug.quantity} {drug.unit}</p>
              <p><strong>Batch Number:</strong> {drug.batch_number}</p>
              <p><strong>Expiry Date:</strong> {new Date(drug.expiry_date).toLocaleDateString()}</p>
              <p><strong>Storage Requirements:</strong> {drug.storage_requirements}</p>
              <p><strong>Price:</strong> ₹{drug.price.toFixed(2)}</p>
            </Col>
          </Row>
          <div className="mt-3">
            <h6>Description:</h6>
            <p>{drug.description}</p>
          </div>
          <div className="mt-3">
            <h6>Side Effects:</h6>
            <p>{drug.side_effects || "Not specified"}</p>
          </div>
          <div className="mt-3">
            <h6>Contraindications:</h6>
            <p>{drug.contraindications || "Not specified"}</p>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="primary" onClick={handleEdit} className="me-2">
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          <small>Last updated: {new Date(drug.updated_at).toLocaleString()}</small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default DrugDetails;