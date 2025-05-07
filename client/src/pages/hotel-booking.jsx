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

// Initialize EmailJS with hardcoded user ID
emailjs.init('acALG61rt4ukJDcU6hbpc');

const HotelBooking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [match, params] = useRoute('/hotels/:id');
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    roomType: '',
    checkIn: '',
    checkOut: '',
    guestCount: 1,
    specialRequests: '',
    totalAmount: 0,
  });
  
  // Guest information
  const [guestInfo, setGuestInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  
  // Confirmation information
  const [confirmationInfo, setConfirmationInfo] = useState({
    agreeToTerms: false,
    receiveUpdates: true,
  });
  
  // Query to fetch hotel details
  const {
    data: hotel,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: [`/api/hotels/${params?.id}`],
    enabled: !!params?.id
  });
  
  // Booking mutation with direct email sending only (no backend)
  const bookingMutation = useMutation({
    mutationFn: async (bookingDetails) => {
      try {
        // Send email directly - no backend dependency
        const emailResult = await sendBookingConfirmationEmail(bookingDetails);
        return bookingDetails; // Simply return the booking details on success
      } catch (emailError) {
        throw new Error('Failed to send confirmation email: ' + emailError.message);
      }
    },
    onSuccess: () => {
      setCurrentStep(4); // Move to success step
      
      toast({
        title: 'Booking Successful',
        description: 'Your hotel booking has been confirmed! Check your email for details.',
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
  
  // Function to send booking confirmation email
  const sendBookingConfirmationEmail = async (bookingDetails) => {
    // Create EmailJS template parameters
    const templateParams = {
      to_email: guestInfo.email,
      to_name: `${guestInfo.firstName} ${guestInfo.lastName}`,
      booking_type: 'hotel',
      hotel_name: hotel?.name || 'Unknown Hotel',
      room_type: bookingData.roomType === 'standard' ? 'Standard Room' : 
                 bookingData.roomType === 'deluxe' ? 'Deluxe Room' : 'Executive Suite',
      check_in: new Date(bookingData.checkIn).toLocaleDateString(),
      check_out: new Date(bookingData.checkOut).toLocaleDateString(),
      guests: bookingData.guestCount,
      amount: bookingData.totalAmount.toFixed(2),
      special_requests: bookingData.specialRequests || 'None'
    };
    
    console.log('Sending email with template params:', templateParams);
    
    // Send the email using EmailJS with hardcoded credentials
    return emailjs.send(
      'service_rclc1ya',
      'template_confirmation',
      templateParams,
      'acALG61rt4ukJDcU6hbpc' // Using hardcoded credentials as directed
    );
  };
  
  // We're no longer requiring authentication
  /*
  useEffect(() => {
    // Redirect if not logged in
    if (!user && !isLoading) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to book a hotel',
        variant: 'destructive',
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate, toast]);
  */
  
  // Calculate total amount when check-in, check-out, or room type changes
  useEffect(() => {
    if (hotel && bookingData.roomType && bookingData.checkIn && bookingData.checkOut) {
      const checkInDate = new Date(bookingData.checkIn);
      const checkOutDate = new Date(bookingData.checkOut);
      const nightsStay = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      
      let roomPrice = hotel.price; // Base price
      if (bookingData.roomType === 'deluxe') {
        roomPrice = hotel.price * 1.3; // 30% more for deluxe
      } else if (bookingData.roomType === 'suite') {
        roomPrice = hotel.price * 1.6; // 60% more for suite
      }
      
      const total = nightsStay * roomPrice * bookingData.guestCount;
      setBookingData(prev => ({ ...prev, totalAmount: total }));
    }
  }, [hotel, bookingData.roomType, bookingData.checkIn, bookingData.checkOut, bookingData.guestCount]);
  
  const handleRoomSelection = (roomType, price) => {
    setBookingData(prev => ({ ...prev, roomType }));
  };
  
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGuestInfoChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleConfirmationInfoChange = (e) => {
    const { name, checked } = e.target;
    setConfirmationInfo(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!bookingData.roomType || !bookingData.checkIn || !bookingData.checkOut) {
        toast({
          title: 'Missing Information',
          description: 'Please select a room type and enter check-in/check-out dates',
          variant: 'destructive',
        });
        return;
      }
      
      // Validate dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkInDate = new Date(bookingData.checkIn);
      const checkOutDate = new Date(bookingData.checkOut);
      
      if (checkInDate < today) {
        toast({
          title: 'Invalid Date',
          description: 'Check-in date cannot be in the past',
          variant: 'destructive',
        });
        return;
      }
      
      if (checkOutDate <= checkInDate) {
        toast({
          title: 'Invalid Date',
          description: 'Check-out date must be after check-in date',
          variant: 'destructive',
        });
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email) {
        toast({
          title: 'Missing Information',
          description: 'Please fill in all required guest information',
          variant: 'destructive',
        });
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(guestInfo.email)) {
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
    
    // Create booking details without requiring user authentication
    const bookingDetails = {
      // Use random ID if no user is logged in
      userId: user?.id || Math.floor(Math.random() * 10000),
      bookingType: 'hotel',
      referenceId: hotel.id,
      bookingDate: new Date().toISOString(),
      travelDate: new Date(bookingData.checkIn).toISOString(),
      returnDate: new Date(bookingData.checkOut).toISOString(),
      totalAmount: bookingData.totalAmount,
      status: 'confirmed',
      guestCount: bookingData.guestCount,
      
      // Add guest information directly in the booking object
      guestInfo: {
        firstName: guestInfo.firstName,
        lastName: guestInfo.lastName,
        email: guestInfo.email,
        phone: guestInfo.phone || 'Not provided'
      },
      
      // Add hotel information for email template
      hotelName: hotel.name,
      roomType: bookingData.roomType === 'standard' ? 'Standard Room' : 
                bookingData.roomType === 'deluxe' ? 'Deluxe Room' : 'Executive Suite',
      checkInFormatted: new Date(bookingData.checkIn).toLocaleDateString(),
      checkOutFormatted: new Date(bookingData.checkOut).toLocaleDateString(),
      totalAmountFormatted: '$' + bookingData.totalAmount.toFixed(2),
      specialRequests: bookingData.specialRequests || 'None'
    };
    
    // Submit booking through our mutation, which will handle the email sending
    bookingMutation.mutate(bookingDetails);
  };
  
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="booking-container">
          <div className="container">
            <div className="text-center py-5">
              <div className="loading-spinner"></div>
              <p>Loading hotel information...</p>
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
              <h2>Error Loading Hotel</h2>
              <p>{error.message || 'Could not load hotel information'}</p>
              <button className="btn btn-primary mt-3" onClick={() => navigate('/hotels')}>
                Back to Hotels
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
            <h1 className="booking-title">Hotel Booking</h1>
            <p className="booking-subtitle">Complete your reservation for {hotel.name}</p>
          </div>
          
          <div className="booking-grid">
            <div className="booking-main">
              <div className="booking-steps">
                <div className={`booking-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                  1. Room & Dates
                </div>
                <div className={`booking-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                  2. Guest Details
                </div>
                <div className={`booking-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
                  3. Confirmation
                </div>
                <div className={`booking-step ${currentStep >= 4 ? 'active' : ''}`}>
                  4. Success
                </div>
              </div>
              
              <div className="booking-content">
                {/* Step 1: Room Selection & Dates */}
                {currentStep === 1 && (
                  <>
                    <div className="booking-section">
                      <h2 className="section-title">Select Room Type</h2>
                      
                      {/* Standard Room */}
                      <div className={`booking-card ${bookingData.roomType === 'standard' ? 'selected' : ''}`}>
                        <div className="booking-option">
                          <input 
                            type="radio" 
                            id="room-standard" 
                            name="roomType" 
                            className="option-radio" 
                            checked={bookingData.roomType === 'standard'}
                            onChange={() => handleRoomSelection('standard')}
                          />
                          <div className="option-content">
                            <div className="option-header">
                              <h3 className="option-title">Standard Room</h3>
                              <div className="option-price">${hotel.price}/night</div>
                            </div>
                            <div className="option-details">
                              <div className="detail-item">
                                <i className="fas fa-user detail-icon"></i> 2 Guests
                              </div>
                              <div className="detail-item">
                                <i className="fas fa-bed detail-icon"></i> 1 King Bed
                              </div>
                              <div className="detail-item">
                                <i className="fas fa-wifi detail-icon"></i> Free WiFi
                              </div>
                            </div>
                            <p>Comfortable room with all basic amenities for a pleasant stay.</p>
                            <div className="option-features">
                              <span className="option-feature">Non-smoking</span>
                              <span className="option-feature">Air conditioning</span>
                              <span className="option-feature">TV</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Deluxe Room */}
                      <div className={`booking-card ${bookingData.roomType === 'deluxe' ? 'selected' : ''}`}>
                        <div className="booking-option">
                          <input 
                            type="radio" 
                            id="room-deluxe" 
                            name="roomType" 
                            className="option-radio" 
                            checked={bookingData.roomType === 'deluxe'}
                            onChange={() => handleRoomSelection('deluxe')}
                          />
                          <div className="option-content">
                            <div className="option-header">
                              <h3 className="option-title">Deluxe Room</h3>
                              <div className="option-price">${Math.round(hotel.price * 1.3)}/night</div>
                            </div>
                            <div className="option-details">
                              <div className="detail-item">
                                <i className="fas fa-user detail-icon"></i> 2 Guests
                              </div>
                              <div className="detail-item">
                                <i className="fas fa-bed detail-icon"></i> 1 King Bed
                              </div>
                              <div className="detail-item">
                                <i className="fas fa-bath detail-icon"></i> Premium Bathroom
                              </div>
                            </div>
                            <p>Spacious room with enhanced amenities and complimentary breakfast.</p>
                            <div className="option-features">
                              <span className="option-feature">Non-smoking</span>
                              <span className="option-feature">Premium WiFi</span>
                              <span className="option-feature">Mini Bar</span>
                              <span className="option-feature">City View</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Suite */}
                      <div className={`booking-card ${bookingData.roomType === 'suite' ? 'selected' : ''}`}>
                        <div className="booking-option">
                          <input 
                            type="radio" 
                            id="room-suite" 
                            name="roomType" 
                            className="option-radio" 
                            checked={bookingData.roomType === 'suite'}
                            onChange={() => handleRoomSelection('suite')}
                          />
                          <div className="option-content">
                            <div className="option-header">
                              <h3 className="option-title">Executive Suite</h3>
                              <div className="option-price">${Math.round(hotel.price * 1.6)}/night</div>
                            </div>
                            <div className="option-details">
                              <div className="detail-item">
                                <i className="fas fa-user detail-icon"></i> 4 Guests
                              </div>
                              <div className="detail-item">
                                <i className="fas fa-bed detail-icon"></i> 1 King Bed + Sofa Bed
                              </div>
                              <div className="detail-item">
                                <i className="fas fa-couch detail-icon"></i> Separate Living Area
                              </div>
                            </div>
                            <p>Luxury suite with separate living area, premium amenities, and exclusive access to the executive lounge.</p>
                            <div className="option-features">
                              <span className="option-feature">Non-smoking</span>
                              <span className="option-feature">Premium WiFi</span>
                              <span className="option-feature">Jacuzzi</span>
                              <span className="option-feature">Panoramic View</span>
                              <span className="option-feature">Complimentary Spa</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="booking-section">
                      <h2 className="section-title">Select Dates & Guests</h2>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Check-in Date</label>
                          <input 
                            type="date" 
                            className="form-input"
                            name="checkIn"
                            value={bookingData.checkIn}
                            onChange={handleBookingChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Check-out Date</label>
                          <input 
                            type="date" 
                            className="form-input"
                            name="checkOut"
                            value={bookingData.checkOut}
                            onChange={handleBookingChange}
                            min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Number of Guests</label>
                          <select 
                            className="form-input"
                            name="guestCount"
                            value={bookingData.guestCount}
                            onChange={handleBookingChange}
                          >
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Special Requests (Optional)</label>
                          <input 
                            type="text" 
                            className="form-input"
                            name="specialRequests"
                            value={bookingData.specialRequests}
                            onChange={handleBookingChange}
                            placeholder="e.g., Early check-in, high floor, etc."
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Step 2: Guest Details */}
                {currentStep === 2 && (
                  <div className="booking-section">
                    <h2 className="section-title">Guest Information</h2>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input 
                          type="text" 
                          className="form-input"
                          name="firstName"
                          value={guestInfo.firstName}
                          onChange={handleGuestInfoChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input 
                          type="text" 
                          className="form-input"
                          name="lastName"
                          value={guestInfo.lastName}
                          onChange={handleGuestInfoChange}
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
                          value={guestInfo.email}
                          onChange={handleGuestInfoChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input 
                          type="tel" 
                          className="form-input"
                          name="phone"
                          value={guestInfo.phone}
                          onChange={handleGuestInfoChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Booking Confirmation */}
                {currentStep === 3 && (
                  <div className="booking-section">
                    <h2 className="section-title">Booking Summary</h2>
                    
                    <div className="booking-summary">
                      <div className="summary-card">
                        <div className="summary-header">
                          <h3>{hotel.name}</h3>
                          <div className="summary-location">{hotel.location}</div>
                        </div>
                        
                        <div className="summary-details">
                          <div className="summary-row">
                            <div className="summary-label">Room Type:</div>
                            <div className="summary-value">
                              {bookingData.roomType === 'standard' ? 'Standard Room' : 
                              bookingData.roomType === 'deluxe' ? 'Deluxe Room' : 'Executive Suite'}
                            </div>
                          </div>
                          
                          <div className="summary-row">
                            <div className="summary-label">Check-in:</div>
                            <div className="summary-value">{new Date(bookingData.checkIn).toLocaleDateString()}</div>
                          </div>
                          
                          <div className="summary-row">
                            <div className="summary-label">Check-out:</div>
                            <div className="summary-value">{new Date(bookingData.checkOut).toLocaleDateString()}</div>
                          </div>
                          
                          <div className="summary-row">
                            <div className="summary-label">Guests:</div>
                            <div className="summary-value">{bookingData.guestCount}</div>
                          </div>
                          
                          {bookingData.specialRequests && (
                            <div className="summary-row">
                              <div className="summary-label">Special Requests:</div>
                              <div className="summary-value">{bookingData.specialRequests}</div>
                            </div>
                          )}
                          
                          <div className="summary-divider"></div>
                          
                          <div className="summary-row">
                            <div className="summary-label">Primary Guest:</div>
                            <div className="summary-value">{guestInfo.firstName} {guestInfo.lastName}</div>
                          </div>
                          
                          <div className="summary-row">
                            <div className="summary-label">Email:</div>
                            <div className="summary-value">{guestInfo.email}</div>
                          </div>
                          
                          {guestInfo.phone && (
                            <div className="summary-row">
                              <div className="summary-label">Phone:</div>
                              <div className="summary-value">{guestInfo.phone}</div>
                            </div>
                          )}
                          
                          <div className="summary-divider"></div>
                          
                          <div className="summary-row total-row">
                            <div className="summary-label">Total:</div>
                            <div className="summary-value">${bookingData.totalAmount.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmitBooking} className="confirm-form">
                      <div className="form-group checkbox-group">
                        <input 
                          type="checkbox" 
                          id="agreeToTerms"
                          name="agreeToTerms"
                          checked={confirmationInfo.agreeToTerms}
                          onChange={handleConfirmationInfoChange}
                          required
                        />
                        <label htmlFor="agreeToTerms">
                          I agree to the terms and conditions and cancellation policy
                        </label>
                      </div>
                      
                      <div className="form-group checkbox-group">
                        <input 
                          type="checkbox" 
                          id="receiveUpdates"
                          name="receiveUpdates"
                          checked={confirmationInfo.receiveUpdates}
                          onChange={handleConfirmationInfoChange}
                        />
                        <label htmlFor="receiveUpdates">
                          Email me with special offers and updates about this property
                        </label>
                      </div>
                      
                      <div className="notification-box">
                        <i className="fas fa-envelope-open-text"></i>
                        <p>A confirmation email will be sent to <strong>{guestInfo.email}</strong> once your booking is complete.</p>
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
                    <p className="success-message">Your hotel booking has been successfully processed. A confirmation email has been sent to {guestInfo.email}</p>
                    
                    <div className="booking-details">
                      <div className="detail-row">
                        <div className="detail-label">Hotel</div>
                        <div className="detail-value">{hotel.name}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Room Type</div>
                        <div className="detail-value">
                          {bookingData.roomType === 'standard' ? 'Standard Room' : 
                            bookingData.roomType === 'deluxe' ? 'Deluxe Room' : 'Executive Suite'}
                        </div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Check-in</div>
                        <div className="detail-value">{new Date(bookingData.checkIn).toLocaleDateString()}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Check-out</div>
                        <div className="detail-value">{new Date(bookingData.checkOut).toLocaleDateString()}</div>
                      </div>
                      <div className="detail-row">
                        <div className="detail-label">Guests</div>
                        <div className="detail-value">{bookingData.guestCount}</div>
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
                      Next: {currentStep === 1 ? 'Guest Details' : 'Confirmation'}
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="booking-sidebar">
              <div className="summary-section">
                <h2 className="summary-title">Booking Summary</h2>
                
                <div className="summary-item">
                  <div className="item-label">Hotel</div>
                  <div className="item-value">{hotel.name}</div>
                </div>
                
                <div className="summary-item">
                  <div className="item-label">Location</div>
                  <div className="item-value">{hotel.location}</div>
                </div>
                
                {bookingData.roomType && (
                  <div className="summary-item">
                    <div className="item-label">Room Type</div>
                    <div className="item-value">
                      {bookingData.roomType === 'standard' ? 'Standard Room' : 
                        bookingData.roomType === 'deluxe' ? 'Deluxe Room' : 'Executive Suite'}
                    </div>
                  </div>
                )}
                
                {bookingData.checkIn && bookingData.checkOut && (
                  <>
                    <div className="summary-item">
                      <div className="item-label">Check-in</div>
                      <div className="item-value">{new Date(bookingData.checkIn).toLocaleDateString()}</div>
                    </div>
                    <div className="summary-item">
                      <div className="item-label">Check-out</div>
                      <div className="item-value">{new Date(bookingData.checkOut).toLocaleDateString()}</div>
                    </div>
                    <div className="summary-item">
                      <div className="item-label">Duration</div>
                      <div className="item-value">
                        {Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24))} nights
                      </div>
                    </div>
                  </>
                )}
                
                <div className="summary-item">
                  <div className="item-label">Guests</div>
                  <div className="item-value">{bookingData.guestCount}</div>
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

export default HotelBooking;
