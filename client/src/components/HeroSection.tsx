import { useState } from 'react';
import { useLocation } from 'wouter';

const HeroSection = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('flights');
  
  // Flight search form state
  const [flightSearch, setFlightSearch] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: '1 Adult',
    class: 'Economy'
  });
  
  const handleFlightInputChange = (e) => {
    const { name, value } = e.target;
    setFlightSearch({
      ...flightSearch,
      [name]: value
    });
  };
  
  const handleFlightSubmit = (e) => {
    e.preventDefault();
    // Redirect to flights page with search params
    const queryParams = new URLSearchParams({
      from: flightSearch.from,
      to: flightSearch.to,
      departure: flightSearch.departureDate,
      return: flightSearch.returnDate || '',
      passengers: flightSearch.passengers,
      class: flightSearch.class
    }).toString();
    
    setLocation(`/flights?${queryParams}`);
  };
  
  const changeTab = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21" alt="Tropical Beach" />
      </div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your Perfect <span style={{ color: 'var(--secondary)' }}>Adventure</span>
          </h1>
          <p className="hero-subtitle">
            Explore beautiful destinations around the world with the best deals on flights, hotels, and more.
          </p>
        </div>
        
        {/* Search Tabs */}
        <div className="search-box">
          <div className="search-tabs">
            <button 
              className={`search-tab ${activeTab === 'flights' ? 'active' : ''}`}
              onClick={() => changeTab('flights')}
            >
              <i className="fas fa-plane mr-2"></i> Flights
            </button>
            <button 
              className={`search-tab ${activeTab === 'hotels' ? 'active' : ''}`}
              onClick={() => changeTab('hotels')}
            >
              <i className="fas fa-hotel mr-2"></i> Hotels
            </button>
            <button 
              className={`search-tab ${activeTab === 'buses' ? 'active' : ''}`}
              onClick={() => changeTab('buses')}
            >
              <i className="fas fa-bus mr-2"></i> Buses
            </button>
            <button 
              className={`search-tab ${activeTab === 'trains' ? 'active' : ''}`}
              onClick={() => changeTab('trains')}
            >
              <i className="fas fa-train mr-2"></i> Trains
            </button>
            <button 
              className={`search-tab ${activeTab === 'packages' ? 'active' : ''}`}
              onClick={() => changeTab('packages')}
            >
              <i className="fas fa-suitcase mr-2"></i> Packages
            </button>
          </div>
          
          {/* Flight Search Form */}
          {activeTab === 'flights' && (
            <form id="flightSearchForm" onSubmit={handleFlightSubmit} className="search-form">
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">From</label>
                  <div className="form-control-icon">
                    <i className="fas fa-plane-departure"></i>
                    <input 
                      type="text" 
                      name="from"
                      value={flightSearch.from}
                      onChange={handleFlightInputChange}
                      placeholder="Departure City" 
                      className="form-control" 
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">To</label>
                  <div className="form-control-icon">
                    <i className="fas fa-plane-arrival"></i>
                    <input 
                      type="text" 
                      name="to"
                      value={flightSearch.to}
                      onChange={handleFlightInputChange}
                      placeholder="Arrival City" 
                      className="form-control" 
                      required
                      style={{ zIndex: 1 }} /* Add z-index to prevent overlapping */
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Departure</label>
                  <div className="form-control-icon">
                    <i className="far fa-calendar"></i>
                    <input 
                      type="date" 
                      name="departureDate"
                      value={flightSearch.departureDate}
                      onChange={handleFlightInputChange}
                      className="form-control" 
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Return</label>
                  <div className="form-control-icon">
                    <i className="far fa-calendar"></i>
                    <input 
                      type="date" 
                      name="returnDate"
                      value={flightSearch.returnDate}
                      onChange={handleFlightInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">Passengers</label>
                  <div className="form-control-icon">
                    <i className="fas fa-user"></i>
                    <select 
                      name="passengers"
                      value={flightSearch.passengers}
                      onChange={handleFlightInputChange}
                      className="form-select"
                    >
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>3 Adults</option>
                      <option>4+ Adults</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Class</label>
                  <div className="form-control-icon">
                    <i className="fas fa-chair"></i>
                    <select 
                      name="class"
                      value={flightSearch.class}
                      onChange={handleFlightInputChange}
                      className="form-select"
                    >
                      <option>Economy</option>
                      <option>Premium Economy</option>
                      <option>Business</option>
                      <option>First Class</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">&nbsp;</label>
                  <button type="submit" className="btn btn-secondary btn-block">
                    <i className="fas fa-search mr-2"></i> Search Flights
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Hotel Search Form */}
          {activeTab === 'hotels' && (
            <form className="search-form" onSubmit={(e) => { e.preventDefault(); setLocation('/hotels'); }}>
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">Destination</label>
                  <div className="form-control-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <input type="text" placeholder="City, area, or hotel" className="form-control" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Check-in</label>
                  <div className="form-control-icon">
                    <i className="far fa-calendar"></i>
                    <input type="date" className="form-control" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Check-out</label>
                  <div className="form-control-icon">
                    <i className="far fa-calendar"></i>
                    <input type="date" className="form-control" required />
                  </div>
                </div>
              </div>
              
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">Guests</label>
                  <div className="form-control-icon">
                    <i className="fas fa-user-friends"></i>
                    <select className="form-select">
                      <option>2 Adults, 0 Children</option>
                      <option>2 Adults, 1 Child</option>
                      <option>2 Adults, 2 Children</option>
                      <option>1 Adult</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">&nbsp;</label>
                  <button type="submit" className="btn btn-secondary btn-block">
                    <i className="fas fa-search mr-2"></i> Search Hotels
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Bus Search Form */}
          {activeTab === 'buses' && (
            <form className="search-form" onSubmit={(e) => { e.preventDefault(); setLocation('/buses'); }}>
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">From</label>
                  <div className="form-control-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <input type="text" placeholder="Departure City" className="form-control" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">To</label>
                  <div className="form-control-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <input type="text" placeholder="Arrival City" className="form-control" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <div className="form-control-icon">
                    <i className="far fa-calendar"></i>
                    <input type="date" className="form-control" required />
                  </div>
                </div>
              </div>
              
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">Passengers</label>
                  <div className="form-control-icon">
                    <i className="fas fa-users"></i>
                    <select className="form-select">
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3 Passengers</option>
                      <option>4+ Passengers</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">&nbsp;</label>
                  <button type="submit" className="btn btn-secondary btn-block">
                    <i className="fas fa-search mr-2"></i> Search Buses
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Train Search Form */}
          {activeTab === 'trains' && (
            <form className="search-form" onSubmit={(e) => { e.preventDefault(); setLocation('/trains'); }}>
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">From</label>
                  <div className="form-control-icon">
                    <i className="fas fa-subway"></i>
                    <input type="text" placeholder="Departure Station" className="form-control" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">To</label>
                  <div className="form-control-icon">
                    <i className="fas fa-subway"></i>
                    <input type="text" placeholder="Arrival Station" className="form-control" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <div className="form-control-icon">
                    <i className="far fa-calendar"></i>
                    <input type="date" className="form-control" required />
                  </div>
                </div>
              </div>
              
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">Passengers</label>
                  <div className="form-control-icon">
                    <i className="fas fa-users"></i>
                    <select className="form-select">
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3 Passengers</option>
                      <option>4+ Passengers</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Class</label>
                  <div className="form-control-icon">
                    <i className="fas fa-chair"></i>
                    <select className="form-select">
                      <option>Economy</option>
                      <option>Business</option>
                      <option>First Class</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">&nbsp;</label>
                  <button type="submit" className="btn btn-secondary btn-block">
                    <i className="fas fa-search mr-2"></i> Search Trains
                  </button>
                </div>
              </div>
            </form>
          )}
          
          {/* Package Search Form */}
          {activeTab === 'packages' && (
            <form className="search-form" onSubmit={(e) => { e.preventDefault(); setLocation('/packages'); }}>
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">Destination</label>
                  <div className="form-control-icon">
                    <i className="fas fa-globe"></i>
                    <input type="text" placeholder="Where do you want to go?" className="form-control" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Check-in</label>
                  <div className="form-control-icon">
                    <i className="far fa-calendar"></i>
                    <input type="date" className="form-control" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Check-out</label>
                  <div className="form-control-icon">
                    <i className="far fa-calendar"></i>
                    <input type="date" className="form-control" required />
                  </div>
                </div>
              </div>
              
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">Travelers</label>
                  <div className="form-control-icon">
                    <i className="fas fa-users"></i>
                    <select className="form-select">
                      <option>2 Adults, 0 Children</option>
                      <option>2 Adults, 1 Child</option>
                      <option>2 Adults, 2 Children</option>
                      <option>1 Adult</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Package Type</label>
                  <div className="form-control-icon">
                    <i className="fas fa-suitcase-rolling"></i>
                    <select className="form-select">
                      <option>All Inclusive</option>
                      <option>Flight + Hotel</option>
                      <option>Hotel + Activities</option>
                      <option>Cruise Package</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">&nbsp;</label>
                  <button type="submit" className="btn btn-secondary btn-block">
                    <i className="fas fa-search mr-2"></i> Search Packages
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
