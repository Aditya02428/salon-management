import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaClock, FaDollarSign, FaUser, FaPhone, FaEnvelope, FaArrowLeft, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import './BookingDetails.css';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      const response = await axios.get(`/api/bookings/${id}`);
      setBooking(response.data);
    } catch (error) {
      console.error('Error fetching booking details:', error);
      toast.error('Failed to load booking details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.put(`/api/bookings/${id}/cancel`);
        toast.success('Booking cancelled successfully');
        fetchBookingDetails(); // Refresh booking details
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
        return '✓';
      case 'pending':
        return '⏳';
      case 'completed':
        return '✅';
      case 'cancelled':
        return '❌';
      default:
        return '⏳';
    }
  };

  const formatPrice = (price) => {
    return `$${price}`;
  };

  const formatDate = (date) => {
    return moment(date).format('dddd, MMMM DD, YYYY');
  };

  const formatTime = (time) => {
    return time;
  };

  const formatDuration = (duration) => {
    if (duration < 60) {
      return `${duration} min`;
    } else {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  };

  const canCancel = (booking) => {
    return booking && (booking.status === 'pending' || booking.status === 'confirmed') && 
           moment(booking.date).isAfter(moment());
  };

  if (loading) {
    return (
      <div className="booking-details-loading">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="booking-details-error">
        <h2>Booking not found</h2>
        <p>The booking you're looking for doesn't exist or you don't have permission to view it.</p>
        <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
          <FaArrowLeft /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="booking-details">
      <div className="booking-details-header">
        <div className="container">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="back-btn"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1>Booking Details</h1>
        </div>
      </div>

      <div className="container">
        <div className="booking-details-content">
          {/* Booking Status */}
          <div className="status-section">
            <div 
              className="status-badge"
              style={{ backgroundColor: getStatusColor(booking.status) }}
            >
              <span className="status-icon">{getStatusIcon(booking.status)}</span>
              <span className="status-text">
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="details-grid">
            {/* Service Information */}
            <div className="detail-card">
              <h3>Service Information</h3>
              <div className="service-info">
                <div className="service-image">
                  {booking.service.image ? (
                    <img src={booking.service.image} alt={booking.service.name} />
                  ) : (
                    <div className="service-placeholder">
                      <span>{booking.service.category}</span>
                    </div>
                  )}
                </div>
                <div className="service-details">
                  <h4>{booking.service.name}</h4>
                  <p className="service-category">{booking.service.category}</p>
                  <p className="service-description">{booking.service.description}</p>
                  <div className="service-meta">
                    <span className="price">{formatPrice(booking.service.price)}</span>
                    <span className="duration">{formatDuration(booking.service.duration)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="detail-card">
              <h3>Appointment Details</h3>
              <div className="appointment-info">
                <div className="info-item">
                  <FaCalendarAlt />
                  <div>
                    <strong>Date</strong>
                    <span>{formatDate(booking.date)}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaClock />
                  <div>
                    <strong>Time</strong>
                    <span>{formatTime(booking.timeSlot)}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaDollarSign />
                  <div>
                    <strong>Total Price</strong>
                    <span>{formatPrice(booking.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information (Admin only) */}
            {isAdmin && (
              <div className="detail-card">
                <h3>Customer Information</h3>
                <div className="customer-info">
                  <div className="info-item">
                    <FaUser />
                    <div>
                      <strong>Name</strong>
                      <span>{booking.user.name}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaEnvelope />
                    <div>
                      <strong>Email</strong>
                      <span>{booking.user.email}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <FaPhone />
                    <div>
                      <strong>Phone</strong>
                      <span>{booking.user.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes */}
            {booking.notes && (
              <div className="detail-card">
                <h3>Special Notes</h3>
                <div className="notes-content">
                  <p>{booking.notes}</p>
                </div>
              </div>
            )}

            {/* Booking Actions */}
            <div className="detail-card actions-card">
              <h3>Actions</h3>
              <div className="booking-actions">
                {canCancel(booking) && (
                  <button
                    className="btn btn-outline cancel-btn"
                    onClick={handleCancelBooking}
                  >
                    <FaTimes /> Cancel Booking
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/booking')}
                >
                  Book Another Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
