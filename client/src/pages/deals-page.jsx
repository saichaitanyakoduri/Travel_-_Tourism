import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buses, hotels, trains, flights, destinations } from '@/data/travelData';
import '../styles/listing.css';

const DealsPage = () => {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(true);
  const [dealsData, setDealsData] = useState({
    featuredDeals: [],
    hotelDeals: [],
    flightDeals: [],
    packageDeals: []
  });
  
  // Generate some deals from our travel data
  useEffect(() => {
    const generateDeals = async () => {
      try {
        setLoading(true);
        
        // Add a small delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Featured deals (mix of different types)
        const featured = [
          {
            id: 1,
            type: 'hotel',
            title: 'Luxury Beachfront Getaway',
            description: 'Enjoy 30% off at top-rated beach resorts worldwide',
            location: 'Multiple Destinations',
            imageUrl: hotels[0].imageUrl,
            originalPrice: 299,
            discountedPrice: 209,
            discount: 30,
            expiry: '2025-06-30'
          },
          {
            id: 2,
            type: 'flight',
            title: 'International Flight Sale',
            description: 'Up to 25% off on international flights',
            location: 'Global Routes',
            imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3',
            originalPrice: 450,
            discountedPrice: 337.50,
            discount: 25,
            expiry: '2025-05-31'
          },
          {
            id: 3,
            type: 'package',
            title: 'Weekend City Escape',
            description: 'All-inclusive weekend packages with hotel, tours, and more',
            location: 'Major Cities',
            imageUrl: destinations[1].imageUrl,
            originalPrice: 599,
            discountedPrice: 479,
            discount: 20,
            expiry: '2025-07-15'
          }
        ];
        
        // Hotel-specific deals
        const hotelDeals = hotels
          .filter(hotel => hotel.id % 2 === 0) // Select every other hotel for deals
          .map(hotel => ({
            id: hotel.id,
            type: 'hotel',
            title: `${hotel.name} Special`,
            description: `Limited time offer at ${hotel.name} in ${hotel.location}`,
            location: hotel.location,
            imageUrl: hotel.imageUrl,
            originalPrice: hotel.price,
            discountedPrice: Math.round(hotel.price * 0.8), // 20% discount
            discount: 20,
            expiry: '2025-07-30',
            hotelId: hotel.id
          }));
        
        // Flight-specific deals
        const flightDeals = flights
          .filter(flight => flight.id % 3 === 0) // Select some flights for deals
          .map(flight => ({
            id: flight.id + 100, // To avoid ID conflicts
            type: 'flight',
            title: `${flight.from} to ${flight.to} Flash Sale`,
            description: `${flight.airline} special promotion on ${flight.from}-${flight.to} route`,
            location: `${flight.from} - ${flight.to}`,
            imageUrl: flight.airlineLogo || 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3',
            originalPrice: flight.price,
            discountedPrice: Math.round(flight.price * 0.85), // 15% discount
            discount: 15,
            expiry: '2025-06-15',
            flightId: flight.id
          }));
        
        // Package deals (combining destination + hotel)
        const packageDeals = destinations
          .filter(dest => dest.id <= 3) // Just use first few destinations
          .map(dest => ({
            id: dest.id + 200, // To avoid ID conflicts
            type: 'package',
            title: `${dest.name} Adventure Package`,
            description: `Complete ${dest.name} vacation package including hotel, tours, and activities`,
            location: dest.location,
            imageUrl: dest.imageUrl,
            originalPrice: 899 + (dest.id * 100), // Just for variety
            discountedPrice: Math.round((899 + (dest.id * 100)) * 0.75), // 25% discount
            discount: 25,
            expiry: '2025-08-31',
            destinationId: dest.id
          }));
        
        setDealsData({
          featuredDeals: featured,
          hotelDeals: hotelDeals,
          flightDeals: flightDeals,
          packageDeals: packageDeals
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error generating deals:', error);
        setLoading(false);
      }
    };
    
    generateDeals();
  }, []);
  
  const handleDealSelect = (deal) => {
    if (deal.type === 'hotel' && deal.hotelId) {
      navigate(`/hotels/${deal.hotelId}`);
    } else if (deal.type === 'flight' && deal.flightId) {
      // We don't have flight booking page yet
      alert('Flight booking coming soon!');
    } else if (deal.type === 'package' && deal.destinationId) {
      // For package deals - show destinations
      alert('Package booking coming soon!');
    } else {
      // Generic deals
      switch (deal.type) {
        case 'hotel':
          navigate('/hotels');
          break;
        case 'flight':
          navigate('/flights');
          break;
        case 'package':
          // Navigate to destinations or featured packages page (not implemented yet)
          alert('Package booking coming soon!');
          break;
        default:
          navigate('/');
      }
    }
  };
  
  const formatExpiry = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <>
      <Header />
      <div className="deals-page">
        <div className="container">
          <div className="deals-header">
            <h1 className="deals-title">Special Travel Deals</h1>
            <p className="deals-subtitle">Limited-time offers and exclusive discounts for your next trip</p>
          </div>
          
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading travel deals...</p>
            </div>
          ) : (
            <div className="deals-content">
              {/* Featured Deals Section */}
              <section className="deals-section">
                <h2 className="section-title">Featured Deals</h2>
                <div className="featured-deals">
                  {dealsData.featuredDeals.map(deal => (
                    <div key={deal.id} className="featured-deal-card" onClick={() => handleDealSelect(deal)}>
                      <div className="deal-image">
                        <img src={deal.imageUrl} alt={deal.title} />
                        <span className="deal-badge">{deal.discount}% OFF</span>
                      </div>
                      <div className="deal-content">
                        <h3 className="deal-title">{deal.title}</h3>
                        <p className="deal-location">{deal.location}</p>
                        <p className="deal-description">{deal.description}</p>
                        <div className="deal-pricing">
                          <span className="deal-original-price">${deal.originalPrice}</span>
                          <span className="deal-price">${deal.discountedPrice}</span>
                        </div>
                        <div className="deal-expiry">Expires: {formatExpiry(deal.expiry)}</div>
                        <button className="btn-deal">View Deal</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Hotel Deals */}
              <section className="deals-section">
                <div className="section-header">
                  <h2 className="section-title">Hotel Deals</h2>
                  <Link href="/hotels" className="view-all-link">View All Hotels</Link>
                </div>
                <div className="deals-grid">
                  {dealsData.hotelDeals.slice(0, 4).map(deal => (
                    <div key={deal.id} className="deal-card" onClick={() => handleDealSelect(deal)}>
                      <div className="deal-image">
                        <img src={deal.imageUrl} alt={deal.title} />
                        <span className="deal-badge">{deal.discount}% OFF</span>
                      </div>
                      <div className="deal-content">
                        <h3 className="deal-title">{deal.title}</h3>
                        <p className="deal-location">{deal.location}</p>
                        <div className="deal-pricing">
                          <span className="deal-original-price">${deal.originalPrice}</span>
                          <span className="deal-price">${deal.discountedPrice}</span>
                          <span className="deal-per">per night</span>
                        </div>
                        <button className="btn-deal-small">Book Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Flight Deals */}
              <section className="deals-section">
                <div className="section-header">
                  <h2 className="section-title">Flight Deals</h2>
                  <Link href="/flights" className="view-all-link">View All Flights</Link>
                </div>
                <div className="deals-grid">
                  {dealsData.flightDeals.slice(0, 4).map(deal => (
                    <div key={deal.id} className="deal-card" onClick={() => handleDealSelect(deal)}>
                      <div className="deal-image">
                        <img src={deal.imageUrl} alt={deal.title} />
                        <span className="deal-badge">{deal.discount}% OFF</span>
                      </div>
                      <div className="deal-content">
                        <h3 className="deal-title">{deal.title}</h3>
                        <p className="deal-location">{deal.location}</p>
                        <div className="deal-pricing">
                          <span className="deal-original-price">${deal.originalPrice}</span>
                          <span className="deal-price">${deal.discountedPrice}</span>
                          <span className="deal-per">one way</span>
                        </div>
                        <button className="btn-deal-small">View Deal</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Vacation Packages */}
              <section className="deals-section">
                <div className="section-header">
                  <h2 className="section-title">Vacation Packages</h2>
                </div>
                <div className="deals-grid">
                  {dealsData.packageDeals.map(deal => (
                    <div key={deal.id} className="deal-card" onClick={() => handleDealSelect(deal)}>
                      <div className="deal-image">
                        <img src={deal.imageUrl} alt={deal.title} />
                        <span className="deal-badge">{deal.discount}% OFF</span>
                      </div>
                      <div className="deal-content">
                        <h3 className="deal-title">{deal.title}</h3>
                        <p className="deal-location">{deal.location}</p>
                        <div className="deal-pricing">
                          <span className="deal-original-price">${deal.originalPrice}</span>
                          <span className="deal-price">${deal.discountedPrice}</span>
                          <span className="deal-per">per person</span>
                        </div>
                        <button className="btn-deal-small">View Package</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Email Subscription for Deals */}
              <section className="deals-subscribe">
                <div className="subscribe-content">
                  <h3>Get Exclusive Travel Deals</h3>
                  <p>Subscribe to our newsletter and receive exclusive deals and offers directly to your inbox.</p>
                  <div className="subscribe-form">
                    <input type="email" placeholder="Your email address" />
                    <button className="btn-subscribe">Subscribe</button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DealsPage;