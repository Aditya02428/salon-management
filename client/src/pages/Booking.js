import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt, FaClock, FaUser, FaDollarSign, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import './Booking.css';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    fetchServices();
    
    // Check if service is pre-selected from URL
    const serviceId = searchParams.get('service');
    if (serviceId) {
      setSelectedService(serviceId);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedService && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedService, selectedDate]);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    }
  };

  const fetchAvailableSlots = async () => {
    if (!selectedService) return;
    
    setLoadingSlots(true);
    try {
      const response = await axios.get('/api/bookings/available-slots', {
        params: {
          date: selectedDate.toISOString().split('T')[0],
          serviceId: selectedService
        }
      });
      setAvailableSlots(response.data.availableSlots);
      setSelectedSlot(''); // Reset selected slot
    } catch (error) {
      console.error('Error fetching available slots:', error);
      toast.error('Failed to load available time slots');
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    setSelectedSlot('');
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot('');
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }

    if (!selectedService || !selectedDate || !selectedSlot) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/bookings', {
        serviceId: selectedService,
        date: selectedDate.toISOString().split('T')[0],
        timeSlot: selectedSlot,
        notes: notes
      });

      toast.success('Appointment booked successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error booking appointment:', error);
      const message = error.response?.data?.message || 'Failed to book appointment';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedServiceDetails = () => {
    return services.find(service => service._id === selectedService);
  };

  const formatPrice = (price) => {
    return `$${price}`;
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

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="booking">
      <div className="booking-hero">
        <div className="container">
          <h1>Book Your Appointment</h1>
          <p>Choose your service, date, and time to book your appointment</p>
        </div>
      </div>

      <div className="container">
        <div className="booking-content">
          <div className="booking-form-container">
            <form onSubmit={handleSubmit} className="booking-form">
              {/* Service Selection */}
              <div className="form-section">
                <h3>
                  <FaUser /> Select Service
                </h3>
                <div className="form-group">
                  <select
                    value={selectedService || ''}
                    onChange={handleServiceChange}
                    className="form-input"
                    required
                  >
                    <option value="">Choose a service...</option>
                    {services.map(service => (
                      <option key={service._id} value={service._id}>
                        {service.name} - {formatPrice(service.price)} ({formatDuration(service.duration)})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedService && (
                  <div className="service-summary">
                    {(() => {
                      const service = getSelectedServiceDetails();
                      return service ? (
                        <div className="service-card">
                          <h4>{service.name}</h4>
                          <p>{service.description}</p>
                          <div className="service-details">
                            <span className="price">{formatPrice(service.price)}</span>
                            <span className="duration">{formatDuration(service.duration)}</span>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              {/* Date Selection */}
              <div className="form-section">
                <h3>
                  <FaCalendarAlt /> Select Date
                </h3>
                <div className="form-group">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    filterDate={isDateDisabled}
                    minDate={new Date()}
                    className="form-input"
                    dateFormat="MMMM dd, yyyy"
                    placeholderText="Select a date"
                  />
                </div>
              </div>

              {/* Time Slot Selection */}
              {selectedService && selectedDate && (
                <div className="form-section">
                  <h3>
                    <FaClock /> Select Time
                  </h3>
                  {loadingSlots ? (
                    <div className="loading-slots">
                      <div className="spinner"></div>
                      <p>Loading available time slots...</p>
                    </div>
                  ) : (
                    <div className="time-slots">
                      {availableSlots.length > 0 ? (
                        <div className="slots-grid">
                          {availableSlots.map(slot => (
                            <button
                              key={slot}
                              type="button"
                              className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                              onClick={() => handleSlotSelect(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="no-slots">
                          <p>No available time slots for this date.</p>
                          <p>Please select a different date.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              <div className="form-section">
                <h3>Additional Notes (Optional)</h3>
                <div className="form-group">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="form-textarea"
                    placeholder="Any special requests or notes for your appointment..."
                    rows="3"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary booking-submit"
                  disabled={loading || !selectedService || !selectedDate || !selectedSlot}
                >
                  {loading ? 'Booking...' : 'Book Appointment'}
                </button>
              </div>
            </form>
          </div>

          {/* Booking Summary */}
          {selectedService && selectedDate && selectedSlot && (
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              {(() => {
                const service = getSelectedServiceDetails();
                return service ? (
                  <div className="summary-content">
                    <div className="summary-item">
                      <strong>Service:</strong>
                      <span>{service.name}</span>
                    </div>
                    <div className="summary-item">
                      <strong>Date:</strong>
                      <span>{selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="summary-item">
                      <strong>Time:</strong>
                      <span>{selectedSlot}</span>
                    </div>
                    <div className="summary-item">
                      <strong>Duration:</strong>
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                    <div className="summary-item total">
                      <strong>Total Price:</strong>
                      <span>{formatPrice(service.price)}</span>
                    </div>
                    {notes && (
                      <div className="summary-item">
                        <strong>Notes:</strong>
                        <span>{notes}</span>
                      </div>
                    )}
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
