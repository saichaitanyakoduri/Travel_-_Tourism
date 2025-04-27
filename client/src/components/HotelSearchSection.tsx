import { useState } from 'react';
import { useLocation } from 'wouter';

const popularHotels = [
  {
    id: 1,
    name: 'Grand Luxury Resort',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    rating: 4.8,
    price: '$299'
  },
  {
    id: 2,
    name: 'Seaside Boutique Hotel',
    location: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    rating: 4.7,
    price: '$179'
  },
  {
    id: 3,
    name: 'Alpine Mountain Lodge',
    location: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    rating: 4.9,
    price: '$225'
  }
];

const HotelSearchSection = () => {
  const [, setLocation] = useLocation();
  const [hotelSearch, setHotelSearch] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Adults, 0 Children',
    rooms: '1 Room',
    propertyType: 'All Types'
  });
  
  const handleHotelInputChange = (e) => {
    const { name, value } = e.target;
    setHotelSearch({
      ...hotelSearch,
      [name]: value
    });
  };
  
  const handleHotelSubmit = (e) => {
    e.preventDefault();
    // Redirect to hotels page with search params
    const queryParams = new URLSearchParams({
      destination: hotelSearch.destination,
      checkin: hotelSearch.checkIn,
      checkout: hotelSearch.checkOut,
      guests: hotelSearch.guests,
      rooms: hotelSearch.rooms,
      type: hotelSearch.propertyType
    }).toString();
    
    setLocation(`/hotels?${queryParams}`);
  };
  
  return (
    <section id="hotels" className="py-16 relative bg-white">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-accent to-primary opacity-90"></div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Find Your Perfect Stay</h2>
          <p className="text-white opacity-90">From luxury resorts to cozy boutique hotels, find accommodations that fit your style and budget</p>
        </div>
        
        <div className="search-box">
          {/* Hotel Search Form */}
          <form id="hotelSearchForm" onSubmit={handleHotelSubmit} className="search-form">
            <div className="search-form-row">
              <div className="form-group">
                <label className="form-label">Destination</label>
                <div className="form-control-icon">
                  <i className="fas fa-map-marker-alt"></i>
                  <input 
                    type="text" 
                    name="destination"
                    value={hotelSearch.destination}
                    onChange={handleHotelInputChange}
                    placeholder="City, area, or hotel" 
                    className="form-control" 
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Check-in</label>
                <div className="form-control-icon">
                  <i className="far fa-calendar"></i>
                  <input 
                    type="date" 
                    name="checkIn"
                    value={hotelSearch.checkIn}
                    onChange={handleHotelInputChange}
                    className="form-control" 
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Check-out</label>
                <div className="form-control-icon">
                  <i className="far fa-calendar"></i>
                  <input 
                    type="date" 
                    name="checkOut"
                    value={hotelSearch.checkOut}
                    onChange={handleHotelInputChange}
                    className="form-control" 
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="search-form-row">
              <div className="form-group">
                <label className="form-label">Guests</label>
                <div className="form-control-icon">
                  <i className="fas fa-user-friends"></i>
                  <select 
                    name="guests"
                    value={hotelSearch.guests}
                    onChange={handleHotelInputChange}
                    className="form-select"
                  >
                    <option>2 Adults, 0 Children</option>
                    <option>2 Adults, 1 Child</option>
                    <option>2 Adults, 2 Children</option>
                    <option>1 Adult</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Rooms</label>
                <div className="form-control-icon">
                  <i className="fas fa-door-open"></i>
                  <select 
                    name="rooms"
                    value={hotelSearch.rooms}
                    onChange={handleHotelInputChange}
                    className="form-select"
                  >
                    <option>1 Room</option>
                    <option>2 Rooms</option>
                    <option>3 Rooms</option>
                    <option>4+ Rooms</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Property Type</label>
                <div className="form-control-icon">
                  <i className="fas fa-building"></i>
                  <select 
                    name="propertyType"
                    value={hotelSearch.propertyType}
                    onChange={handleHotelInputChange}
                    className="form-select"
                  >
                    <option>All Types</option>
                    <option>Hotels</option>
                    <option>Resorts</option>
                    <option>Apartments</option>
                    <option>Villas</option>
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
          
          {/* Featured Hotels Preview */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-bold mb-6">Popular Hotels</h3>
            <div className="grid md-grid-cols-3 gap-4">
              {popularHotels.map(hotel => (
                <div key={hotel.id} className="card">
                  <div className="card-image h-40">
                    <img src={hotel.image} alt={hotel.name} />
                    <div className="absolute top-2 right-2 bg-white text-xs font-bold py-1 px-2 rounded">
                      {hotel.rating} <i className="fas fa-star text-warning ml-1"></i>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <h4 className="font-bold mb-1">{hotel.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      <i className="fas fa-map-marker-alt text-secondary mr-1"></i> {hotel.location}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-secondary font-bold">
                        {hotel.price}<span className="text-xs text-gray-500 font-normal">/night</span>
                      </p>
                      <button 
                        className="btn btn-sm" 
                        style={{backgroundColor: 'rgba(255, 125, 0, 0.1)', color: 'var(--secondary)'}}
                        onClick={() => setLocation(`/hotels/${hotel.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelSearchSection;
