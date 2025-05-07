import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { hotels } from '@/data/travelData';
import '../styles/listing.css';

const HotelsPage = () => {
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [hotelOptions, setHotelOptions] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Parse query params from URL
  const queryParams = new URLSearchParams(location.split('?')[1] || '');
  
  const [filters, setFilters] = useState({
    location: queryParams.get('location') || '',
    checkIn: queryParams.get('checkIn') || '',
    checkOut: queryParams.get('checkOut') || '',
    guests: queryParams.get('guests') || '',
    priceRange: [0, 5000]
  });

  // Load hotel data and apply initial filters from URL
  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      try {
        setLoading(true);
        // Add a small delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        setHotelOptions(hotels);
        
        // Apply initial filters from URL if present
        let filtered = [...hotels];
        
        if (filters.location) {
          filtered = filtered.filter(hotel => 
            hotel.location.toLowerCase().includes(filters.location.toLowerCase())
          );
        }
        
        setFilteredHotels(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error loading hotel data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, [filters.location]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const applyFilters = () => {
    let filtered = [...hotelOptions];
    
    // Location filter
    if (filters.location) {
      filtered = filtered.filter(hotel => 
        hotel.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Price range filter
    filtered = filtered.filter(hotel => 
      hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
    );
    
    // Rating filter (future enhancement)
    
    setFilteredHotels(filtered);
  };
  
  const handlePriceRangeChange = (range) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };
  
  const handleHotelSelect = (hotelId) => {
    navigate(`/hotels/${hotelId}`);
  };
  
  // Reset all filters
  const clearFilters = () => {
    setFilters({
      location: '',
      checkIn: '',
      checkOut: '',
      guests: '',
      priceRange: [0, 5000]
    });
  };
  
  return (
    <>
      <Header />
      <div className="listing-page">
        <div className="container">
          <div className="listing-header">
            <h1 className="listing-title">Find Your Perfect Hotel</h1>
            <p className="listing-subtitle">Browse from a wide selection of hotels worldwide</p>
          </div>
          
          <div className="listing-grid">
            {/* Filters Panel */}
            <div className="listing-filters">
              <div className="filter-section">
                <h3 className="filter-title">Search Hotels</h3>
                <form onSubmit={handleSearch}>
                  <div className="filter-group">
                    <label htmlFor="location">Destination</label>
                    <input 
                      type="text" 
                      id="location" 
                      name="location" 
                      value={filters.location} 
                      onChange={handleFilterChange} 
                      placeholder="City or area"
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="checkIn">Check-in Date</label>
                    <input 
                      type="date" 
                      id="checkIn" 
                      name="checkIn" 
                      value={filters.checkIn} 
                      onChange={handleFilterChange}
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="checkOut">Check-out Date</label>
                    <input 
                      type="date" 
                      id="checkOut" 
                      name="checkOut" 
                      value={filters.checkOut} 
                      onChange={handleFilterChange}
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="guests">Guests</label>
                    <select 
                      id="guests" 
                      name="guests" 
                      value={filters.guests} 
                      onChange={handleFilterChange}
                    >
                      <option value="">Select</option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4+ Guests</option>
                    </select>
                  </div>
                  
                  <div className="filter-group price-range">
                    <label>Price Range (per night)</label>
                    <div className="price-inputs">
                      <span>${filters.priceRange[0]}</span>
                      <span>to</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="5000" 
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange([filters.priceRange[0], parseInt(e.target.value)])}
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary">Search Hotels</button>
                  <button type="button" className="btn-secondary" onClick={clearFilters}>Clear All</button>
                </form>
              </div>
            </div>
            
            {/* Results Panel */}
            <div className="listing-results">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading hotel options...</p>
                </div>
              ) : filteredHotels.length === 0 ? (
                <div className="no-results">
                  <h3>No hotels found</h3>
                  <p>Try adjusting your search filters to find more options.</p>
                </div>
              ) : (
                <>
                  <div className="results-header">
                    <h2>{filteredHotels.length} Hotels Available</h2>
                    <div className="sort-options">
                      <label htmlFor="sortBy">Sort by:</label>
                      <select id="sortBy" onChange={(e) => console.log(e.target.value)}>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="rating">Highest Rating</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="results-list">
                    {filteredHotels.map(hotel => (
                      <div key={hotel.id} className="listing-card" onClick={() => handleHotelSelect(hotel.id)}>
                        <div className="listing-img">
                          <img src={hotel.imageUrl} alt={hotel.name} />
                          {hotel.rating >= 4.5 && <span className="listing-tag">Top Rated</span>}
                        </div>
                        <div className="listing-content">
                          <div className="listing-info">
                            <h3 className="listing-title">{hotel.name}</h3>
                            <div className="listing-location">{hotel.location}</div>
                            <div className="listing-rating">
                              <span className="rating-score">{hotel.rating}</span>
                              <span className="rating-text">{hotel.rating >= 4.5 ? 'Exceptional' : hotel.rating >= 4.0 ? 'Very Good' : 'Good'}</span>
                            </div>
                            <div className="listing-features">
                              {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                                <span key={idx} className="listing-feature">{amenity}</span>
                              ))}
                              {hotel.amenities.length > 3 && <span className="listing-feature">+{hotel.amenities.length - 3} more</span>}
                            </div>
                          </div>
                          <div className="listing-price">
                            <div className="price">${hotel.price}</div>
                            <div className="price-label">per night</div>
                            <button className="btn-book">View Details</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelsPage;