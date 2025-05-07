import React, { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/search.css';

const SearchSection = () => {
  const [location, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('flights');
  
  // Flight search state
  const [flightSearch, setFlightSearch] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: '1',
    class: 'economy'
  });
  
  // Hotel search state
  const [hotelSearch, setHotelSearch] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '1'
  });
  
  // Bus search state
  const [busSearch, setBusSearch] = useState({
    from: '',
    to: '',
    departDate: '',
    passengers: '1'
  });
  
  // Train search state
  const [trainSearch, setTrainSearch] = useState({
    from: '',
    to: '',
    travelDate: '',
    class: '1'
  });
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  const handleFlightSearchChange = (e) => {
    const { name, value } = e.target;
    setFlightSearch(prev => ({ ...prev, [name]: value }));
  };
  
  const handleHotelSearchChange = (e) => {
    const { name, value } = e.target;
    setHotelSearch(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBusSearchChange = (e) => {
    const { name, value } = e.target;
    setBusSearch(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTrainSearchChange = (e) => {
    const { name, value } = e.target;
    setTrainSearch(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFlightSearch = (e) => {
    e.preventDefault();
    // Navigate to flight search results
    console.log('Flight search:', flightSearch);
  };
  
  const handleHotelSearch = (e) => {
    e.preventDefault();
    // Navigate to hotel search page
    navigate('/hotels');
  };
  
  const handleBusSearch = (e) => {
    e.preventDefault();
    // Navigate to buses page with search parameters as query string
    const queryParams = new URLSearchParams({
      from: busSearch.from,
      to: busSearch.to,
      date: busSearch.departDate,
      passengers: busSearch.passengers
    }).toString();
    
    navigate(`/buses?${queryParams}`);
  };
  
  const handleTrainSearch = (e) => {
    e.preventDefault();
    // Navigate to train search page
    navigate('/trains');
  };

  return (
    <section id="search-section" className="search-section">
      <div className="search-container">
        {/* Search tabs */}
        <div className="search-tabs">
          <button 
            className={`search-tab ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => handleTabClick('flights')}
          >
            <i className="fas fa-plane-departure"></i>Flights
          </button>
          <button 
            className={`search-tab ${activeTab === 'hotels' ? 'active' : ''}`}
            onClick={() => handleTabClick('hotels')}
          >
            <i className="fas fa-hotel"></i>Hotels
          </button>
          <button 
            className={`search-tab ${activeTab === 'buses' ? 'active' : ''}`}
            onClick={() => handleTabClick('buses')}
          >
            <i className="fas fa-bus"></i>Buses
          </button>
          <button 
            className={`search-tab ${activeTab === 'trains' ? 'active' : ''}`}
            onClick={() => handleTabClick('trains')}
          >
            <i className="fas fa-train"></i>Trains
          </button>
        </div>
        
        {/* Flight search form */}
        <div className={`search-content ${activeTab !== 'flights' ? 'hidden' : ''}`}>
          <form className="search-form" onSubmit={handleFlightSearch}>
            <div className="search-grid">
              <div>
                <label className="form-label">From</label>
                <div className="search-input-group">
                  <i className="fas fa-plane-departure search-input-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Departure City"
                    name="from"
                    value={flightSearch.from}
                    onChange={handleFlightSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">To</label>
                <div className="search-input-group">
                  <i className="fas fa-plane-arrival search-input-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Arrival City"
                    name="to"
                    value={flightSearch.to}
                    onChange={handleFlightSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Departure</label>
                <div className="search-input-group">
                  <i className="fas fa-calendar search-input-icon"></i>
                  <input
                    type="date"
                    className="search-input"
                    name="departDate"
                    value={flightSearch.departDate}
                    onChange={handleFlightSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Return</label>
                <div className="search-input-group">
                  <i className="fas fa-calendar-check search-input-icon"></i>
                  <input
                    type="date"
                    className="search-input"
                    name="returnDate"
                    value={flightSearch.returnDate}
                    onChange={handleFlightSearchChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="search-additional-row">
              <div>
                <label className="form-label">Passengers</label>
                <div className="search-input-group">
                  <i className="fas fa-user search-input-icon"></i>
                  <select
                    className="search-select"
                    name="passengers"
                    value={flightSearch.passengers}
                    onChange={handleFlightSearchChange}
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5+ Passengers</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Class</label>
                <div className="search-input-group">
                  <i className="fas fa-chair search-input-icon"></i>
                  <select
                    className="search-select"
                    name="class"
                    value={flightSearch.class}
                    onChange={handleFlightSearchChange}
                  >
                    <option value="economy">Economy</option>
                    <option value="premium">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>
              <div className="search-button-container">
                <button type="submit" className="search-button">
                  <i className="fas fa-search"></i>Search Flights
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Hotel search form */}
        <div className={`search-content ${activeTab !== 'hotels' ? 'hidden' : ''}`}>
          <form className="search-form" onSubmit={handleHotelSearch}>
            <div className="search-grid">
              <div>
                <label className="form-label">Destination</label>
                <div className="search-input-group">
                  <i className="fas fa-map-marker-alt search-input-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="City or Hotel name"
                    name="destination"
                    value={hotelSearch.destination}
                    onChange={handleHotelSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Check-in</label>
                <div className="search-input-group">
                  <i className="fas fa-calendar search-input-icon"></i>
                  <input
                    type="date"
                    className="search-input"
                    name="checkIn"
                    value={hotelSearch.checkIn}
                    onChange={handleHotelSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Check-out</label>
                <div className="search-input-group">
                  <i className="fas fa-calendar-check search-input-icon"></i>
                  <input
                    type="date"
                    className="search-input"
                    name="checkOut"
                    value={hotelSearch.checkOut}
                    onChange={handleHotelSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Guests & Rooms</label>
                <div className="search-input-group">
                  <i className="fas fa-user-friends search-input-icon"></i>
                  <select
                    className="search-select"
                    name="guests"
                    value={hotelSearch.guests}
                    onChange={handleHotelSearchChange}
                  >
                    <option value="1">1 Room, 1 Guest</option>
                    <option value="2">1 Room, 2 Guests</option>
                    <option value="3">1 Room, 3 Guests</option>
                    <option value="4">2 Rooms, 4 Guests</option>
                    <option value="5">Custom</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="search-additional-row">
              <div></div>
              <div></div>
              <div className="search-button-container">
                <button type="submit" className="search-button">
                  <i className="fas fa-search"></i>Search Hotels
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Bus search form */}
        <div className={`search-content ${activeTab !== 'buses' ? 'hidden' : ''}`}>
          <form className="search-form" onSubmit={handleBusSearch}>
            <div className="search-grid">
              <div>
                <label className="form-label">From</label>
                <div className="search-input-group">
                  <i className="fas fa-map-marker-alt search-input-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Departure City"
                    name="from"
                    value={busSearch.from}
                    onChange={handleBusSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">To</label>
                <div className="search-input-group">
                  <i className="fas fa-map-pin search-input-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Arrival City"
                    name="to"
                    value={busSearch.to}
                    onChange={handleBusSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Departure Date</label>
                <div className="search-input-group">
                  <i className="fas fa-calendar search-input-icon"></i>
                  <input
                    type="date"
                    className="search-input"
                    name="departDate"
                    value={busSearch.departDate}
                    onChange={handleBusSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Passengers</label>
                <div className="search-input-group">
                  <i className="fas fa-users search-input-icon"></i>
                  <select
                    className="search-select"
                    name="passengers"
                    value={busSearch.passengers}
                    onChange={handleBusSearchChange}
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5+ Passengers</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="search-additional-row">
              <div></div>
              <div></div>
              <div className="search-button-container">
                <button type="submit" className="search-button">
                  <i className="fas fa-search"></i>Search Buses
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {/* Train search form */}
        <div className={`search-content ${activeTab !== 'trains' ? 'hidden' : ''}`}>
          <form className="search-form" onSubmit={handleTrainSearch}>
            <div className="search-grid">
              <div>
                <label className="form-label">From</label>
                <div className="search-input-group">
                  <i className="fas fa-subway search-input-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Departure Station"
                    name="from"
                    value={trainSearch.from}
                    onChange={handleTrainSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">To</label>
                <div className="search-input-group">
                  <i className="fas fa-subway search-input-icon"></i>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Arrival Station"
                    name="to"
                    value={trainSearch.to}
                    onChange={handleTrainSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Travel Date</label>
                <div className="search-input-group">
                  <i className="fas fa-calendar search-input-icon"></i>
                  <input
                    type="date"
                    className="search-input"
                    name="travelDate"
                    value={trainSearch.travelDate}
                    onChange={handleTrainSearchChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Class</label>
                <div className="search-input-group">
                  <i className="fas fa-chair search-input-icon"></i>
                  <select
                    className="search-select"
                    name="class"
                    value={trainSearch.class}
                    onChange={handleTrainSearchChange}
                  >
                    <option value="1">Economy</option>
                    <option value="2">Business</option>
                    <option value="3">First Class</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="search-additional-row">
              <div></div>
              <div></div>
              <div className="search-button-container">
                <button type="submit" className="search-button">
                  <i className="fas fa-search"></i>Search Trains
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
