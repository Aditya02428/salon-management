import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaClock, FaDollarSign, FaEye, FaTimes, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/my-bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load your bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.put(`/api/bookings/${bookingId}/cancel`);
        toast.success('Booking cancelled successfully');
        fetchBookings(); // Refresh bookings
      } catch (error) {
        console.error('Error cancelling booking:', error);
        toast.error('Failed to cancel booking');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'completed':
        return '#17a2b8';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FaCheckCircle />;
      case 'pending':
        return <FaClock />;
      case 'completed':
        return <FaCheckCircle />;
      case 'cancelled':
        return <FaTimes />;
      default:
        return <FaClock />;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const formatPrice = (price) => {
    return `$${price}`;
  };

  const formatDate = (date) => {
    return moment(date).format('MMMM DD, YYYY');
  };

  const isUpcoming = (date) => {
    return moment(date).isAfter(moment());
  };

  const canCancel = (booking) => {
    return booking.status === 'pending' || booking.status === 'confirmed';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="container">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Manage your appointments and view your booking history</p>
        </div>
      </div>

      <div className="container">
        <div className="dashboard-content">
          {/* Quick Actions */}
          <div className="quick-actions">
            <Link to="/booking" className="action-card">
              <FaCalendarAlt />
              <h3>Book New Appointment</h3>
              <p>Schedule your next beauty service</p>
            </Link>
            <Link to="/services" className="action-card">
              <FaEye />
              <h3>View Services</h3>
              <p>Explore our range of services</p>
            </Link>
            <Link to="/profile" className="action-card">
              <FaEye />
              <h3>Update Profile</h3>
              <p>Manage your account information</p>
            </Link>
          </div>

          {/* Bookings Section */}
          <div className="bookings-section">
            <div className="section-header">
              <h2>Your Bookings</h2>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({bookings.length})
                </button>
                <button
                  className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending ({bookings.filter(b => b.status === 'pending').length})
                </button>
                <button
                  className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
                  onClick={() => setFilter('confirmed')}
                >
                  Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
                </button>
                <button
                  className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed ({bookings.filter(b => b.status === 'completed').length})
                </button>
              </div>
            </div>

            {filteredBookings.length > 0 ? (
              <div className="bookings-grid">
                {filteredBookings.map(booking => (
                  <div key={booking._id} className="booking-card">
                    <div className="booking-header">
                      <div className="service-info">
                        <h3>{booking.service.name}</h3>
                        <span className="service-category">{booking.service.category}</span>
                      </div>
                      <div 
                        className="booking-status"
                        style={{ color: getStatusColor(booking.status) }}
                      >
                        {getStatusIcon(booking.status)}
                        <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                      </div>
                    </div>

                    <div className="booking-details">
                      <div className="detail-item">
                        <FaCalendarAlt />
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      <div className="detail-item">
                        <FaClock />
                        <span>{booking.timeSlot}</span>
                      </div>
                      <div className="detail-item">
                        <FaDollarSign />
                        <span>{formatPrice(booking.totalPrice)}</span>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="booking-notes">
                        <strong>Notes:</strong>
                        <p>{booking.notes}</p>
                      </div>
                    )}

                    <div className="booking-actions">
                      {canCancel(booking) && isUpcoming(booking.date) && (
                        <button
                          className="btn btn-outline cancel-btn"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel Booking
                        </button>
                      )}
                      <Link 
                        to={`/booking/${booking._id}`} 
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-bookings">
                <FaCalendarAlt />
                <h3>No bookings found</h3>
                <p>
                  {filter === 'all' 
                    ? "You haven't made any bookings yet. Book your first appointment today!"
                    : `No ${filter} bookings found.`
                  }
                </p>
                {filter === 'all' && (
                  <Link to="/booking" className="btn btn-primary">
                    Book Your First Appointment
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
