import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import LoginModal from '../components/auth/LoginModal';
import SignupModal from '../components/auth/SignupModal';

const TrainBooking = () => {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const { bookTrain, isLoading, error } = useBooking();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    returnDate: '',
    passengers: '1',
    class: 'Economy'
  });
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState([
    { firstName: '', lastName: '', email: '', phone: '', age: '', idNumber: '' }
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
        passengers: params.get('passengers') || '1',
        class: params.get('class') || 'Economy'
      });
      
      // Mock searching for trains
      setTimeout(() => {
        setTrains(generateMockTrains());
      }, 1000);
    }
    
    document.title = 'Train Booking - TravelWorld';
  }, []);
  
  // Generate mock train data
  const generateMockTrains = () => {
    return [
      {
        id: 'T1001',
        operator: 'Express Railways',
        trainNumber: 'ER403',
        departureStation: searchParams.from,
        arrivalStation: searchParams.to,
        departureTime: '09:15',
        arrivalTime: '13:45',
        duration: '4h 30m',
        price: 79.99,
        currency: 'USD',
        travelClass: ['Economy', 'Business', 'First Class'],
        availableSeats: {
          'Economy': 56,
          'Business': 24,
          'First Class': 12
        }
      },
      {
        id: 'T1002',
        operator: 'National Rail',
        trainNumber: 'NR217',
        departureStation: searchParams.from,
        arrivalStation: searchParams.to,
        departureTime: '11:30',
        arrivalTime: '15:45',
        duration: '4h 15m',
        price: 59.99,
        currency: 'USD',
        travelClass: ['Economy', 'Business'],
        availableSeats: {
          'Economy': 72,
          'Business': 18
        }
      },
      {
        id: 'T1003',
        operator: 'Rapid Transit',
        trainNumber: 'RT105',
        departureStation: searchParams.from,
        arrivalStation: searchParams.to,
        departureTime: '15:45',
        arrivalTime: '19:50',
        duration: '4h 05m',
        price: 89.99,
        currency: 'USD',
        travelClass: ['Economy', 'Business', 'First Class'],
        availableSeats: {
          'Economy': 48,
          'Business': 20,
          'First Class': 8
        }
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
      passengers: searchParams.passengers,
      class: searchParams.class
    }).toString();
    
    setLocation(`/trains?${queryParams}`);
    
    // Reset trains and show loading
    setTrains([]);
    
    // Mock searching for trains
    setTimeout(() => {
      setTrains(generateMockTrains());
    }, 1000);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };
  
  const selectTrain = (train) => {
    setSelectedTrain(train);
    setBookingStep(2);
    
    // Generate passenger forms based on passenger count
    const count = parseInt(searchParams.passengers);
    if (count > 1) {
      const newPassengers = [];
      for (let i = 0; i < count; i++) {
        newPassengers.push({ firstName: '', lastName: '', email: '', phone: '', age: '', idNumber: '' });
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
      departureStation: selectedTrain.departureStation,
      arrivalStation: selectedTrain.arrivalStation,
      departureDate: searchParams.date,
      returnDate: searchParams.returnDate || null,
      trainOperator: selectedTrain.operator,
      trainNumber: selectedTrain.trainNumber,
      passengerCount: parseInt(searchParams.passengers),
      travelClass: searchParams.class,
      totalPrice: (getClassPrice(selectedTrain, searchParams.class) * parseInt(searchParams.passengers)).toFixed(2),
      status: 'confirmed',
      paymentStatus: 'paid'
    };
    
    try {
      const response = await bookTrain(bookingData);
      
      if (response && response.booking) {
        setBookingSuccess(true);
        setBookingReference(response.booking.id.toString());
        setBookingStep(3);
      }
    } catch (err) {
      console.error('Booking error:', err);
    }
  };
  
  // Get price for specific travel class
  const getClassPrice = (train, travelClass) => {
    const basePrices = {
      'Economy': train.price,
      'Business': train.price * 1.7,
      'First Class': train.price * 2.5
    };
    
    return basePrices[travelClass] || train.price;
  };
  
  return (
    <div className="py-16 bg-neutral-light">
      <div className="container">
        <h1 className="text-3xl font-bold mb-6">Train Booking</h1>
        
        {/* Train Search Form */}
        <div className="card mb-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">Search Trains</h2>
            
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-form-row">
                <div className="form-group">
                  <label className="form-label">From</label>
                  <div className="form-control-icon">
                    <i className="fas fa-subway"></i>
                    <input 
                      type="text" 
                      name="from"
                      value={searchParams.from}
                      onChange={handleInputChange}
                      placeholder="Departure Station" 
                      className="form-control" 
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">To</label>
                  <div className="form-control-icon">
                    <i className="fas fa-subway"></i>
                    <input 
                      type="text" 
                      name="to"
                      value={searchParams.to}
                      onChange={handleInputChange}
                      placeholder="Arrival Station" 
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
                      <option>Business</option>
                      <option>First Class</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">&nbsp;</label>
                  <button type="submit" className="btn btn-primary btn-block">
                    <i className="fas fa-search mr-2"></i> Search Trains
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Step Indicator */}
        {(trains.length > 0 || selectedTrain) && (
          <div className="flex justify-between mb-6 bg-white p-4 rounded-lg">
            <div className={`flex flex-col items-center ${bookingStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${bookingStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span>Select Train</span>
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
        
        {/* Step 1: Train Results */}
        {bookingStep === 1 && (
          <>
            {trains.length === 0 && searchParams.from && searchParams.to ? (
              <div className="card p-6 text-center">
                <i className="fas fa-spinner fa-spin text-3xl text-primary mb-3"></i>
                <p>Searching for trains from {searchParams.from} to {searchParams.to}...</p>
              </div>
            ) : trains.length > 0 ? (
              <div className="card">
                <div className="card-body">
                  <h2 className="text-xl font-bold mb-4">Available Trains</h2>
                  
                  <div className="space-y-4">
                    {trains.map(train => (
                      <div key={train.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="grid md-grid-cols-3 gap-4">
                          <div>
                            <h3 className="text-lg font-bold">{train.operator}</h3>
                            <p className="text-sm text-gray-600 mb-2">Train {train.trainNumber}</p>
                            
                            <div className="text-sm mb-3">
                              <p>Available Classes:</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {train.travelClass.map((cls, index) => (
                                  <span 
                                    key={index} 
                                    className={`px-2 py-1 rounded text-xs ${cls === searchParams.class ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                                  >
                                    {cls} ({train.availableSeats[cls]} seats)
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row items-center">
                            <div className="text-center mr-6">
                              <div className="text-lg font-bold">{train.departureTime}</div>
                              <div className="text-sm text-gray-600">{train.departureStation}</div>
                            </div>
                            
                            <div className="text-center mx-6">
                              <div className="text-sm text-gray-500">{train.duration}</div>
                              <div className="relative w-20 h-px bg-gray-300 my-2">
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-400 rounded-full"></div>
                              </div>
                              <div className="text-xs text-gray-500">Direct</div>
                            </div>
                            
                            <div className="text-center ml-6">
                              <div className="text-lg font-bold">{train.arrivalTime}</div>
                              <div className="text-sm text-gray-600">{train.arrivalStation}</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end justify-center">
                            <div className="text-2xl font-bold text-primary mb-2">
                              ${getClassPrice(train, searchParams.class).toFixed(2)}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{searchParams.class} Class</p>
                            <button 
                              className="btn btn-primary"
                              onClick={() => selectTrain(train)}
                            >
                              Select Train
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
        {bookingStep === 2 && selectedTrain && (
          <div className="card">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Passenger Details</h2>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-primary mb-2">Journey Summary</h3>
                <div className="grid md-grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Train Operator</p>
                    <p className="font-medium">{selectedTrain.operator} ({selectedTrain.trainNumber})</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">{selectedTrain.departureStation} → {selectedTrain.arrivalStation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-medium">{searchParams.date} at {selectedTrain.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Arrival</p>
                    <p className="font-medium">{searchParams.date} at {selectedTrain.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-medium">{searchParams.class}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Passengers</p>
                    <p className="font-medium">{searchParams.passengers} Passenger{parseInt(searchParams.passengers) > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="font-bold text-primary">
                      ${(getClassPrice(selectedTrain, searchParams.class) * parseInt(searchParams.passengers)).toFixed(2)}
                    </p>
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
                        <label className="form-label">Age</label>
                        <input 
                          type="number" 
                          className="form-control"
                          value={passenger.age}
                          onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                          required
                          min="0"
                          max="120"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">ID Number (Passport / ID Card)</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={passenger.idNumber}
                          onChange={(e) => handlePassengerChange(index, 'idNumber', e.target.value)}
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
                    Back to Trains
                  </button>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary"
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
              <p className="mb-4">Your train ticket has been booked successfully.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                <div className="grid md-grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Booking Reference</p>
                    <p className="font-bold">{bookingReference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Train</p>
                    <p className="font-medium">{selectedTrain.operator} {selectedTrain.trainNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">{selectedTrain.departureStation} → {selectedTrain.arrivalStation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-medium">{searchParams.date} at {selectedTrain.departureTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Arrival</p>
                    <p className="font-medium">{searchParams.date} at {selectedTrain.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-medium">{searchParams.class}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Passengers</p>
                    <p className="font-medium">{searchParams.passengers} Passenger{parseInt(searchParams.passengers) > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Paid</p>
                    <p className="font-bold text-primary">
                      ${(getClassPrice(selectedTrain, searchParams.class) * parseInt(searchParams.passengers)).toFixed(2)}
                    </p>
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
                    setSelectedTrain(null);
                    setBookingStep(1);
                    setBookingSuccess(false);
                  }}
                >
                  Book Another Train
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

export default TrainBooking;
