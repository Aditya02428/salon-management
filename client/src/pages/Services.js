import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaDollarSign, FaArrowRight, FaFilter } from 'react-icons/fa';
import axios from 'axios';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredServices, setFilteredServices] = useState([]);

  const categories = ['All', 'Hair', 'Nails', 'Skincare', 'Massage', 'Makeup', 'Other'];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, selectedCategory]);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    if (selectedCategory === 'All') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.category === selectedCategory));
    }
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

  if (loading) {
    return (
      <div className="services-loading">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="services">
      <div className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Discover our range of professional beauty services designed to make you look and feel your best.</p>
        </div>
      </div>

      <div className="container">
        <div className="services-content">
          {/* Filter Section */}
          <div className="services-filter">
            <h3>
              <FaFilter /> Filter by Category
            </h3>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <div key={service._id} className="service-card">
                  <div className="service-image">
                    {service.image ? (
                      <img src={service.image} alt={service.name} />
                    ) : (
                      <div className="service-placeholder">
                        <span>{service.category}</span>
                      </div>
                    )}
                    <div className="service-badge">
                      {service.category}
                    </div>
                  </div>
                  
                  <div className="service-content">
                    <h3>{service.name}</h3>
                    <p className="service-description">{service.description}</p>
                    
                    <div className="service-details">
                      <div className="service-detail">
                        <FaDollarSign />
                        <span>{formatPrice(service.price)}</span>
                      </div>
                      <div className="service-detail">
                        <FaClock />
                        <span>{formatDuration(service.duration)}</span>
                      </div>
                    </div>
                    
                    <div className="service-actions">
                      <Link 
                        to={`/booking?service=${service._id}`} 
                        className="btn btn-primary service-book-btn"
                      >
                        Book Now <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-services">
                <h3>No services found</h3>
                <p>Try selecting a different category or check back later.</p>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="services-cta">
            <h2>Ready to Book?</h2>
            <p>Choose your preferred service and book your appointment today!</p>
            <Link to="/booking" className="btn btn-primary">
              Book Your Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
