// src/components/drugs/DrugForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import drugService from '../../api/drugService';

const DrugForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    generic_name: '',
    description: '',
    category: '',
    dosage_form: '',
    strength: '',
    manufacturer: '',
    ndc_code: '',
    sku: '',
    batch_number: '',
    expiry_date: '',
    quantity: '',
    stock_level: '',
    reorder_level: '',
    price: '',
    in_stock: true,
    storage_requirements: '',
    side_effects: '',
    contraindications: ''
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchDrug = async () => {
        try {
          setLoading(true);
          const drugData = await drugService.getDrugById(id);

          // Format date for form input
          if (drugData.expiry_date) {
            const date = new Date(drugData.expiry_date);
            drugData.expiry_date = date.toISOString().split('T')[0];
          }

          setFormData(drugData);
          setError(null);
        } catch (err) {
          setError('Failed to load drug data. ' + err.message);
          console.error('Error fetching drug:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchDrug();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === '' ? '' : Number(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setSaving(true);

      if (isEditMode) {
        await drugService.updateDrug(id, formData);
      } else {
        await drugService.createDrug(formData);
      }

      navigate('/drugs');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} drug. ${err.message}`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} drug:`, err);
      setSaving(false);
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

  return (
    <div className="drug-form my-4">
      <Card>
        <Card.Header as="h5">
          {isEditMode ? 'Edit Drug' : 'Add New Drug'}
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Drug Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a drug name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Generic Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="generic_name"
                    value={formData.generic_name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a generic name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a category.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Dosage Form</Form.Label>
                  <Form.Control
                    type="text"
                    name="dosage_form"
                    value={formData.dosage_form}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a dosage form.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Strength</Form.Label>
                  <Form.Control
                    type="text"
                    name="strength"
                    value={formData.strength}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide the strength.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Control
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a manufacturer.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>NDC Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="ndc_code"
                    value={formData.ndc_code}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Batch Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="batch_number"
                    value={formData.batch_number}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="expiry_date"
                    value={formData.expiry_date}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide an expiry date.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleNumberChange}
                    min="0"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid quantity.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Level</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock_level"
                    value={formData.stock_level}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a Stock.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Reorder Level</Form.Label>
                  <Form.Control
                    type="number"
                    name="reorder_level"
                    value={formData.reorder_level}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a Reorder Level.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleNumberChange}
                    min="0"
                    step="0.01"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid price.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="in_stock"
                label="In Stock"
                checked={formData.in_stock}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Storage Requirements</Form.Label>
              <Form.Control
                type="text"
                name="storage_requirements"
                value={formData.storage_requirements}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Side Effects</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="side_effects"
                value={formData.side_effects}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraindications</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="contraindications"
                value={formData.contraindications}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="secondary"
                onClick={() => navigate('/drugs')}
                className="me-2"
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    {isEditMode ? 'Updating...' : 'Saving...'}
                  </>
                ) : (
                  isEditMode ? 'Update Drug' : 'Add Drug'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DrugForm;