import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import LoginModal from '../components/auth/LoginModal';
import SignupModal from '../components/auth/SignupModal';

const HotelBooking = () => {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { bookHotel, isLoading, error } = useBooking();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Adults, 0 Children',
    rooms: '1',
    propertyType: 'All Types'
  });
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  
  // Parse URL search parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('destination')) {
      setSearchParams({
        destination: params.get('destination') || '',
        checkIn: params.get('checkin') || '',
        checkOut: params.get('checkout') || '',
        guests: params.get('guests') || '2 Adults, 0 Children',
        rooms: params.get('rooms')?.split(' ')[0] || '1',
        propertyType: params.get('type') || 'All Types'
      });
      
      // Mock searching for hotels
      setTimeout(() => {
        setHotels(generateMockHotels());
      }, 1000);
    }
    
    document.title = 'Hotel Booking - TravelWorld';
  }, []);
  
  // Generate mock hotel data
  const generateMockHotels = () => {
    return [
      {
        id: 'H1001',
        name: 'Grand Luxury Resort',
        location: searchParams.destination,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        rating: 4.8,
        reviews: 523,
        price: 299,
        currency: 'USD',
        amenities: ['Free WiFi', 'Swimming Pool', 'Spa', 'Fitness Center', 'Restaurant'],
        description: 'Experience luxury at its finest with our spacious rooms, world-class amenities, and breathtaking views.',
        rooms: [
          {
            id: 'R1',
            type: 'Deluxe Room',
            price: 299,
            capacity: 2,
            beds: '1 King Bed',
            size: '40 m²',
            features: ['Ocean View', 'Free WiFi', 'Mini Bar']
          },
          {
            id: 'R2',
            type: 'Executive Suite',
            price: 499,
            capacity: 3,
            beds: '1 King Bed + 1 Sofa Bed',
            size: '65 m²',
            features: ['Ocean View', 'Free WiFi', 'Mini Bar', 'Jacuzzi']
          }
        ]
      },
      {
        id: 'H1002',
        name: 'Seaside Boutique Hotel',
        location: searchParams.destination,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
        rating: 4.7,
        reviews: 329,
        price: 179,
        currency: 'USD',
        amenities: ['Free WiFi', 'Beachfront', 'Restaurant', 'Bar'],
        description: 'A charming boutique hotel located steps away from the beach with personalized service and unique rooms.',
        rooms: [
          {
            id: 'R1',
            type: 'Standard Room',
            price: 179,
            capacity: 2,
            beds: '1 Queen Bed',
            size: '30 m²',
            features: ['Partial Sea View', 'Free WiFi']
          },
          {
            id: 'R2',
            type: 'Premium Room',
            price: 249,
            capacity: 2,
            beds: '1 King Bed',
            size: '35 m²',
            features: ['Sea View', 'Free WiFi', 'Balcony']
          }
        ]
      },
      {
        id: 'H1003',
        name: 'Alpine Mountain Lodge',
        location: searchParams.destination,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        rating: 4.9,
        reviews: 412,
        price: 225,
        currency: 'USD',
        amenities: ['Free WiFi', 'Ski-in/Ski-out', 'Fireplace', 'Restaurant', 'Spa'],
        description: 'Nestled in the mountains, our lodge offers cozy accommodations with stunning views and easy access to outdoor activities.',
        rooms: [
          {
            id: 'R1',
            type: 'Mountain View Room',
            price: 225,
            capacity: 2,
            beds: '2 Twin Beds',
            size: '35 m²',
            features: ['Mountain View', 'Free WiFi', 'Fireplace']
          },
          {
            id: 'R2',
            type: 'Alpine Suite',
            price: 350,
            capacity: 4,
            beds: '1 King Bed + 2 Twin Beds',
            size: '55 m²',
            features: ['Mountain View', 'Free WiFi', 'Fireplace', 'Kitchenette']
          }
        ]
      }
    ];
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Update URL with search parameters
    const queryParams = new URLSearchParams({
      destination: searchParams.destination,
      checkin: searchParams.checkIn,
      checkout: searchParams.checkOut,
      guests: searchParams.guests,
      rooms: `${searchParams.rooms} Room${parseInt(searchParams.rooms) > 1 ? 's' : ''}`,
      type: searchParams.propertyType
    }).toString();
    
    setLocation(`/hotels?${queryParams}`);
    
    // Reset hotels and show loading
    setHotels([]);
    
    // Mock searching for hotels
    setTimeout(() => {
      setHotels(generateMockHotels());
    }, 1000);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };
  
  const selectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setBookingStep(2);
  };
  
  const selectRoom = (room) => {
    setSelectedRoom(room);
    setBookingStep(3);
  };
  
  const handleGuestDetailChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails({
      ...guestDetails,
      [name]: value
    });
  };
  
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    // Create booking data
    const bookingData = {
      hotelName: selectedHotel.name,
      location: selectedHotel.location,
      checkInDate: searchParams.checkIn,
      checkOutDate: searchParams.checkOut,
      roomType: selectedRoom.type,
      guestCount: parseInt(searchParams.guests.split(' ')[0]),
      roomCount: parseInt(searchParams.rooms),
      totalPrice: calculateTotalPrice(),
      status: 'confirmed',
      paymentStatus: 'paid'
    };
    
    try {
      const response = await bookHotel(bookingData);
      
      if (response && response.booking) {
        setBookingSuccess(true);
        setBookingReference(response.booking.id.toString());
        setBookingStep(4);
      }
    } catch (err) {
      console.error('Booking error:', err);
    }
  };
  
  const calculateTotalPrice = () => {
    if (!selectedRoom) return 0;
    
    const checkInDate = new Date(searchParams.checkIn);
    const checkOutDate = new Date(searchParams.checkOut);
    const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const roomCount = parseInt(searchParams.rooms);
    
    return (selectedRoom.price * nights * roomCount).toFixed(2);
  };
  
  // Calculate stay duration in nights
  const calculateNights = () => {
    if (!searchParams.checkIn || !searchParams.checkOut) return 1;
    
    const checkInDate = new Date(searchParams.checkIn);
    const checkOutDate = new Date(searchParams.checkOut);
    return Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  };
  
  const nights = calculateNights();
  
  return (
    <div className="py-16 bg-neutral-light">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Hotel Booking</h1>
        
        {/* Hotel Search Form */}
        <div className="card mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">Search Hotels</h2>
            
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">Destination</label>
                  <div className="form-control-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <input 
                      type="text" 
                      name="destination"
                      value={searchParams.destination}
                      onChange={handleInputChange}
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
                      value={searchParams.checkIn}
                      onChange={handleInputChange}
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
                      value={searchParams.checkOut}
                      onChange={handleInputChange}
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
                      value={searchParams.guests}
                      onChange={handleInputChange}
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
                      value={searchParams.rooms}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="1">1 Room</option>
                      <option value="2">2 Rooms</option>
                      <option value="3">3 Rooms</option>
                      <option value="4">4 Rooms</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Property Type</label>
                  <div className="form-control-icon">
                    <i className="fas fa-building"></i>
                    <select 
                      name="propertyType"
                      value={searchParams.propertyType}
                      onChange={handleInputChange}
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
                  <button type="submit" className="btn btn-block" style={{backgroundColor: 'var(--secondary)', color: 'white'}}>
                    <i className="fas fa-search mr-2"></i> Search Hotels
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Step Indicator */}
        {(hotels.length > 0 || selectedHotel) && (
          <div className="flex justify-between mb-6 bg-white p-4 rounded-lg">
            <div className={`flex flex-col items-center ${bookingStep >= 1 ? 'text-secondary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 1 ? 'bg-secondary text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span>Choose Hotel</span>
            </div>
            <div className={`flex flex-col items-center ${bookingStep >= 2 ? 'text-secondary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 2 ? 'bg-secondary text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span>Select Room</span>
            </div>
            <div className={`flex flex-col items-center ${bookingStep >= 3 ? 'text-secondary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 3 ? 'bg-secondary text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span>Guest Details</span>
            </div>
            <div className={`flex flex-col items-center ${bookingStep >= 4 ? 'text-secondary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 4 ? 'bg-secondary text-white' : 'bg-gray-200'}`}>
                4
              </div>
              <span>Confirmation</span>
            </div>
          </div>
        )}
        
        {/* Step 1: Hotel Results */}
        {bookingStep === 1 && (
          <>
            {hotels.length === 0 && searchParams.destination ? (
              <div className="card p-6 text-center">
                <i className="fas fa-spinner fa-spin text-3xl text-secondary mb-3"></i>
                <p>Searching for hotels in {searchParams.destination}...</p>
              </div>
            ) : hotels.length > 0 ? (
              <div className="card">
                <div className="card-body">
                  <h2 className="text-xl font-bold mb-4">Available Hotels</h2>
                  
                  <div className="space-y-6">
                    {hotels.map(hotel => (
                      <div key={hotel.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <div className="grid md-grid-cols-3 gap-4">
                          <div className="h-64 md:h-auto">
                            <img 
                              src={hotel.image} 
                              alt={hotel.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4 col-span-2">
                            <div className="flex justify-between mb-2">
                              <h3 className="text-xl font-bold">{hotel.name}</h3>
                              <div className="flex items-center">
                                <span className="bg-primary text-white px-2 py-1 rounded-lg font-bold mr-2">{hotel.rating}</span>
                                <span className="text-sm text-gray-600">{hotel.reviews} reviews</span>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-3">
                              <i className="fas fa-map-marker-alt text-secondary mr-1"></i> {hotel.location}
                            </p>
                            
                            <p className="mb-4">{hotel.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {hotel.amenities.map((amenity, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center mt-4">
                              <div>
                                <span className="text-2xl font-bold text-secondary">${hotel.price}</span>
                                <span className="text-sm text-gray-600">/night</span>
                              </div>
                              
                              <button 
                                className="btn"
                                style={{backgroundColor: 'var(--secondary)', color: 'white'}}
                                onClick={() => selectHotel(hotel)}
                              >
                                Select Hotel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
        
        {/* Step 2: Room Selection */}
        {bookingStep === 2 && selectedHotel && (
          <div className="card">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Select a Room at {selectedHotel.name}</h2>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-secondary mb-2">Booking Summary</h3>
                <div className="grid md-grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Hotel</p>
                    <p className="font-medium">{selectedHotel.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{selectedHotel.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">{searchParams.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">{searchParams.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">{searchParams.guests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rooms</p>
                    <p className="font-medium">{searchParams.rooms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Stay</p>
                    <p className="font-medium">{nights} night{nights > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {selectedHotel.rooms.map(room => (
                  <div key={room.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="grid md-grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <h3 className="text-lg font-bold mb-2">{room.type}</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-500">Room Size</p>
                            <p className="font-medium">{room.size}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Capacity</p>
                            <p className="font-medium">{room.capacity} guests</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Bed Type</p>
                            <p className="font-medium">{room.beds}</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Room Features:</p>
                          <div className="flex flex-wrap gap-2">
                            {room.features.map((feature, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center items-end">
                        <div className="mb-2 text-right">
                          <p className="text-2xl font-bold text-secondary">${room.price}</p>
                          <p className="text-sm text-gray-600">per night</p>
                          <p className="font-medium">
                            ${(room.price * nights * parseInt(searchParams.rooms)).toFixed(2)} total
                          </p>
                        </div>
                        
                        <button 
                          className="btn"
                          style={{backgroundColor: 'var(--secondary)', color: 'white'}}
                          onClick={() => selectRoom(room)}
                        >
                          Select Room
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setBookingStep(1)}
                >
                  <i className="fas fa-arrow-left mr-2"></i> Back to Hotels
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Guest Details */}
        {bookingStep === 3 && selectedHotel && selectedRoom && (
          <div className="card">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Guest Details</h2>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-secondary mb-2">Booking Summary</h3>
                <div className="grid md-grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Hotel</p>
                    <p className="font-medium">{selectedHotel.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Room Type</p>
                    <p className="font-medium">{selectedRoom.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-in/Check-out</p>
                    <p className="font-medium">{searchParams.checkIn} to {searchParams.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">{searchParams.guests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rooms</p>
                    <p className="font-medium">{searchParams.rooms} room{parseInt(searchParams.rooms) > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{nights} night{nights > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="font-bold text-secondary">
                      ${(selectedRoom.price * nights * parseInt(searchParams.rooms)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleBookingSubmit}>
                <div className="grid md-grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={guestDetails.firstName}
                      onChange={handleGuestDetailChange}
                      className="form-control" 
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={guestDetails.lastName}
                      onChange={handleGuestDetailChange}
                      className="form-control" 
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={guestDetails.email}
                      onChange={handleGuestDetailChange}
                      className="form-control" 
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={guestDetails.phone}
                      onChange={handleGuestDetailChange}
                      className="form-control" 
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Special Requests (Optional)</label>
                  <textarea 
                    name="specialRequests"
                    value={guestDetails.specialRequests}
                    onChange={handleGuestDetailChange}
                    className="form-control" 
                    rows={3}
                  ></textarea>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary"
                    onClick={() => setBookingStep(2)}
                  >
                    Back to Room Selection
                  </button>
                  
                  <button 
                    type="submit" 
                    className="btn"
                    style={{backgroundColor: 'var(--secondary)', color: 'white'}}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Complete Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Step 4: Booking Confirmation */}
        {bookingStep === 4 && bookingSuccess && (
          <div className="card">
            <div className="card-body text-center">
              <div className="text-success text-5xl mb-4">
                <i className="fas fa-check-circle"></i>
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="mb-4">Your hotel reservation has been booked successfully.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                <div className="grid md-grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Booking Reference</p>
                    <p className="font-bold">{bookingReference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hotel</p>
                    <p className="font-medium">{selectedHotel.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{selectedHotel.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Room Type</p>
                    <p className="font-medium">{selectedRoom.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">{searchParams.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">{searchParams.checkOut}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">{searchParams.guests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rooms</p>
                    <p className="font-medium">{searchParams.rooms} room{parseInt(searchParams.rooms) > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{nights} night{nights > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Paid</p>
                    <p className="font-bold text-secondary">
                      ${(selectedRoom.price * nights * parseInt(searchParams.rooms)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="mb-6 text-sm text-gray-600">
                A confirmation email has been sent to your email address. You can also view your booking in the "My Bookings" section.
              </p>
              
              <div className="flex justify-center space-x-4">
                <button 
                  className="btn"
                  style={{backgroundColor: 'var(--secondary)', color: 'white'}}
                  onClick={() => setLocation('/booking-history')}
                >
                  View My Bookings
                </button>
                
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setSelectedHotel(null);
                    setSelectedRoom(null);
                    setBookingStep(1);
                    setBookingSuccess(false);
                  }}
                >
                  Book Another Hotel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Display errors */}
        {error && (
          <div className="alert alert-error mt-4">
            {error}
          </div>
        )}
        
        {/* Auth Modals */}
        {isLoginModalOpen && (
          <LoginModal 
            onClose={() => setIsLoginModalOpen(false)} 
            onSignupClick={() => {
              setIsLoginModalOpen(false);
              setIsSignupModalOpen(true);
            }}
          />
        )}
        
        {isSignupModalOpen && (
          <SignupModal 
            onClose={() => setIsSignupModalOpen(false)} 
            onLoginClick={() => {
              setIsSignupModalOpen(false);
              setIsLoginModalOpen(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HotelBooking;
