import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trains } from '@/data/travelData';
import '../styles/listing.css';

const TrainsPage = () => {
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [trainOptions, setTrainOptions] = useState([]);
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Parse query params from URL
  const queryParams = new URLSearchParams(location.split('?')[1] || '');
  
  const [filters, setFilters] = useState({
    from: queryParams.get('from') || '',
    to: queryParams.get('to') || '',
    date: queryParams.get('date') || '',
    class: queryParams.get('class') || '',
    priceRange: [0, 1000]
  });

  // Load train data and apply initial filters from URL
  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      try {
        setLoading(true);
        // Add a small delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        setTrainOptions(trains);
        
        // Apply initial filters from URL if present
        let filtered = [...trains];
        
        if (filters.from) {
          filtered = filtered.filter(train => 
            train.from.toLowerCase().includes(filters.from.toLowerCase())
          );
        }
        
        if (filters.to) {
          filtered = filtered.filter(train => 
            train.to.toLowerCase().includes(filters.to.toLowerCase())
          );
        }
        
        setFilteredTrains(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error loading train data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, [filters.from, filters.to]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const applyFilters = () => {
    let filtered = [...trainOptions];
    
    // Origin filter
    if (filters.from) {
      filtered = filtered.filter(train => 
        train.from.toLowerCase().includes(filters.from.toLowerCase())
      );
    }
    
    // Destination filter
    if (filters.to) {
      filtered = filtered.filter(train => 
        train.to.toLowerCase().includes(filters.to.toLowerCase())
      );
    }
    
    // Class filter
    if (filters.class) {
      filtered = filtered.filter(train => 
        train.availableClasses.includes(filters.class)
      );
    }
    
    // Price range filter
    filtered = filtered.filter(train => 
      train.price >= filters.priceRange[0] && train.price <= filters.priceRange[1]
    );
    
    setFilteredTrains(filtered);
  };
  
  const handlePriceRangeChange = (range) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };
  
  const handleTrainSelect = (trainId) => {
    navigate(`/trains/${trainId}`);
  };
  
  // Reset all filters
  const clearFilters = () => {
    setFilters({
      from: '',
      to: '',
      date: '',
      class: '',
      priceRange: [0, 1000]
    });
  };
  
  return (
    <>
      <Header />
      <div className="listing-page">
        <div className="container">
          <div className="listing-header">
            <h1 className="listing-title">Find Train Tickets</h1>
            <p className="listing-subtitle">Book train tickets for your next journey</p>
          </div>
          
          <div className="listing-grid">
            {/* Filters Panel */}
            <div className="listing-filters">
              <div className="filter-section">
                <h3 className="filter-title">Search Trains</h3>
                <form onSubmit={handleSearch}>
                  <div className="filter-group">
                    <label htmlFor="from">From</label>
                    <input 
                      type="text" 
                      id="from" 
                      name="from" 
                      value={filters.from} 
                      onChange={handleFilterChange} 
                      placeholder="Departure city"
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="to">To</label>
                    <input 
                      type="text" 
                      id="to" 
                      name="to" 
                      value={filters.to} 
                      onChange={handleFilterChange}
                      placeholder="Destination city"
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="date">Travel Date</label>
                    <input 
                      type="date" 
                      id="date" 
                      name="date" 
                      value={filters.date} 
                      onChange={handleFilterChange}
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="class">Travel Class</label>
                    <select 
                      id="class" 
                      name="class" 
                      value={filters.class} 
                      onChange={handleFilterChange}
                    >
                      <option value="">Any Class</option>
                      <option value="Economy">Economy</option>
                      <option value="Business">Business</option>
                      <option value="First Class">First Class</option>
                      <option value="Sleeper">Sleeper</option>
                    </select>
                  </div>
                  
                  <div className="filter-group price-range">
                    <label>Price Range</label>
                    <div className="price-inputs">
                      <span>${filters.priceRange[0]}</span>
                      <span>to</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange([filters.priceRange[0], parseInt(e.target.value)])}
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary">Search Trains</button>
                  <button type="button" className="btn-secondary" onClick={clearFilters}>Clear All</button>
                </form>
              </div>
            </div>
            
            {/* Results Panel */}
            <div className="listing-results">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading train options...</p>
                </div>
              ) : filteredTrains.length === 0 ? (
                <div className="no-results">
                  <h3>No trains found</h3>
                  <p>Try adjusting your search filters to find more options.</p>
                </div>
              ) : (
                <>
                  <div className="results-header">
                    <h2>{filteredTrains.length} Trains Available</h2>
                    <div className="sort-options">
                      <label htmlFor="sortBy">Sort by:</label>
                      <select id="sortBy" onChange={(e) => console.log(e.target.value)}>
                        <option value="departure">Departure Time</option>
                        <option value="duration">Duration</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="results-list">
                    {filteredTrains.map(train => (
                      <div key={train.id} className="listing-card" onClick={() => handleTrainSelect(train.id)}>
                        <div className="listing-img">
                          <img src={train.imageUrl} alt={train.trainName} />
                          {train.hasDiscount && <span className="listing-tag">Discounted</span>}
                        </div>
                        <div className="listing-content">
                          <div className="listing-info">
                            <h3 className="listing-title">{train.trainName} - {train.trainNumber}</h3>
                            <div className="listing-route">
                              <span className="route-from">{train.from}</span>
                              <span className="route-arrow">→</span>
                              <span className="route-to">{train.to}</span>
                            </div>
                            <div className="listing-times">
                              <div className="time-item">
                                <span className="time-label">Departure:</span>
                                <span className="time-value">{train.departureTime}</span>
                              </div>
                              <div className="time-item">
                                <span className="time-label">Arrival:</span>
                                <span className="time-value">{train.arrivalTime}</span>
                              </div>
                              <div className="time-item">
                                <span className="time-label">Duration:</span>
                                <span className="time-value">{train.duration}</span>
                              </div>
                            </div>
                            <div className="listing-features">
                              {train.availableClasses.map((cls, idx) => (
                                <span key={idx} className="listing-feature">{cls}</span>
                              ))}
                            </div>
                          </div>
                          <div className="listing-price">
                            <div className="price">${train.price}</div>
                            <div className="price-label">per person</div>
                            <button className="btn-book">Book Now</button>
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

export default TrainsPage;