import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import '../styles/hotels.css';

const HotelDeals = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/api/hotels');
        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }
        const data = await response.json();
        setHotels(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <section id="deals" className="hotels-section">
        <div className="container">
          <div className="section-header-flex">
            <div className="header-left">
              <h2>Luxury Hotel Deals</h2>
              <p>Loading hotels...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="deals" className="hotels-section">
        <div className="container">
          <div className="section-header-flex">
            <div className="header-left">
              <h2>Luxury Hotel Deals</h2>
              <p>Error: {error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="deals" className="hotels-section">
      <div className="container">
        <div className="section-header-flex">
          <div className="header-left">
            <h2>Luxury Hotel Deals</h2>
            <p>Experience world-class accommodations at special prices.</p>
          </div>
          <Link href="/hotels" className="view-all-link desktop">
            View All <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        
        <div className="hotels-grid">
          {hotels.map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              <div className="hotel-image-wrapper">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="hotel-image"
                />
                <div className="hotel-rating">
                  <div className="rating-stars">
                    {[...Array(Math.floor(hotel.rating))].map((_, index) => (
                      <i key={index} className="fas fa-star star"></i>
                    ))}
                    {hotel.rating % 1 !== 0 && (
                      <i className="fas fa-star-half-alt star"></i>
                    )}
                  </div>
                  <span className="rating-text">{hotel.rating}-Star Hotel</span>
                </div>
              </div>
              <div className="hotel-content">
                <h3 className="hotel-title">{hotel.name}</h3>
                <p className="hotel-location">
                  <i className="fas fa-map-marker-alt"></i> {hotel.location}
                </p>
                <div className="hotel-features">
                  {hotel.facilities && hotel.facilities.map((facility, index) => (
                    <span className="hotel-feature" key={index}>{facility}</span>
                  ))}
                </div>
                <div className="hotel-footer">
                  <div className="hotel-price">
                    <span className="price-label">Per night</span>
                    <div className="price-amount">
                      <span className="amount-current">${hotel.price}</span>
                      <span className="amount-old">${Math.round(hotel.price * 1.4)}</span>
                    </div>
                  </div>
                  <Link href={`/hotels/${hotel.id}`} className="hotel-btn">Book Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="hotels-footer-mobile">
          <Link href="/hotels" className="view-all-link">
            View All Hotels <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HotelDeals;
