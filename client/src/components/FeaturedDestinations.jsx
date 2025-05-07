import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import '../styles/destinations.css';

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations');
        if (!response.ok) {
          throw new Error('Failed to fetch destinations');
        }
        const data = await response.json();
        setDestinations(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <section className="destinations-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Destinations</h2>
            <p className="section-subtitle">Loading destinations...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="destinations-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Destinations</h2>
            <p className="section-subtitle">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="destinations-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Destinations</h2>
          <p className="section-subtitle">Explore our handpicked destinations with the best offers and packages. Find your dream vacation spot today!</p>
        </div>
        
        <div className="destinations-grid">
          {destinations.map((destination) => (
            <div className="destination-card" key={destination.id}>
              <div className="destination-image-wrapper">
                <img 
                  src={destination.image} 
                  alt={`${destination.name}, ${destination.location}`}
                  className="destination-image"
                />
                {destination.discount > 0 && (
                  <div className="destination-badge">{destination.discount}% OFF</div>
                )}
              </div>
              <div className="destination-content">
                <div className="destination-header">
                  <h3 className="destination-title">{destination.name}, {destination.location}</h3>
                  <div className="destination-rating">
                    <i className="fas fa-star destination-star"></i>
                    <span>{destination.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="destination-location">
                  <i className="fas fa-map-marker-alt"></i> {destination.location}
                </p>
                <p className="destination-description">{destination.description}</p>
                <div className="destination-footer">
                  <div className="destination-price">
                    <span className="price-current">${destination.price - (destination.price * destination.discount / 100)}</span>
                    {destination.discount > 0 && (
                      <span className="price-old">${destination.price}</span>
                    )}
                  </div>
                  <Link href={`/destinations/${destination.id}`} className="destination-btn">View Deals</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="destinations-footer">
          <Link href="/destinations" className="view-all-btn">View All Destinations</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
