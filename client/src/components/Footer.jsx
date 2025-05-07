import React from 'react';
import { Link } from 'wouter';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company Info */}
          <div>
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <i className="fas fa-globe-americas"></i>
              </div>
              <div className="footer-logo-text">TravelEase</div>
            </div>
            <p className="footer-description">
              Making travel accessible, comfortable and enjoyable for everyone. We connect you with the best services worldwide.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li className="footer-link"><Link href="/">Home</Link></li>
              <li className="footer-link"><Link href="/about">About Us</Link></li>
              <li className="footer-link"><Link href="/destinations">Destinations</Link></li>
              <li className="footer-link"><Link href="/deals">Travel Deals</Link></li>
              <li className="footer-link"><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="footer-column">
            <h3>Our Services</h3>
            <ul className="footer-links">
              <li className="footer-link"><Link href="/flights">Flight Booking</Link></li>
              <li className="footer-link"><Link href="/hotels">Hotel Reservations</Link></li>
              <li className="footer-link"><Link href="/buses">Bus Tickets</Link></li>
              <li className="footer-link"><Link href="/trains">Train Journeys</Link></li>
              <li className="footer-link"><Link href="/insurance">Travel Insurance</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li className="contact-item">
                <i className="fas fa-map-marker-alt contact-icon"></i>
                <span>123 Travel Street, Global City, Country</span>
              </li>
              <li className="contact-item">
                <i className="fas fa-phone-alt contact-icon"></i>
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="contact-item">
                <i className="fas fa-envelope contact-icon"></i>
                <span>info@travelease.com</span>
              </li>
              <li className="contact-item">
                <i className="fas fa-clock contact-icon"></i>
                <span>24/7 Customer Support</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">&copy; 2023 TravelEase. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
            <a href="#" className="legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
