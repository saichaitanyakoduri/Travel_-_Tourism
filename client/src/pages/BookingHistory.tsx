import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'wouter';
import { userApi } from '../lib/api';

const BookingHistory = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setLocation('/');
    }
  }, [isAuthenticated, authLoading, setLocation]);
  
  // Set document title
  useEffect(() => {
    document.title = 'My Bookings - TravelWorld';
  }, []);
  
  // Fetch booking history when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchBookingHistory();
    }
  }, [isAuthenticated]);
  
  // Fetch booking history from API
  const fetchBookingHistory = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await userApi.getBookingHistory();
      
      if (response?.bookings) {
        setBookings(response.bookings);
      }
    } catch (error) {
      console.error('Error fetching booking history:', error);
      setError('Failed to load your booking history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get icon based on booking type
  const getBookingIcon = (booking) => {
    if (booking.flightNumber) return 'fas fa-plane';
    if (booking.hotelName) return 'fas fa-hotel';
    if (booking.busOperator) return 'fas fa-bus';
    if (booking.trainNumber) return 'fas fa-train';
    return 'fas fa-ticket-alt';
  };
  
  // Get booking type name
  const getBookingType = (booking) => {
    if (booking.flightNumber) return 'Flight';
    if (booking.hotelName) return 'Hotel';
    if (booking.busOperator) return 'Bus';
    if (booking.trainNumber) return 'Train';
    return 'Booking';
  };
  
  // Get primary title of booking
  const getBookingTitle = (booking) => {
    if (booking.flightNumber) return `${booking.airline} ${booking.flightNumber}`;
    if (booking.hotelName) return booking.hotelName;
    if (booking.busOperator) return booking.busOperator;
    if (booking.trainOperator) return `${booking.trainOperator} ${booking.trainNumber}`;
    return 'Unknown Booking';
  };
  
  // Get secondary description of booking
  const getBookingDescription = (booking) => {
    if (booking.flightNumber) return `${booking.departureCity} to ${booking.arrivalCity}`;
    if (booking.hotelName) return booking.location;
    if (booking.busOperator) return `${booking.departureCity} to ${booking.arrivalCity}`;
    if (booking.trainOperator) return `${booking.departureStation} to ${booking.arrivalStation}`;
    return '';
  };
  
  // Get date display for booking
  const getBookingDate = (booking) => {
    if (booking.flightNumber) {
      return booking.returnDate 
        ? `${booking.departureDate} - ${booking.returnDate}` 
        : booking.departureDate;
    }
    if (booking.hotelName) {
      return `${booking.checkInDate} - ${booking.checkOutDate}`;
    }
    if (booking.busOperator || booking.trainOperator) {
      return booking.returnDate 
        ? `${booking.departureDate} - ${booking.returnDate}` 
        : booking.departureDate;
    }
    
    // Fallback to booking date if specific dates not available
    if (booking.bookingDate) {
      return new Date(booking.bookingDate).toLocaleDateString();
    }
    
    return 'Date not available';
  };
  
  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    if (activeTab === 'flights') return !!booking.flightNumber;
    if (activeTab === 'hotels') return !!booking.hotelName;
    if (activeTab === 'buses') return !!booking.busOperator;
    if (activeTab === 'trains') return !!booking.trainNumber;
    return true;
  });
  
  if (authLoading) {
    return (
      <div className="py-16 bg-neutral-light min-h-screen">
        <div className="container">
          <div className="card p-6 text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-primary mb-3"></i>
            <p>Loading bookings...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-16 bg-neutral-light min-h-screen">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          
          <div>
            <button 
              className="btn btn-outline-primary"
              onClick={() => setLocation('/profile')}
            >
              <i className="fas fa-user mr-2"></i> View Profile
            </button>
          </div>
        </div>
        
        {/* Booking Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-6 py-3 font-medium ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
              onClick={() => setActiveTab('all')}
            >
              <i className="fas fa-ticket-alt mr-2"></i> All Bookings
            </button>
            <button 
              className={`px-6 py-3 font-medium ${activeTab === 'flights' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
              onClick={() => setActiveTab('flights')}
            >
              <i className="fas fa-plane mr-2"></i> Flights
            </button>
            <button 
              className={`px-6 py-3 font-medium ${activeTab === 'hotels' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
              onClick={() => setActiveTab('hotels')}
            >
              <i className="fas fa-hotel mr-2"></i> Hotels
            </button>
            <button 
              className={`px-6 py-3 font-medium ${activeTab === 'buses' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
              onClick={() => setActiveTab('buses')}
            >
              <i className="fas fa-bus mr-2"></i> Buses
            </button>
            <button 
              className={`px-6 py-3 font-medium ${activeTab === 'trains' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
              onClick={() => setActiveTab('trains')}
            >
              <i className="fas fa-train mr-2"></i> Trains
            </button>
          </div>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="card p-6 text-center">
            <i className="fas fa-spinner fa-spin text-3xl text-primary mb-3"></i>
            <p>Loading your booking history...</p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="alert alert-error">
            {error}
            <button 
              className="ml-4 underline"
              onClick={fetchBookingHistory}
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && !error && filteredBookings.length === 0 && (
          <div className="card p-8 text-center">
            <div className="text-6xl text-gray-300 mb-4">
              <i className="fas fa-calendar-times"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">No Bookings Found</h2>
            <p className="text-gray-600 mb-6">
              {activeTab === 'all' 
                ? "You don't have any bookings yet." 
                : `You don't have any ${activeTab} bookings.`}
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/flights" className="btn btn-primary">
                Book a Flight
              </a>
              <a href="/hotels" className="btn btn-outline-primary">
                Book a Hotel
              </a>
            </div>
          </div>
        )}
        
        {/* Booking List */}
        {!isLoading && filteredBookings.length > 0 && (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="card">
                <div className="p-4 md:p-6">
                  <div className="flex flex-wrap md:flex-nowrap items-start">
                    {/* Left: Icon and Type */}
                    <div className="mr-6 mb-4 md:mb-0">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary">
                        <i className={`${getBookingIcon(booking)} text-xl`}></i>
                      </div>
                      <div className="mt-2 text-sm text-center text-gray-600">
                        {getBookingType(booking)}
                      </div>
                    </div>
                    
                    {/* Middle: Booking Details */}
                    <div className="flex-grow mb-4 md:mb-0">
                      <h3 className="text-lg font-bold mb-1">
                        {getBookingTitle(booking)}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {getBookingDescription(booking)}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <div>
                          <i className="far fa-calendar mr-1"></i> {getBookingDate(booking)}
                        </div>
                        
                        <div>
                          <i className="fas fa-user-friends mr-1"></i> 
                          {booking.passengerCount || booking.guestCount || 1} 
                          {booking.hotelName ? ' Guest(s)' : ' Passenger(s)'}
                        </div>
                        
                        {booking.travelClass && (
                          <div>
                            <i className="fas fa-chair mr-1"></i> {booking.travelClass}
                          </div>
                        )}
                        
                        {booking.roomType && (
                          <div>
                            <i className="fas fa-bed mr-1"></i> {booking.roomType}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Right: Status and Actions */}
                    <div className="w-full md:w-auto flex flex-col items-end">
                      <div className="flex items-center mb-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
                        </span>
                      </div>
                      
                      <div className="text-lg font-bold text-primary mb-3">
                        {booking.totalPrice}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="btn btn-sm btn-outline-primary">
                          <i className="fas fa-ticket-alt mr-1"></i> View Details
                        </button>
                        
                        {booking.status !== 'cancelled' && (
                          <button className="btn btn-sm btn-outline-error">
                            <i className="fas fa-times mr-1"></i> Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Booking Reference */}
                <div className="border-t p-3 bg-gray-50 text-sm text-gray-600">
                  <span className="font-medium">Booking ID:</span> {booking.id}
                  <span className="mx-3">•</span>
                  <span className="font-medium">Booked on:</span> {
                    booking.bookingDate 
                      ? new Date(booking.bookingDate).toLocaleDateString() 
                      : 'N/A'
                  }
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* CTA Section */}
        <div className="mt-10 bg-gradient-to-r from-primary to-accent text-white rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-3">Looking for your next adventure?</h2>
          <p className="mb-6 opacity-90">
            Explore our latest deals and book your next trip with exclusive discounts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/flights" className="btn bg-white text-primary hover:bg-gray-100">
              <i className="fas fa-plane mr-2"></i> Book Flights
            </a>
            <a href="/hotels" className="btn bg-white text-primary hover:bg-gray-100">
              <i className="fas fa-hotel mr-2"></i> Book Hotels
            </a>
            <a href="/deals" className="btn bg-white text-primary hover:bg-gray-100">
              <i className="fas fa-tag mr-2"></i> View Deals
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
