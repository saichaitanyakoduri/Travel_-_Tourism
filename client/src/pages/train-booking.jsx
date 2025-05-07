import React, { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from "@/lib/queryClient";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';
import '../styles/booking.css';

// Initialize EmailJS with user ID
emailjs.init('acALG61rt4ukJDcU6hbpc');

const TrainBooking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [match, params] = useRoute('/trains/:id');
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    travelDate: '',
    seatClass: '',
    seatNumbers: [],
    specialRequests: '',
    totalAmount: 0,
  });
  
  // Passenger information
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  
  // Confirmation information
  const [confirmationInfo, setConfirmationInfo] = useState({
    agreeToTerms: false
  });
  
  // Seat selection state
  const [availableSeats, setAvailableSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Query to fetch train details
  const {
    data: train,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: [`/api/trains/${params?.id}`],
    enabled: !!params?.id
  });
  
  // Booking mutation
  const bookingMutation = useMutation({
    mutationFn: async (bookingDetails) => {
      const res = await apiRequest('POST', '/api/bookings', bookingDetails);
      return await res.json();
    },
    onSuccess: () => {
      setCurrentStep(4); // Move to success step
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      
      // Email notification logic would go here in a real application using EmailJS
      toast({
        title: 'Booking Successful',
        description: 'Your train tickets have been confirmed!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Booking Failed',
        description: error.message || 'There was an error processing your booking',
        variant: 'destructive',
      });
    }
  });
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user && !isLoading) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to book train tickets',
        variant: 'destructive',
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate, toast]);
  
  // Generate available seats based on selected class
  useEffect(() => {
    if (train && bookingData.seatClass) {
      // In a real app, this would come from the API
      // For this demo, we'll generate dummy seat data
      const seats = [];
      // Determine number of seats based on class
      const seatCount = bookingData.seatClass === 'economy' ? 60 : 
                        bookingData.seatClass === 'business' ? 40 : 20;
      
      for (let i = 1; i <= seatCount; i++) {
        const isTaken = Math.random() > 0.8; // 20% of seats are taken
        seats.push({
          number: i,
          available: !isTaken
        });
      }
      setAvailableSeats(seats);
      setSelectedSeats([]);
    }
  }, [train, bookingData.seatClass]);
  
  // Calculate total amount when seats and class change
  useEffect(() => {
    if (train && selectedSeats.length > 0 && bookingData.seatClass) {
      let basePrice = train.price;
      
      // Apply price multiplier based on class
      if (bookingData.seatClass === 'business') {
        basePrice *= 1.5; // 50% more for business
      } else if (bookingData.seatClass === 'first') {
        basePrice *= 2.5; // 150% more for first class
      }
      
      const total = selectedSeats.length * basePrice;
      setBookingData(prev => ({ 
        ...prev, 
        totalAmount: total,
        seatNumbers: selectedSeats
      }));
    }
  }, [train, selectedSeats, bookingData.seatClass]);
  
  const handleSeatClassChange = (e) => {
    setBookingData(prev => ({ ...prev, seatClass: e.target.value }));
  };
  
  const handleSeatToggle = (seatNumber) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        return prev.filter(num => num !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };
  
  const handleDateChange = (e) => {
    setBookingData(prev => ({ ...prev, travelDate: e.target.value }));
  };
  
  const handleSpecialRequestsChange = (e) => {
    setBookingData(prev => ({ ...prev, specialRequests: e.target.value }));
  };
  
  const handlePassengerInfoChange = (e) => {
    const { name, value } = e.target;
    setPassengerInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleConfirmationInfoChange = (e) => {
    const { name, checked } = e.target;
    setConfirmationInfo(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!bookingData.travelDate) {
        toast({
          title: 'Missing Information',
          description: 'Please select a travel date',
          variant: 'destructive',
        });
        return;
      }
      
      if (!bookingData.seatClass) {
        toast({
          title: 'Missing Information',
          description: 'Please select a seat class',
          variant: 'destructive',
        });
        return;
      }
      
      if (selectedSeats.length === 0) {
        toast({
          title: 'Missing Information',
          description: 'Please select at least one seat',
          variant: 'destructive',
        });
        return;
      }
      
      // Validate date
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const travelDate = new Date(bookingData.travelDate);
      
      if (travelDate < today) {
        toast({
          title: 'Invalid Date',
          description: 'Travel date cannot be in the past',
          variant: 'destructive',
        });
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!passengerInfo.firstName || !passengerInfo.lastName || !passengerInfo.email) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in all required passenger information',
          variant: 'destructive',
        });
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(passengerInfo.email)) {
        toast({
          title: 'Invalid Email',
          description: 'Please enter a valid email address',
          variant: 'destructive',
        });
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmitBooking = (e) => {
    e.preventDefault();
    
    // Terms validation
    if (!confirmationInfo.agreeToTerms) {
      toast({
        title: 'Terms & Conditions',
        description: 'Please agree to the terms and conditions to complete your booking',
        variant: 'destructive',
      });
      return;
    }
    
    // Send confirmation email using EmailJS
    try {
      // Prepare email data
      const templateParams = {
        to_email: passengerInfo.email,
        to_name: `${passengerInfo.firstName} ${passengerInfo.lastName}`,
        booking_type: 'train',
        journey: `${train.from} to ${train.to}`,
        travel_date: new Date(bookingData.travelDate).toLocaleDateString(),
        booking_details: `${train.trainName} (${train.trainNumber})`,
        seats: selectedSeats.sort((a, b) => a - b).join(', '),
        amount: bookingData.totalAmount.toFixed(2)
      };
      
      // Send email
      emailjs.send('service_rclc1ya', 'template_confirmation', templateParams)
        .then(response => {
          console.log('Email sent successfully:', response);
          // Move to success step directly after email is sent
          setCurrentStep(4);
          toast({
            title: 'Booking Successful',
            description: 'Your train tickets have been confirmed!',
          });
        })
        .catch(error => {
          console.error('Failed to send email:', error);
          toast({
            title: 'Email Notification',
            description: 'Could not send confirmation email. Please try again.',
            variant: 'destructive',
          });
        });
    } catch (error) {
      console.error('EmailJS initialization error:', error);
      toast({
        title: 'Booking Failed',
        description: 'There was an error processing your booking. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="booking-container">
          <div className="container">
            <div className="text-center py-5">
              <div className="loading-spinner"></div>
              <p>Loading train information...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (isError) {
    return (
      <>
        <Header />
        <div className="booking-container">
          <div className="container">
            <div className="text-center py-5">
              <h2>Error Loading Train</h2>
              <p>{error.message || 'Could not load train information'}</p>
              <button className="btn btn-primary mt-3" onClick={() => navigate('/trains')}>
                Back to Trains
              </button>
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
      <div className="booking-container">
        <div className="container">
          <div className="booking-header">
            <h1 className="booking-title">Train Ticket Booking</h1>
            <p className="booking-subtitle">Book your journey on {train.trainName} ({train.trainNumber})</p>
          </div>
          
          <div className="booking-grid">
            <div className="booking-main">
              <div className="booking-steps">
                <div className={`booking-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                  1. Class & Seats
                </div>
                <div className={`booking-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                  2. Passenger Details
                </div>
                <div className={`booking-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
                  3. Confirmation
                </div>
                <div className={`booking-step ${currentStep >= 4 ? 'active' : ''}`}>
                  4. Success
                </div>
              </div>
              
              <div className="booking-content">
                {/* Step 1: Class Selection, Date & Seats */}
                {currentStep === 1 && (
                  <>
                    <div className="booking-section">
                      <h2 className="section-title">Select Date & Class</h2>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Travel Date</label>
                          <input 
                            type="date" 
                            className="form-input"
                            value={bookingData.travelDate}
                            onChange={handleDateChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Seat Class</label>
                          <select 
                            className="form-input"
                            value={bookingData.seatClass}
                            onChange={handleSeatClassChange}
                            required
                          >
                            <option value="">Select Class</option>
                            <option value="economy">Economy</option>
                            <option value="business">Business</option>
                            <option value="first">First Class</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {bookingData.seatClass && (
                      <div className="booking-section">
                        <h2 className="section-title">Select Seats</h2>
                        <p>Please select your seats. Selected seats: {selectedSeats.length}</p>
                        
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(5, 1fr)', 
                          gap: '10px',
                          marginTop: '20px'
                        }}>
                          {availableSeats.map((seat) => (
                            <div
                              key={seat.number}
                              style={{
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                textAlign: 'center',
                                backgroundColor: !seat.available 
                                  ? '#f5f5f5' 
                                  : selectedSeats.includes(seat.number)
                                    ? 'rgba(26, 115, 232, 0.1)'
                                    : 'white',
                                borderColor: selectedSeats.includes(seat.number) ? 'var(--primary-color)' : '#ddd',
                                cursor: seat.available ? 'pointer' : 'not-allowed',
                                color: !seat.available ? '#999' : 'inherit'
                              }}
                              onClick={() => seat.available && handleSeatToggle(seat.number)}
                            >
                              {seat.number}
                            </div>
                          ))}
                        </div>
                        
                        <div style={{ marginTop: '20px' }}>
                          <div className="form-group">
                            <label className="form-label">Special Requests (Optional)</label>
                            <input 
                              type="text" 
                              className="form-input"
                              value={bookingData.specialRequests}
                              onChange={handleSpecialRequestsChange}
                              placeholder="e.g., Wheelchair access, meal requirements, etc."
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {/* Step 2: Passenger Details */}
                {currentStep === 2 && (
                  <div className="booking-section">
                    <h2 className="section-title">Passenger Information</h2>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input 
                          type="text" 
                          className="form-input"
                          name="firstName"
                          value={passengerInfo.firstName}
                          onChange={handlePassengerInfoChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input 
                          type="text" 
                          className="form-input"
                          name="lastName"
                          value={passengerInfo.lastName}
                          onChange={handlePassengerInfoChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-input"
                          name="email"
                          value={passengerInfo.email}
                          onChange={handlePassengerInfoChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-input"
                          name="phone"
                          value={passengerInfo.phone}
                          onChange={handlePassengerInfoChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <div className="booking-section">
                    <h2 className="section-title">Confirm Your Booking</h2>
                    
                    <form onSubmit={handleSubmitBooking}>
                      <div className="booking-confirmation">
                        <div className="confirmation-message">
                          <p>You're about to book the following train tickets:</p>
                          
                          <div className="confirmation-details">
                            <div className="detail-row">
                              <div className="detail-label">Train:</div>
                              <div className="detail-value">{train.trainName} ({train.trainNumber})</div>
                            </div>
                            <div className="detail-row">
                              <div className="detail-label">Route:</div>
                              <div className="detail-value">{train.from} to {train.to}</div>
                            </div>
                            <div className="detail-row">
                              <div className="detail-label">Travel Date:</div>
                              <div className="detail-value">{new Date(bookingData.travelDate).toLocaleDateString()}</div>
                            </div>
                            <div className="detail-row">
                              <div className="detail-label">Departure Time:</div>
                              <div className="detail-value">{train.departureTime}</div>
                            </div>
                            <div className="detail-row">
                              <div className="detail-label">Arrival Time:</div>
                              <div className="detail-value">{train.arrivalTime}</div>
                            </div>
                            <div className="detail-row">
                              <div className="detail-label">Selected Seats:</div>
                              <div className="detail-value">{selectedSeats.sort((a, b) => a - b).join(', ')}</div>
                            </div>
                            <div className="detail-row">
                              <div className="detail-label">Seat Class:</div>
                              <div className="detail-value">{bookingData.seatClass.charAt(0).toUpperCase() + bookingData.seatClass.slice(1)}</div>
                            </div>
                            <div className="detail-row">
                              <div className="detail-label">Passenger Name:</div>
                              <div className="detail-value">{passengerInfo.firstName} {passengerInfo.lastName}</div>
                            </div>
                            <div className="detail-row">
                              <div className="detail-label">Email for Confirmation:</div>
                              <div className="detail-value">{passengerInfo.email}</div>
                            </div>
                            <div className="detail-row">
                              <div className="detail-label">Total Amount:</div>
                              <div className="detail-value">${bookingData.totalAmount.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <div className="checkbox-container">
                            <input 
                              type="checkbox" 
                              id="agreeToTerms"
                              name="agreeToTerms" 
                              checked={confirmationInfo.agreeToTerms}
                              onChange={handleConfirmationInfoChange}
                              required
                            />
                            <label htmlFor="agreeToTerms" className="checkbox-label">
                              I agree to the <a href="#" className="terms-link">Terms and Conditions</a>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-actions">
                        <button type="button" className="action-back" onClick={handlePrevStep}>
                          Back
                        </button>
                        <button 
                          type="submit" 
                          className="action-next"
                          disabled={bookingMutation.isPending}
                        >
                          {bookingMutation.isPending ? 'Processing...' : 'Complete Booking'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div className="booking-success">
                    <div className="success-icon">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h2 className="success-title">Booking Confirmed!</h2>
                    <p className="success-message">Your train tickets have been successfully booked. A confirmation email has been sent to {passengerInfo.email}</p>
                    
                    <div className="booking-details">
                      <div className="detail-row">
                        <div className="detail-label">Train</div>
                        <div className="detail-value">{train.trainName} ({train.trainNumber})</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Route</div>
                        <div className="detail-value">{train.from} to {train.to}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Class</div>
                        <div className="detail-value">
                          {bookingData.seatClass === 'economy' ? 'Economy' : 
                           bookingData.seatClass === 'business' ? 'Business' : 'First Class'}
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Travel Date</div>
                        <div className="detail-value">{new Date(bookingData.travelDate).toLocaleDateString()}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Departure Time</div>
                        <div className="detail-value">{train.departureTime}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Arrival Time</div>
                        <div className="detail-value">{train.arrivalTime}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Seat Numbers</div>
                        <div className="detail-value">{selectedSeats.sort((a, b) => a - b).join(', ')}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Total Amount</div>
                        <div className="detail-value">${bookingData.totalAmount.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="action-back"
                        onClick={() => navigate('/profile/bookings')}
                      >
                        View My Bookings
                      </button>
                      <button 
                        type="button" 
                        className="action-next"
                        onClick={() => navigate('/')}
                      >
                        Back to Home
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Navigation buttons for steps 1-2 */}
                {currentStep >= 1 && currentStep <= 2 && (
                  <div className="booking-actions">
                    {currentStep > 1 && (
                      <button type="button" className="action-back" onClick={handlePrevStep}>
                        Back
                      </button>
                    )}
                    <button type="button" className="action-next" onClick={handleNextStep}>
                      Next: {currentStep === 1 ? 'Passenger Details' : 'Confirmation'}
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="booking-sidebar">
              <div className="summary-section">
                <h2 className="summary-title">Booking Summary</h2>
                
                <div className="summary-item">
                  <div className="item-label">Train</div>
                  <div className="item-value">{train.trainName}</div>
                </div>
                
                <div className="summary-item">
                  <div className="item-label">Train Number</div>
                  <div className="item-value">{train.trainNumber}</div>
                </div>
                
                <div className="summary-item">
                  <div className="item-label">Route</div>
                  <div className="item-value">{train.from} to {train.to}</div>
                </div>
                
                <div className="summary-item">
                  <div className="item-label">Departure</div>
                  <div className="item-value">{train.departureTime}</div>
                </div>
                
                <div className="summary-item">
                  <div className="item-label">Arrival</div>
                  <div className="item-value">{train.arrivalTime}</div>
                </div>
                
                {bookingData.travelDate && (
                  <div className="summary-item">
                    <div className="item-label">Travel Date</div>
                    <div className="item-value">{new Date(bookingData.travelDate).toLocaleDateString()}</div>
                  </div>
                )}
                
                {bookingData.seatClass && (
                  <div className="summary-item">
                    <div className="item-label">Class</div>
                    <div className="item-value">
                      {bookingData.seatClass === 'economy' ? 'Economy' : 
                       bookingData.seatClass === 'business' ? 'Business' : 'First Class'}
                    </div>
                  </div>
                )}
                
                <div className="summary-item">
                  <div className="item-label">Seats Selected</div>
                  <div className="item-value">
                    {selectedSeats.length > 0 
                      ? selectedSeats.sort((a, b) => a - b).join(', ')
                      : 'None'
                    }
                  </div>
                </div>
                
                <div className="summary-item">
                  <div className="item-label">Base Price</div>
                  <div className="item-value">
                    ${bookingData.seatClass === 'economy' ? train.price : 
                      bookingData.seatClass === 'business' ? (train.price * 1.5).toFixed(2) : 
                      (train.price * 2.5).toFixed(2)} per seat
                  </div>
                </div>
              </div>
              
              <div className="summary-total">
                <div className="total-label">Total</div>
                <div className="total-value">${bookingData.totalAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrainBooking;
