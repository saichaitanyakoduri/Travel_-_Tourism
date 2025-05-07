import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buses } from '@/data/travelData';
import '../styles/listing.css';

const BusesPage = () => {
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const [busOptions, setBusOptions] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Parse query params from URL
  const queryParams = new URLSearchParams(location.split('?')[1] || '');
  
  const [filters, setFilters] = useState({
    from: queryParams.get('from') || '',
    to: queryParams.get('to') || '',
    date: queryParams.get('date') || '',
    priceRange: [0, 1000]
  });

  // Load bus data and apply initial filters from URL
  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      try {
        setLoading(true);
        // Add a small delay to simulate loading
        await new Promise(resolve => setTimeout(resolve, 500));
        setBusOptions(buses);
        
        // Apply initial filters from URL if present
        let filtered = [...buses];
        
        if (filters.from) {
          filtered = filtered.filter(bus => 
            bus.from.toLowerCase().includes(filters.from.toLowerCase())
          );
        }
        
        if (filters.to) {
          filtered = filtered.filter(bus => 
            bus.to.toLowerCase().includes(filters.to.toLowerCase())
          );
        }
        
        setFilteredBuses(filtered);
      } catch (error) {
        console.error('Error loading bus data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters.from, filters.to]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...busOptions];
    
    if (filters.from) {
      filtered = filtered.filter(bus => 
        bus.from.toLowerCase().includes(filters.from.toLowerCase())
      );
    }
    
    if (filters.to) {
      filtered = filtered.filter(bus => 
        bus.to.toLowerCase().includes(filters.to.toLowerCase())
      );
    }
    
    // More filters can be added here
    
    setFilteredBuses(filtered);
  };

  // Handle view details button
  const handleViewDetails = (busId) => {
    navigate(`/buses/${busId}`);
  };

  // Render loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="listing-container">
          <div className="container">
            <div className="text-center py-5">
              <div className="loading-spinner"></div>
              <p>Loading bus options...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="listing-container">
        <div className="container">
          <div className="listing-header">
            <h1 className="listing-title">Available Bus Options</h1>
            <p className="listing-subtitle">Find and book the perfect bus journey</p>
          </div>
          
          <div className="listing-grid">
            {/* Filters */}
            <div className="listing-filters">
              <h2 className="filter-heading">Filter Options</h2>
              
              <div className="filter-group">
                <label className="filter-label">From</label>
                <input
                  type="text"
                  className="filter-input"
                  name="from"
                  value={filters.from}
                  onChange={handleFilterChange}
                  placeholder="Departure city"
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">To</label>
                <input
                  type="text"
                  className="filter-input"
                  name="to"
                  value={filters.to}
                  onChange={handleFilterChange}
                  placeholder="Arrival city"
                />
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Travel Date</label>
                <input
                  type="date"
                  className="filter-input"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <button className="filter-button" onClick={applyFilters}>
                Apply Filters
              </button>
            </div>
            
            {/* Bus list */}
            <div className="listing-results">
              {filteredBuses.length === 0 ? (
                <div className="no-results">
                  <p>No buses found matching your criteria. Please try different filters.</p>
                </div>
              ) : (
                filteredBuses.map((bus) => (
                  <div key={bus.id} className="listing-card">
                    <div className="listing-image">
                      <img src={bus.imageUrl} alt={bus.companyName} />
                    </div>
                    <div className="listing-details">
                      <h3 className="listing-name">{bus.companyName}</h3>
                      <div className="listing-info">
                        <div className="info-row">
                          <span className="info-label">Route:</span>
                          <span className="info-value">{bus.from} to {bus.to}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Departure:</span>
                          <span className="info-value">{bus.departureTime}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Arrival:</span>
                          <span className="info-value">{bus.arrivalTime}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">Duration:</span>
                          <span className="info-value">{bus.duration}</span>
                        </div>
                        <div className="amenities-row">
                          {bus.amenities.map((amenity, index) => (
                            <span key={index} className="amenity-tag">{amenity}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="listing-price">
                      <div className="price-amount">${bus.price.toFixed(2)}</div>
                      <div className="price-unit">per person</div>
                      <button 
                        className="booking-button"
                        onClick={() => handleViewDetails(bus.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BusesPage;