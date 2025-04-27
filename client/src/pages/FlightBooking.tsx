import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import LoginModal from '../components/auth/LoginModal';
import SignupModal from '../components/auth/SignupModal';

const FlightBooking = () => {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { bookFlight, isLoading, error } = useBooking();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: '1',
    class: 'Economy'
  });
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState([
    { firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '' }
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
        departureDate: params.get('departure') || '',
        returnDate: params.get('return') || '',
        passengers: params.get('passengers')?.split(' ')[0] || '1',
        class: params.get('class') || 'Economy'
      });
      
      // Mock searching for flights
      setTimeout(() => {
        setFlights(generateMockFlights());
      }, 1000);
    }
    
    document.title = 'Flight Booking - TravelWorld';
  }, []);
  
  // Generate mock flight data
  const generateMockFlights = () => {
    return [
      {
        id: 'F1001',
        airline: 'GlobalAir',
        flightNumber: 'GA789',
        departureCity: searchParams.from,
        arrivalCity: searchParams.to,
        departureTime: '08:30',
        arrivalTime: '11:45',
        duration: '3h 15m',
        price: 249.99,
        currency: 'USD',
        stops: 0,
        aircraft: 'Boeing 737'
      },
      {
        id: 'F1002',
        airline: 'SkyLink',
        flightNumber: 'SL456',
        departureCity: searchParams.from,
        arrivalCity: searchParams.to,
        departureTime: '12:15',
        arrivalTime: '15:40',
        duration: '3h 25m',
        price: 199.99,
        currency: 'USD',
        stops: 1,
        aircraft: 'Airbus A320'
      },
      {
        id: 'F1003',
        airline: 'OceanicAir',
        flightNumber: 'OA123',
        departureCity: searchParams.from,
        arrivalCity: searchParams.to,
        departureTime: '16:40',
        arrivalTime: '19:50',
        duration: '3h 10m',
        price: 289.99,
        currency: 'USD',
        stops: 0,
        aircraft: 'Boeing 787'
      }
    ];
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Update URL with search parameters
    const queryParams = new URLSearchParams({
      from: searchParams.from,
      to: searchParams.to,
      departure: searchParams.departureDate,
      return: searchParams.returnDate || '',
      passengers: `${searchParams.passengers} Adult${parseInt(searchParams.passengers) > 1 ? 's' : ''}`,
      class: searchParams.class
    }).toString();
    
    setLocation(`/flights?${queryParams}`);
    
    // Reset flights and show loading
    setFlights([]);
    
    // Mock searching for flights
    setTimeout(() => {
      setFlights(generateMockFlights());
    }, 1000);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };
  
  const selectFlight = (flight) => {
    setSelectedFlight(flight);
    setBookingStep(2);
    
    // Generate passenger forms based on passenger count
    const count = parseInt(searchParams.passengers);
    if (count > 1) {
      const newPassengers = [];
      for (let i = 0; i < count; i++) {
        newPassengers.push({ firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '' });
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
      departureCity: selectedFlight.departureCity,
      arrivalCity: selectedFlight.arrivalCity,
      departureDate: searchParams.departureDate,
      returnDate: searchParams.returnDate || null,
      airline: selectedFlight.airline,
      flightNumber: selectedFlight.flightNumber,
      passengerCount: parseInt(searchParams.passengers),
      travelClass: searchParams.class,
      totalPrice: (selectedFlight.price * parseInt(searchParams.passengers)).toFixed(2),
      status: 'confirmed',
      paymentStatus: 'paid'
    };
    
    try {
      const response = await bookFlight(bookingData);
      
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
        <h1 className="text-3xl font-bold mb-6">Flight Booking</h1>
        
        {/* Flight Search Form */}
        <div className="card mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">Search Flights</h2>
            
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">From</label>
                  <div className="form-control-icon">
                    <i className="fas fa-plane-departure"></i>
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
                    <i className="fas fa-plane-arrival"></i>
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
                  <label className="form-label">Departure</label>
                  <div className="form-control-icon">
                    <i className="far fa-calendar"></i>
                    <input 
                      type="date" 
                      name="departureDate"
                      value={searchParams.departureDate}
                      onChange={handleInputChange}
                      className="form-control" 
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Return (Optional)</label>
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
              </div>
              
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">Passengers</label>
                  <div className="form-control-icon">
                    <i className="fas fa-user"></i>
                    <select 
                      name="passengers"
                      value={searchParams.passengers}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="1">1 Adult</option>
                      <option value="2">2 Adults</option>
                      <option value="3">3 Adults</option>
                      <option value="4">4 Adults</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Class</label>
                  <div className="form-control-icon">
                    <i className="fas fa-chair"></i>
                    <select 
                      name="class"
                      value={searchParams.class}
                      onChange={handleInputChange}
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
                  <button type="submit" className="btn btn-primary btn-block">
                    <i className="fas fa-search mr-2"></i> Search Flights
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Step Indicator */}
        {(flights.length > 0 || selectedFlight) && (
          <div className="flex justify-between mb-6 bg-white p-4 rounded-lg">
            <div className={`flex flex-col items-center ${bookingStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span>Select Flight</span>
            </div>
            <div className={`flex flex-col items-center ${bookingStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span>Passenger Details</span>
            </div>
            <div className={`flex flex-col items-center ${bookingStep >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span>Confirmation</span>
            </div>
          </div>
        )}
        
        {/* Step 1: Flight Results */}
        {bookingStep === 1 && (
          <>
            {flights.length === 0 && searchParams.from && searchParams.to ? (
              <div className="card p-6 text-center">
                <i className="fas fa-spinner fa-spin text-3xl text-primary mb-3"></i>
                <p>Searching for flights from {searchParams.from} to {searchParams.to}...</p>
              </div>
            ) : flights.length > 0 ? (
              <div className="card">
                <div className="card-body">
                  <h2 className="text-xl font-bold mb-4">Available Flights</h2>
                  
                  <div className="space-y-4">
                    {flights.map(flight => (
                      <div key={flight.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-wrap justify-between items-center">
                        <div className="mb-4 md:mb-0">
                          <div className="font-bold text-lg">{flight.airline}</div>
                          <div className="text-sm text-gray-600">Flight {flight.flightNumber} • {flight.aircraft}</div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
                          <div className="text-center mr-6">
                            <div className="text-lg font-bold">{flight.departureTime}</div>
                            <div className="text-sm text-gray-600">{flight.departureCity}</div>
                          </div>
                          
                          <div className="text-center mx-6">
                            <div className="text-sm text-gray-500">{flight.duration}</div>
                            <div className="relative w-20 h-px bg-gray-300 my-2">
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                            <div className="text-xs text-gray-500">
                              {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}
                            </div>
                          </div>
                          
                          <div className="text-center ml-6">
                            <div className="text-lg font-bold">{flight.arrivalTime}</div>
                            <div className="text-sm text-gray-600">{flight.arrivalCity}</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary mb-2">
                            ${flight.price.toFixed(2)}
                          </div>
                          <button 
                            className="btn btn-primary"
                            onClick={() => selectFlight(flight)}
                          >
                            Select Flight
                          </button>
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
        {bookingStep === 2 && selectedFlight && (
          <div className="card">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Passenger Details</h2>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-primary mb-2">Flight Summary</h3>
                <div className="grid md-grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Airline</p>
                    <p className="font-medium">{selectedFlight.airline} {selectedFlight.flightNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">{selectedFlight.departureCity} → {selectedFlight.arrivalCity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-medium">{searchParams.departureDate} at {selectedFlight.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Passengers</p>
                    <p className="font-medium">{searchParams.passengers} Adult{parseInt(searchParams.passengers) > 1 ? 's' : ''}, {searchParams.class}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="font-bold text-primary">${(selectedFlight.price * parseInt(searchParams.passengers)).toFixed(2)}</p>
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
                        <label className="form-label">Date of Birth</label>
                        <input 
                          type="date" 
                          className="form-control"
                          value={passenger.dob}
                          onChange={(e) => handlePassengerChange(index, 'dob', e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Nationality</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={passenger.nationality}
                          onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between mt-6">
                  <button 
                    type="button" 
                    className="btn btn-outline-primary"
                    onClick={() => setBookingStep(1)}
                  >
                    Back to Flights
                  </button>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Book Flight'}
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
              <p className="mb-4">Your flight has been booked successfully.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                <div className="grid md-grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Booking Reference</p>
                    <p className="font-bold">{bookingReference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Flight</p>
                    <p className="font-medium">{selectedFlight.airline} {selectedFlight.flightNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">{selectedFlight.departureCity} → {selectedFlight.arrivalCity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-medium">{searchParams.departureDate} at {selectedFlight.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Passengers</p>
                    <p className="font-medium">{searchParams.passengers} Adult{parseInt(searchParams.passengers) > 1 ? 's' : ''}, {searchParams.class}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Paid</p>
                    <p className="font-bold text-primary">${(selectedFlight.price * parseInt(searchParams.passengers)).toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <p className="mb-6 text-sm text-gray-600">
                A confirmation email has been sent to your email address. You can also view your booking in the "My Bookings" section.
              </p>
              
              <div className="flex justify-center space-x-4">
                <button 
                  className="btn btn-primary"
                  onClick={() => setLocation('/booking-history')}
                >
                  View My Bookings
                </button>
                
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setSelectedFlight(null);
                    setBookingStep(1);
                    setBookingSuccess(false);
                  }}
                >
                  Book Another Flight
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

export default FlightBooking;
