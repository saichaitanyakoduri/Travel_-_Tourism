import { createContext, useState, useContext } from 'react';
import { flightApi, hotelApi, busApi, trainApi } from '../lib/api';
import { sendBookingConfirmation } from '../lib/emailjs';
import { useAuth } from './AuthContext';

// Booking types
interface FlightBooking {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate?: string;
  airline: string;
  flightNumber: string;
  passengerCount: number;
  travelClass: string;
  userId: number;
  totalPrice: string;
  status: string;
  paymentStatus: string;
}

interface HotelBooking {
  hotelName: string;
  location: string;
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  guestCount: number;
  roomCount: number;
  userId: number;
  totalPrice: string;
  status: string;
  paymentStatus: string;
}

interface BusBooking {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate?: string;
  busOperator: string;
  busType: string;
  passengerCount: number;
  userId: number;
  totalPrice: string;
  status: string;
  paymentStatus: string;
}

interface TrainBooking {
  departureStation: string;
  arrivalStation: string;
  departureDate: string;
  returnDate?: string;
  trainOperator: string;
  trainNumber: string;
  passengerCount: number;
  travelClass: string;
  userId: number;
  totalPrice: string;
  status: string;
  paymentStatus: string;
}

// Context state
interface BookingContextState {
  isLoading: boolean;
  error: string | null;
  bookFlight: (bookingData: Omit<FlightBooking, 'userId'>) => Promise<any>;
  bookHotel: (bookingData: Omit<HotelBooking, 'userId'>) => Promise<any>;
  bookBus: (bookingData: Omit<BusBooking, 'userId'>) => Promise<any>;
  bookTrain: (bookingData: Omit<TrainBooking, 'userId'>) => Promise<any>;
  bookingHistory: (FlightBooking | HotelBooking | BusBooking | TrainBooking)[];
  fetchBookingHistory: () => Promise<void>;
}

// Create context with default values
const BookingContext = createContext<BookingContextState>({
  isLoading: false,
  error: null,
  bookFlight: async () => ({}),
  bookHotel: async () => ({}),
  bookBus: async () => ({}),
  bookTrain: async () => ({}),
  bookingHistory: [],
  fetchBookingHistory: async () => {},
});

// Create context provider
export const BookingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingHistory, setBookingHistory] = useState<any[]>([]);
  const { user } = useAuth();

  // Book a flight
  const bookFlight = async (bookingData: Omit<FlightBooking, 'userId'>) => {
    if (!user) {
      setError('You must be logged in to book a flight');
      return null;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Add userId to booking data
      const completeBookingData = {
        ...bookingData,
        userId: user.id,
      };
      
      // Create booking in database
      const response = await flightApi.createBooking(completeBookingData);
      
      // Send confirmation email
      if (response.booking) {
        try {
          const emailData = {
            ...response.booking,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: 'flight'
          };
          
          const emailResult = await sendBookingConfirmation(emailData);
          
          if (emailResult.success) {
            await flightApi.updateEmailStatus(response.booking.id);
          }
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
        }
      }
      
      return response;
    } catch (err) {
      setError('Failed to book flight. Please try again.');
      console.error('Flight booking error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Book a hotel
  const bookHotel = async (bookingData: Omit<HotelBooking, 'userId'>) => {
    if (!user) {
      setError('You must be logged in to book a hotel');
      return null;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Add userId to booking data
      const completeBookingData = {
        ...bookingData,
        userId: user.id,
      };
      
      // Create booking in database
      const response = await hotelApi.createBooking(completeBookingData);
      
      // Send confirmation email
      if (response.booking) {
        try {
          const emailData = {
            ...response.booking,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: 'hotel'
          };
          
          const emailResult = await sendBookingConfirmation(emailData);
          
          if (emailResult.success) {
            await hotelApi.updateEmailStatus(response.booking.id);
          }
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
        }
      }
      
      return response;
    } catch (err) {
      setError('Failed to book hotel. Please try again.');
      console.error('Hotel booking error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Book a bus
  const bookBus = async (bookingData: Omit<BusBooking, 'userId'>) => {
    if (!user) {
      setError('You must be logged in to book a bus');
      return null;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Add userId to booking data
      const completeBookingData = {
        ...bookingData,
        userId: user.id,
      };
      
      // Create booking in database
      const response = await busApi.createBooking(completeBookingData);
      
      // Send confirmation email
      if (response.booking) {
        try {
          const emailData = {
            ...response.booking,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: 'bus'
          };
          
          const emailResult = await sendBookingConfirmation(emailData);
          
          if (emailResult.success) {
            await busApi.updateEmailStatus(response.booking.id);
          }
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
        }
      }
      
      return response;
    } catch (err) {
      setError('Failed to book bus. Please try again.');
      console.error('Bus booking error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Book a train
  const bookTrain = async (bookingData: Omit<TrainBooking, 'userId'>) => {
    if (!user) {
      setError('You must be logged in to book a train');
      return null;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Add userId to booking data
      const completeBookingData = {
        ...bookingData,
        userId: user.id,
      };
      
      // Create booking in database
      const response = await trainApi.createBooking(completeBookingData);
      
      // Send confirmation email
      if (response.booking) {
        try {
          const emailData = {
            ...response.booking,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: 'train'
          };
          
          const emailResult = await sendBookingConfirmation(emailData);
          
          if (emailResult.success) {
            await trainApi.updateEmailStatus(response.booking.id);
          }
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
        }
      }
      
      return response;
    } catch (err) {
      setError('Failed to book train. Please try again.');
      console.error('Train booking error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch booking history
  const fetchBookingHistory = async () => {
    if (!user) {
      setError('You must be logged in to view booking history');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const { data } = await apiRequest('GET', '/api/bookings/history', null);
      setBookingHistory(data.bookings || []);
    } catch (err) {
      setError('Failed to fetch booking history. Please try again.');
      console.error('Booking history error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Provide the context values
  const value = {
    isLoading,
    error,
    bookFlight,
    bookHotel,
    bookBus,
    bookTrain,
    bookingHistory,
    fetchBookingHistory,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

// Create a custom hook for easy usage of the context
export const useBooking = () => useContext(BookingContext);

export default BookingContext;
