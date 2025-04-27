import emailjs from '@emailjs/browser';

// Set default service ID from environment
const SERVICE_ID = 'service_rclc1ya';
const DEFAULT_TEMPLATE_ID = 'template_booking_confirmation';
const DEFAULT_USER_ID = 'user_your_user_id'; // This should be replaced with actual user ID

// Initialize EmailJS with your user ID
export const initEmailJS = (userId = DEFAULT_USER_ID) => {
  emailjs.init(userId);
};

// Send a booking confirmation email
export const sendBookingConfirmation = async (bookingData, templateId = DEFAULT_TEMPLATE_ID) => {
  try {
    // Prepare template parameters based on booking data
    const templateParams = {
      to_name: `${bookingData.firstName} ${bookingData.lastName}`,
      to_email: bookingData.email,
      booking_id: bookingData.id || 'N/A',
      booking_type: bookingData.type || 'Travel',
      booking_details: formatBookingDetails(bookingData),
      total_price: bookingData.totalPrice || 'N/A',
      booking_date: new Date().toLocaleDateString(),
      customer_service_email: 'support@travelworld.com',
      customer_service_phone: '+1 (555) 123-4567'
    };

    // Send the email
    const response = await emailjs.send(
      SERVICE_ID,
      templateId,
      templateParams
    );

    return {
      success: true,
      message: 'Booking confirmation email sent successfully!',
      response
    };
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return {
      success: false,
      message: 'Failed to send booking confirmation email. Please contact customer support.',
      error
    };
  }
};

// Send a newsletter subscription confirmation
export const sendNewsletterConfirmation = async (email, templateId = 'template_newsletter_subscription') => {
  try {
    const templateParams = {
      to_email: email,
      subscription_date: new Date().toLocaleDateString(),
      unsubscribe_link: 'https://travelworld.com/unsubscribe?email=' + encodeURIComponent(email)
    };

    const response = await emailjs.send(
      SERVICE_ID,
      templateId,
      templateParams
    );

    return {
      success: true,
      message: 'Newsletter subscription confirmation sent!',
      response
    };
  } catch (error) {
    console.error('Error sending newsletter confirmation:', error);
    return {
      success: false,
      message: 'Failed to send newsletter confirmation.',
      error
    };
  }
};

// Helper function to format booking details based on booking type
const formatBookingDetails = (booking) => {
  // Flight booking
  if (booking.departureCity && booking.arrivalCity && booking.airline) {
    return `
      Flight: ${booking.airline} ${booking.flightNumber}
      From: ${booking.departureCity}
      To: ${booking.arrivalCity}
      Date: ${booking.departureDate}
      Return: ${booking.returnDate || 'N/A'}
      Class: ${booking.travelClass}
      Passengers: ${booking.passengerCount}
    `;
  }
  
  // Hotel booking
  if (booking.hotelName && booking.checkInDate) {
    return `
      Hotel: ${booking.hotelName}
      Location: ${booking.location}
      Check-in: ${booking.checkInDate}
      Check-out: ${booking.checkOutDate}
      Room Type: ${booking.roomType}
      Guests: ${booking.guestCount}
      Rooms: ${booking.roomCount}
    `;
  }
  
  // Bus booking
  if (booking.departureCity && booking.arrivalCity && booking.busOperator) {
    return `
      Bus: ${booking.busOperator}
      Type: ${booking.busType}
      From: ${booking.departureCity}
      To: ${booking.arrivalCity}
      Date: ${booking.departureDate}
      Return: ${booking.returnDate || 'N/A'}
      Passengers: ${booking.passengerCount}
    `;
  }
  
  // Train booking
  if (booking.departureStation && booking.arrivalStation && booking.trainOperator) {
    return `
      Train: ${booking.trainOperator} ${booking.trainNumber}
      From: ${booking.departureStation}
      To: ${booking.arrivalStation}
      Date: ${booking.departureDate}
      Return: ${booking.returnDate || 'N/A'}
      Class: ${booking.travelClass}
      Passengers: ${booking.passengerCount}
    `;
  }
  
  // Generic booking fallback
  return `Booking ID: ${booking.id || 'N/A'}, Amount: ${booking.totalPrice || 'N/A'}`;
};
