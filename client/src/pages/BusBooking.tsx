import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import LoginModal from '../components/auth/LoginModal';
import SignupModal from '../components/auth/SignupModal';

const BusBooking = () => {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { bookBus, isLoading, error } = useBooking();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    returnDate: '',
    passengers: '1'
  });
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState([
    { firstName: '', lastName: '', email: '', phone: '', type: 'Adult' }
  ]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  
  // Parse URL search parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('from')) {
      setSearchParams({
        from: params.get('from') || '',
        to: params.get('to') || '',
        date: params.get('date') || '',
        returnDate: params.get('return') || '',
        passengers: params.get('passengers') || '1'
      });
      
      // Mock searching for buses
      setTimeout(() => {
        setBuses(generateMockBuses());
      }, 1000);
    }
    
    document.title = 'Bus Booking - TravelWorld';
  }, []);
  
  // Generate mock bus data
  const generateMockBuses = () => {
    return [
      {
        id: 'B1001',
        operator: 'Express Lines',
        busType: 'Luxury Coach',
        departureCity: searchParams.from,
        arrivalCity: searchParams.to,
        departureTime: '08:30',
        arrivalTime: '12:15',
        duration: '3h 45m',
        price: 49.99,
        currency: 'USD',
        features: ['WiFi', 'Power Outlets', 'Reclining Seats', 'Air Conditioning'],
        availableSeats: 24
      },
      {
        id: 'B1002',
        operator: 'City Connect',
        busType: 'Standard',
        departureCity: searchParams.from,
        arrivalCity: searchParams.to,
        departureTime: '10:45',
        arrivalTime: '14:30',
        duration: '3h 45m',
        price: 29.99,
        currency: 'USD',
        features: ['Air Conditioning', 'Restroom'],
        availableSeats: 18
      },
      {
        id: 'B1003',
        operator: 'Premium Bus Co',
        busType: 'Executive Luxury',
        departureCity: searchParams.from,
        arrivalCity: searchParams.to,
        departureTime: '14:15',
        arrivalTime: '17:45',
        duration: '3h 30m',
        price: 69.99,
        currency: 'USD',
        features: ['WiFi', 'Power Outlets', 'Reclining Seats', 'Entertainment System', 'Complimentary Snacks', 'Restroom'],
        availableSeats: 12
      }
    ];
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Update URL with search parameters
    const queryParams = new URLSearchParams({
      from: searchParams.from,
      to: searchParams.to,
      date: searchParams.date,
      return: searchParams.returnDate || '',
      passengers: searchParams.passengers
    }).toString();
    
    setLocation(`/buses?${queryParams}`);
    
    // Reset buses and show loading
    setBuses([]);
    
    // Mock searching for buses
    setTimeout(() => {
      setBuses(generateMockBuses());
    }, 1000);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };
  
  const selectBus = (bus) => {
    setSelectedBus(bus);
    setBookingStep(2);
    
    // Generate passenger forms based on passenger count
    const count = parseInt(searchParams.passengers);
    if (count > 1) {
      const newPassengers = [];
      for (let i = 0; i < count; i++) {
        newPassengers.push({ firstName: '', lastName: '', email: '', phone: '', type: 'Adult' });
      }
      setPassengerDetails(newPassengers);
    }
  };
  
  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengerDetails(updatedPassengers);
  };
  
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    // Create booking data
    const bookingData = {
      departureCity: selectedBus.departureCity,
      arrivalCity: selectedBus.arrivalCity,
      departureDate: searchParams.date,
      returnDate: searchParams.returnDate || null,
      busOperator: selectedBus.operator,
      busType: selectedBus.busType,
      passengerCount: parseInt(searchParams.passengers),
      totalPrice: (selectedBus.price * parseInt(searchParams.passengers)).toFixed(2),
      status: 'confirmed',
      paymentStatus: 'paid'
    };
    
    try {
      const response = await bookBus(bookingData);
      
      if (response && response.booking) {
        setBookingSuccess(true);
        setBookingReference(response.booking.id.toString());
        setBookingStep(3);
      }
    } catch (err) {
      console.error('Booking error:', err);
    }
  };
  
  return (
    <div className="py-16 bg-neutral-light">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Bus Booking</h1>
        
        {/* Bus Search Form */}
        <div className="card mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">Search Buses</h2>
            
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">From</label>
                  <div className="form-control-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <input 
                      type="text" 
                      name="from"
                      value={searchParams.from}
                      onChange={handleInputChange}
                      placeholder="Departure City" 
                      className="form-control" 
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">To</label>
                  <div className="form-control-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <input 
                      type="text" 
                      name="to"
                      value={searchParams.to}
                      onChange={handleInputChange}
                      placeholder="Arrival City" 
                      className="form-control" 
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <div className="form-control-icon">
                    <i className="far fa-calendar"></i>
                    <input 
                      type="date" 
                      name="date"
                      value={searchParams.date}
                      onChange={handleInputChange}
                      className="form-control" 
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">Return Date (Optional)</label>
                  <div className="form-control-icon">
                    <i className="far fa-calendar"></i>
                    <input 
                      type="date" 
                      name="returnDate"
                      value={searchParams.returnDate}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Passengers</label>
                  <div className="form-control-icon">
                    <i className="fas fa-users"></i>
                    <select 
                      name="passengers"
                      value={searchParams.passengers}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="1">1 Passenger</option>
                      <option value="2">2 Passengers</option>
                      <option value="3">3 Passengers</option>
                      <option value="4">4 Passengers</option>
                      <option value="5">5 Passengers</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">&nbsp;</label>
                  <button type="submit" className="btn btn-block" style={{backgroundColor: 'var(--accent)', color: 'white'}}>
                    <i className="fas fa-search mr-2"></i> Search Buses
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Step Indicator */}
        {(buses.length > 0 || selectedBus) && (
          <div className="flex justify-between mb-6 bg-white p-4 rounded-lg">
            <div className={`flex flex-col items-center ${bookingStep >= 1 ? 'text-accent' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 1 ? 'bg-accent text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span>Select Bus</span>
            </div>
            <div className={`flex flex-col items-center ${bookingStep >= 2 ? 'text-accent' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 2 ? 'bg-accent text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span>Passenger Details</span>
            </div>
            <div className={`flex flex-col items-center ${bookingStep >= 3 ? 'text-accent' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 3 ? 'bg-accent text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span>Confirmation</span>
            </div>
          </div>
        )}
        
        {/* Step 1: Bus Results */}
        {bookingStep === 1 && (
          <>
            {buses.length === 0 && searchParams.from && searchParams.to ? (
              <div className="card p-6 text-center">
                <i className="fas fa-spinner fa-spin text-3xl text-accent mb-3"></i>
                <p>Searching for buses from {searchParams.from} to {searchParams.to}...</p>
              </div>
            ) : buses.length > 0 ? (
              <div className="card">
                <div className="card-body">
                  <h2 className="text-xl font-bold mb-4">Available Buses</h2>
                  
                  <div className="space-y-4">
                    {buses.map(bus => (
                      <div key={bus.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="grid md-grid-cols-3 gap-4">
                          <div>
                            <h3 className="text-lg font-bold">{bus.operator}</h3>
                            <p className="text-sm text-gray-600 mb-2">{bus.busType}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {bus.features.map((feature, index) => (
                                <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                  {feature}
                                </span>
                              ))}
                            </div>
                            
                            <div className="text-sm">
                              <span className="text-green-600 font-medium">{bus.availableSeats} seats available</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row items-center">
                            <div className="text-center mr-6">
                              <div className="text-lg font-bold">{bus.departureTime}</div>
                              <div className="text-sm text-gray-600">{bus.departureCity}</div>
                            </div>
                            
                            <div className="text-center mx-6">
                              <div className="text-sm text-gray-500">{bus.duration}</div>
                              <div className="relative w-20 h-px bg-gray-300 my-2">
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
                              </div>
                              <div className="text-xs text-gray-500">Direct</div>
                            </div>
                            
                            <div className="text-center ml-6">
                              <div className="text-lg font-bold">{bus.arrivalTime}</div>
                              <div className="text-sm text-gray-600">{bus.arrivalCity}</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end justify-center">
                            <div className="text-2xl font-bold text-accent mb-2">
                              ${bus.price.toFixed(2)}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">per passenger</p>
                            <button 
                              className="btn"
                              style={{backgroundColor: 'var(--accent)', color: 'white'}}
                              onClick={() => selectBus(bus)}
                            >
                              Select Bus
                            </button>
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
        
        {/* Step 2: Passenger Details */}
        {bookingStep === 2 && selectedBus && (
          <div className="card">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Passenger Details</h2>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-accent mb-2">Trip Summary</h3>
                <div className="grid md-grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Bus Operator</p>
                    <p className="font-medium">{selectedBus.operator} ({selectedBus.busType})</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">{selectedBus.departureCity} → {selectedBus.arrivalCity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-medium">{searchParams.date} at {selectedBus.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{selectedBus.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Passengers</p>
                    <p className="font-medium">{searchParams.passengers} Passenger{parseInt(searchParams.passengers) > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="font-bold text-accent">${(selectedBus.price * parseInt(searchParams.passengers)).toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleBookingSubmit}>
                {passengerDetails.map((passenger, index) => (
                  <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-bold mb-4">Passenger {index + 1}</h3>
                    
                    <div className="grid md-grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={passenger.firstName}
                          onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={passenger.lastName}
                          onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-control"
                          value={passenger.email}
                          onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                          required={index === 0} // Only require email for primary passenger
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-control"
                          value={passenger.phone}
                          onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                          required={index === 0} // Only require phone for primary passenger
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Passenger Type</label>
                        <select 
                          className="form-select"
                          value={passenger.type}
                          onChange={(e) => handlePassengerChange(index, 'type', e.target.value)}
                        >
                          <option value="Adult">Adult</option>
                          <option value="Child">Child</option>
                          <option value="Senior">Senior</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between mt-6">
                  <button 
                    type="button" 
                    className="btn btn-outline-accent"
                    onClick={() => setBookingStep(1)}
                  >
                    Back to Buses
                  </button>
                  
                  <button 
                    type="submit" 
                    className="btn"
                    style={{backgroundColor: 'var(--accent)', color: 'white'}}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Complete Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Step 3: Booking Confirmation */}
        {bookingStep === 3 && bookingSuccess && (
          <div className="card">
            <div className="card-body text-center">
              <div className="text-success text-5xl mb-4">
                <i className="fas fa-check-circle"></i>
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="mb-4">Your bus ticket has been booked successfully.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                <div className="grid md-grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Booking Reference</p>
                    <p className="font-bold">{bookingReference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bus Operator</p>
                    <p className="font-medium">{selectedBus.operator}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bus Type</p>
                    <p className="font-medium">{selectedBus.busType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">{selectedBus.departureCity} → {selectedBus.arrivalCity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-medium">{searchParams.date} at {selectedBus.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Arrival</p>
                    <p className="font-medium">{searchParams.date} at {selectedBus.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Passengers</p>
                    <p className="font-medium">{searchParams.passengers} Passenger{parseInt(searchParams.passengers) > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Paid</p>
                    <p className="font-bold text-accent">${(selectedBus.price * parseInt(searchParams.passengers)).toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <p className="mb-6 text-sm text-gray-600">
                A confirmation email has been sent to your email address. You can also view your booking in the "My Bookings" section.
              </p>
              
              <div className="flex justify-center space-x-4">
                <button 
                  className="btn"
                  style={{backgroundColor: 'var(--accent)', color: 'white'}}
                  onClick={() => setLocation('/booking-history')}
                >
                  View My Bookings
                </button>
                
                <button 
                  className="btn btn-outline-accent"
                  onClick={() => {
                    setSelectedBus(null);
                    setBookingStep(1);
                    setBookingSuccess(false);
                  }}
                >
                  Book Another Bus
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

export default BusBooking;
