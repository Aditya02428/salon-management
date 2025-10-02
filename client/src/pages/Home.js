import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaStar, FaUsers, FaClock, FaArrowRight } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: <FaCalendarAlt />,
      title: 'Easy Booking',
      description: 'Book your appointment online in just a few clicks'
    },
    {
      icon: <FaStar />,
      title: 'Expert Stylists',
      description: 'Professional stylists with years of experience'
    },
    {
      icon: <FaUsers />,
      title: 'Customer Satisfaction',
      description: 'Over 1000+ satisfied customers'
    },
    {
      icon: <FaClock />,
      title: 'Flexible Timing',
      description: 'Choose from multiple time slots that fit your schedule'
    }
  ];

  const services = [
    {
      name: 'Hair Styling',
      price: '$50',
      duration: '60 min',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400'
    },
    {
      name: 'Hair Coloring',
      price: '$80',
      duration: '90 min',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400'
    },
    {
      name: 'Manicure',
      price: '$35',
      duration: '45 min',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'
    },
    {
      name: 'Facial Treatment',
      price: '$70',
      duration: '75 min',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to BeautySalon</h1>
            <p>Transform your look with our professional beauty services. Book your appointment today and experience the luxury you deserve.</p>
            <div className="hero-buttons">
              <Link to="/booking" className="btn btn-primary hero-btn">
                Book Now <FaArrowRight />
              </Link>
              <Link to="/services" className="btn btn-outline hero-btn">
                View Services
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600" alt="Salon Interior" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <h2 className="section-title">Our Popular Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-image">
                  <img src={service.image} alt={service.name} />
                  <div className="service-overlay">
                    <span className="service-price">{service.price}</span>
                    <span className="service-duration">{service.duration}</span>
                  </div>
                </div>
                <div className="service-content">
                  <h3>{service.name}</h3>
                  <Link to="/services" className="service-link">
                    Learn More <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Look?</h2>
            <p>Book your appointment today and experience our premium beauty services</p>
            <Link to="/booking" className="btn btn-primary cta-btn">
              Book Your Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Amazing service! The staff is professional and friendly. I always leave feeling beautiful and confident."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100" alt="Sarah Johnson" />
                <div>
                  <h4>Sarah Johnson</h4>
                  <span>Regular Customer</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The best salon in town! Clean, modern, and the stylists are incredibly talented. Highly recommended!"</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Mike Chen" />
                <div>
                  <h4>Mike Chen</h4>
                  <span>Regular Customer</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Love the online booking system! So convenient and the service quality is outstanding every time."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" alt="Emily Davis" />
                <div>
                  <h4>Emily Davis</h4>
                  <span>Regular Customer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
