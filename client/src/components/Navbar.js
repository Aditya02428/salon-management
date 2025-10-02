import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <span className="logo-text">BeautySalon</span>
          </Link>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/services" className="nav-link" onClick={closeMenu}>
              Services
            </Link>
            <Link to="/booking" className="nav-link" onClick={closeMenu}>
              Book Now
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-link" onClick={closeMenu}>
                  Dashboard
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="nav-link" onClick={closeMenu}>
                    Admin
                  </Link>
                )}
                <div className="nav-profile">
                  <button 
                    className="profile-btn"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <FaUser />
                    <span>{user?.name}</span>
                  </button>
                  {isProfileOpen && (
                    <div className="profile-dropdown">
                      <Link 
                        to="/profile" 
                        className="dropdown-item"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FaUser /> Profile
                      </Link>
                      <button 
                        className="dropdown-item logout-btn"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="nav-auth">
                <Link to="/login" className="nav-link" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" onClick={closeMenu}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="nav-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
