import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { flights } from '@/data/travelData';
import '../styles/listing.css';

const FlightsPage = () => {
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [flightOptions, setFlightOptions] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Parse query params from URL
  const queryParams = new URLSearchParams(location.split('?')[1] || '');
  
  const [filters, setFilters] = useState({
    from: queryParams.get('from') || '',
    to: queryParams.get('to') || '',
    date: queryParams.get('date') || '',
    returnDate: queryParams.get('returnDate') || '',
    passengers: queryParams.get('passengers') || '1',
    cabinClass: queryParams.get('cabinClass') || '',
    priceRange: [0, 2000],
    airlines: []
  });

  // Load flight data and apply initial filters from URL
  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      try {
        setLoading(true);
        // Add a small delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        setFlightOptions(flights);
        
        // Apply initial filters from URL if present
        let filtered = [...flights];
        
        if (filters.from) {
          filtered = filtered.filter(flight => 
            flight.from.toLowerCase().includes(filters.from.toLowerCase())
          );
        }
        
        if (filters.to) {
          filtered = filtered.filter(flight => 
            flight.to.toLowerCase().includes(filters.to.toLowerCase())
          );
        }
        
        setFilteredFlights(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error loading flight data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, [filters.from, filters.to]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAirlineChange = (airline) => {
    setFilters(prev => {
      const currentAirlines = [...prev.airlines];
      if (currentAirlines.includes(airline)) {
        return { ...prev, airlines: currentAirlines.filter(a => a !== airline) };
      } else {
        return { ...prev, airlines: [...currentAirlines, airline] };
      }
    });
  };
  
  const applyFilters = () => {
    let filtered = [...flightOptions];
    
    // Origin filter
    if (filters.from) {
      filtered = filtered.filter(flight => 
        flight.from.toLowerCase().includes(filters.from.toLowerCase())
      );
    }
    
    // Destination filter
    if (filters.to) {
      filtered = filtered.filter(flight => 
        flight.to.toLowerCase().includes(filters.to.toLowerCase())
      );
    }
    
    // Cabin class filter
    if (filters.cabinClass) {
      filtered = filtered.filter(flight => 
        flight.availableClasses.includes(filters.cabinClass)
      );
    }
    
    // Airlines filter
    if (filters.airlines.length > 0) {
      filtered = filtered.filter(flight => 
        filters.airlines.includes(flight.airline)
      );
    }
    
    // Price range filter
    filtered = filtered.filter(flight => 
      flight.price >= filters.priceRange[0] && flight.price <= filters.priceRange[1]
    );
    
    setFilteredFlights(filtered);
  };
  
  const handlePriceRangeChange = (range) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };
  
  const handleFlightSelect = (flightId) => {
    // For now, just display a message since we don't have a flight booking page yet
    alert(`Flight booking functionality coming soon! Selected flight ID: ${flightId}`);
  };
  
  // Reset all filters
  const clearFilters = () => {
    setFilters({
      from: '',
      to: '',
      date: '',
      returnDate: '',
      passengers: '1',
      cabinClass: '',
      priceRange: [0, 2000],
      airlines: []
    });
  };

  // Get unique airlines for the filter
  const uniqueAirlines = [...new Set(flights.map(flight => flight.airline))];
  
  return (
    <>
      <Header />
      <div className="listing-page">
        <div className="container">
          <div className="listing-header">
            <h1 className="listing-title">Search Flights</h1>
            <p className="listing-subtitle">Find the best flight deals for your next trip</p>
          </div>
          
          <div className="listing-grid">
            {/* Filters Panel */}
            <div className="listing-filters">
              <div className="filter-section">
                <h3 className="filter-title">Flight Search</h3>
                <form onSubmit={handleSearch}>
                  <div className="filter-group">
                    <label htmlFor="from">From</label>
                    <input 
                      type="text" 
                      id="from" 
                      name="from" 
                      value={filters.from} 
                      onChange={handleFilterChange} 
                      placeholder="Departure city or airport"
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
                      placeholder="Destination city or airport"
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="date">Departure Date</label>
                    <input 
                      type="date" 
                      id="date" 
                      name="date" 
                      value={filters.date} 
                      onChange={handleFilterChange}
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="returnDate">Return Date (Optional)</label>
                    <input 
                      type="date" 
                      id="returnDate" 
                      name="returnDate" 
                      value={filters.returnDate} 
                      onChange={handleFilterChange}
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="passengers">Passengers</label>
                    <select 
                      id="passengers" 
                      name="passengers" 
                      value={filters.passengers} 
                      onChange={handleFilterChange}
                    >
                      <option value="1">1 Passenger</option>
                      <option value="2">2 Passengers</option>
                      <option value="3">3 Passengers</option>
                      <option value="4">4 Passengers</option>
                      <option value="5">5+ Passengers</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="cabinClass">Cabin Class</label>
                    <select 
                      id="cabinClass" 
                      name="cabinClass" 
                      value={filters.cabinClass} 
                      onChange={handleFilterChange}
                    >
                      <option value="">Any Class</option>
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business">Business</option>
                      <option value="First">First Class</option>
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
                      max="2000" 
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange([filters.priceRange[0], parseInt(e.target.value)])}
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label>Airlines</label>
                    <div className="checkbox-group">
                      {uniqueAirlines.map(airline => (
                        <div key={airline} className="checkbox-item">
                          <input 
                            type="checkbox"
                            id={`airline-${airline.replace(/\s+/g, '-').toLowerCase()}`}
                            checked={filters.airlines.includes(airline)}
                            onChange={() => handleAirlineChange(airline)}
                          />
                          <label htmlFor={`airline-${airline.replace(/\s+/g, '-').toLowerCase()}`}>{airline}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button type="submit" className="btn-primary">Search Flights</button>
                  <button type="button" className="btn-secondary" onClick={clearFilters}>Clear All</button>
                </form>
              </div>
            </div>
            
            {/* Results Panel */}
            <div className="listing-results">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading flight options...</p>
                </div>
              ) : filteredFlights.length === 0 ? (
                <div className="no-results">
                  <h3>No flights found</h3>
                  <p>Try adjusting your search filters to find more options.</p>
                </div>
              ) : (
                <>
                  <div className="results-header">
                    <h2>{filteredFlights.length} Flights Available</h2>
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
                    {filteredFlights.map(flight => (
                      <div key={flight.id} className="listing-card" onClick={() => handleFlightSelect(flight.id)}>
                        <div className="listing-content">
                          <div className="listing-airline">
                            <div className="airline-logo">
                              <img src={flight.airlineLogo || 'https://via.placeholder.com/50?text=Airline'} alt={flight.airline} />
                            </div>
                            <div className="airline-name">{flight.airline}</div>
                            <div className="flight-number">{flight.flightNumber}</div>
                          </div>
                          
                          <div className="listing-info">
                            <div className="flight-route">
                              <div className="route-from">
                                <div className="airport-code">{flight.fromCode}</div>
                                <div className="airport-city">{flight.from}</div>
                                <div className="flight-time">{flight.departureTime}</div>
                              </div>
                              
                              <div className="route-line">
                                <div className="flight-duration">{flight.duration}</div>
                                <div className="flight-stops">
                                  {flight.stops === 0 ? 'Nonstop' : 
                                    `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
                                </div>
                              </div>
                              
                              <div className="route-to">
                                <div className="airport-code">{flight.toCode}</div>
                                <div className="airport-city">{flight.to}</div>
                                <div className="flight-time">{flight.arrivalTime}</div>
                              </div>
                            </div>
                            
                            <div className="listing-amenities">
                              {flight.amenities && flight.amenities.map((amenity, idx) => (
                                <span key={idx} className="amenity-item">{amenity}</span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="listing-price">
                            <div className="price">${flight.price}</div>
                            <div className="price-label">per person</div>
                            <button className="btn-book">Select</button>
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

export default FlightsPage;