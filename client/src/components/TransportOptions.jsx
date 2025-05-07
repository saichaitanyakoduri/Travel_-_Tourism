import React from 'react';
import { Link } from 'wouter';
import '../styles/transport.css';

const TransportOptions = () => {
  return (
    <section className="transport-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Transportation Services</h2>
          <p className="section-subtitle">Choose from our wide range of comfortable and reliable transportation options.</p>
        </div>
        
        <div className="transport-grid">
          {/* Bus Services Card */}
          <div className="transport-card">
            <div className="transport-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Luxury Bus Services" 
                className="transport-image"
              />
              <div className="transport-overlay">
                <div className="transport-content">
                  <h3 className="transport-title">Premium Bus Services</h3>
                  <p className="transport-description">Comfortable seating, WiFi, and entertainment systems on board.</p>
                  <Link href="/buses" className="transport-btn">View Bus Routes</Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Train Services Card */}
          <div className="transport-card">
            <div className="transport-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Train Services" 
                className="transport-image"
              />
              <div className="transport-overlay">
                <div className="transport-content">
                  <h3 className="transport-title">Express Train Services</h3>
                  <p className="transport-description">Scenic routes, high-speed options, and multiple class choices.</p>
                  <Link href="/trains" className="transport-btn">Explore Train Journeys</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="features-grid">
          {/* Transport Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-suitcase-rolling"></i>
            </div>
            <h3 className="feature-title">Generous Baggage Allowance</h3>
            <p className="feature-description">Travel with all your essentials without extra charges on baggage.</p>
          </div>
          
          {/* Transport Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-wifi"></i>
            </div>
            <h3 className="feature-title">Complimentary WiFi</h3>
            <p className="feature-description">Stay connected throughout your journey with free high-speed internet.</p>
          </div>
          
          {/* Transport Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3 className="feature-title">24/7 Customer Support</h3>
            <p className="feature-description">Our dedicated support team is always available to assist you.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransportOptions;
