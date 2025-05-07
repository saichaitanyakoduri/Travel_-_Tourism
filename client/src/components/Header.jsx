import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import '../styles/header.css';

const Header = () => {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isActive = (path) => {
    return location === path;
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo-container">
          <div className="logo-icon">
            <i className="fas fa-globe-americas"></i>
          </div>
          <div>
            <h1 className="logo-text">TravelEase</h1>
            <p className="logo-subtext">Your Ultimate Travel Companion</p>
          </div>
        </div>
        
        <nav className="nav-desktop">
          <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link href="/hotels" className={`nav-link ${isActive('/hotels') ? 'active' : ''}`}>Hotels</Link>
          <Link href="/flights" className={`nav-link ${isActive('/flights') ? 'active' : ''}`}>Flights</Link>
          <Link href="/buses" className={`nav-link ${isActive('/buses') ? 'active' : ''}`}>Buses</Link>
          <Link href="/trains" className={`nav-link ${isActive('/trains') ? 'active' : ''}`}>Trains</Link>
          <Link href="/deals" className={`nav-link ${isActive('/deals') ? 'active' : ''}`}>Deals</Link>
        </nav>
        
        <div className="auth-buttons">
          {user ? (
            <div className="user-profile">
              <button className="user-button" onClick={toggleDropdown}>
                <div className="user-avatar">
                  {user.firstName.charAt(0)}
                </div>
                <span className="user-name">{user.firstName}</span>
                <i className="fas fa-chevron-down dropdown-icon"></i>
              </button>
              
              <div className={`dropdown-menu ${dropdownOpen ? '' : 'hidden'}`}>
                <Link href="/profile" className="dropdown-item">My Profile</Link>
                <Link href="/profile/bookings" className="dropdown-item">My Bookings</Link>
                <Link href="/profile/settings" className="dropdown-item">Settings</Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/auth" className="login-btn">Login</Link>
              <Link href="/auth" className="signup-btn">Sign Up</Link>
            </>
          )}
        </div>
        
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
      
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="container">
          <Link href="/" className="mobile-nav-link">Home</Link>
          <Link href="/hotels" className="mobile-nav-link">Hotels</Link>
          <Link href="/flights" className="mobile-nav-link">Flights</Link>
          <Link href="/buses" className="mobile-nav-link">Buses</Link>
          <Link href="/trains" className="mobile-nav-link">Trains</Link>
          <Link href="/deals" className="mobile-nav-link">Deals</Link>
          
          {!user && (
            <div className="mobile-auth-buttons">
              <Link href="/auth" className="mobile-login-btn">Login</Link>
              <Link href="/auth" className="mobile-signup-btn">Sign Up</Link>
            </div>
          )}
          
          {user && (
            <div className="mobile-auth-buttons">
              <Link href="/profile" className="mobile-login-btn">My Profile</Link>
              <button onClick={handleLogout} className="mobile-signup-btn">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
