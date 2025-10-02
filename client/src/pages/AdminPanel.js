import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaEye, FaCalendarAlt, FaUser, FaDollarSign, FaClock } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import './AdminPanel.css';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'Hair',
    image: ''
  });

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access denied. Admin only.');
      return;
    }
    fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const [bookingsRes, servicesRes] = await Promise.all([
        axios.get('/api/bookings/admin/all'),
        axios.get('/api/services')
      ]);
      setBookings(bookingsRes.data.bookings || []);
      setServices(servicesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingService) {
        await axios.put(`/api/services/${editingService._id}`, serviceForm);
        toast.success('Service updated successfully!');
      } else {
        await axios.post('/api/services', serviceForm);
        toast.success('Service created successfully!');
      }
      
      setShowServiceForm(false);
      setEditingService(null);
      setServiceForm({
        name: '',
        description: '',
        price: '',
        duration: '',
        category: 'Hair',
        image: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      category: service.category,
      image: service.image || ''
    });
    setShowServiceForm(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`/api/services/${serviceId}`);
        toast.success('Service deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Failed to delete service');
      }
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const response = await axios.put(`/api/bookings/${bookingId}/status`, { status });
      toast.success('Booking status updated successfully!');
      fetchData(); // Refresh the data
    } catch (error) {
      console.error('Error updating booking status:', error);
      const message = error.response?.data?.message || 'Failed to update booking status';
      toast.error(message);
    }
  };

  const formatPrice = (price) => `$${price}`;
  const formatDate = (date) => moment(date).format('MMM DD, YYYY');
  const formatTime = (time) => time;

  if (!isAdmin) {
    return (
      <div className="admin-access-denied">
        <h1>Access Denied</h1>
        <p>You need administrator privileges to access this page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-hero">
        <div className="container">
          <h1>Admin Panel</h1>
          <p>Manage services and bookings</p>
        </div>
      </div>

      <div className="container">
        <div className="admin-content">
          {/* Navigation Tabs */}
          <div className="admin-tabs">
            <button
              className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookings')}
            >
              <FaCalendarAlt /> Bookings ({bookings.length})
            </button>
            <button
              className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <FaEdit /> Services ({services.length})
            </button>
          </div>

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>All Bookings</h2>
              </div>
              
              {bookings.length > 0 ? (
                <div className="bookings-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Date & Time</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map(booking => (
                        <tr key={booking._id}>
                          <td>
                            <div className="customer-info">
                              <strong>{booking.user.name}</strong>
                              <span>{booking.user.email}</span>
                            </div>
                          </td>
                          <td>
                            <div className="service-info">
                              <strong>{booking.service.name}</strong>
                              <span>{booking.service.category}</span>
                            </div>
                          </td>
                          <td>
                            <div className="datetime-info">
                              <span>{formatDate(booking.date)}</span>
                              <span>{formatTime(booking.timeSlot)}</span>
                            </div>
                          </td>
                          <td>{formatPrice(booking.totalPrice)}</td>
                          <td>
                            <select
                              value={booking.status}
                              onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                              className={`status-select status-${booking.status}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline"
                              onClick={() => {/* View booking details */}}
                            >
                              <FaEye />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="no-data">
                  <FaCalendarAlt />
                  <h3>No bookings found</h3>
                  <p>There are no bookings to display.</p>
                </div>
              )}
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Services Management</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingService(null);
                    setServiceForm({
                      name: '',
                      description: '',
                      price: '',
                      duration: '',
                      category: 'Hair',
                      image: ''
                    });
                    setShowServiceForm(true);
                  }}
                >
                  <FaPlus /> Add New Service
                </button>
              </div>

              {services.length > 0 ? (
                <div className="services-grid">
                  {services.map(service => (
                    <div key={service._id} className="service-card">
                      <div className="service-header">
                        <h3>{service.name}</h3>
                        <span className="service-category">{service.category}</span>
                      </div>
                      <p className="service-description">{service.description}</p>
                      <div className="service-details">
                        <span className="price">{formatPrice(service.price)}</span>
                        <span className="duration">{service.duration} min</span>
                      </div>
                      <div className="service-actions">
                        <button
                          className="btn btn-outline"
                          onClick={() => handleEditService(service)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="btn btn-outline"
                          onClick={() => handleDeleteService(service._id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <FaEdit />
                  <h3>No services found</h3>
                  <p>Add your first service to get started.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Service Form Modal */}
      {showServiceForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
              <button
                className="modal-close"
                onClick={() => setShowServiceForm(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleServiceSubmit} className="service-form">
              <div className="form-group">
                <label>Service Name</label>
                <input
                  type="text"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                  required
                  rows="3"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input
                    type="number"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                    required
                    min="15"
                    step="15"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})}
                  required
                >
                  <option value="Hair">Hair</option>
                  <option value="Nails">Nails</option>
                  <option value="Skincare">Skincare</option>
                  <option value="Massage">Massage</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Image URL (Optional)</label>
                <input
                  type="url"
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm({...serviceForm, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowServiceForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
