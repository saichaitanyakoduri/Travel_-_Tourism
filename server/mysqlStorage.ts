import { pool } from './mysql';
import { 
  User, InsertUser, 
  FlightBooking, InsertFlightBooking,
  HotelBooking, InsertHotelBooking,
  BusBooking, InsertBusBooking,
  TrainBooking, InsertTrainBooking,
  NewsletterSubscription, InsertNewsletterSubscription
} from '@shared/schema';
import { IStorage } from './storage';

export class MySQLStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
      const users = rows as User[];
      return users.length > 0 ? users[0] : undefined;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
      const users = rows as User[];
      return users.length > 0 ? users[0] : undefined;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const [result] = await pool.execute(
        'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
        [user.firstName, user.lastName, user.email, user.password]
      );
      
      const insertResult = result as { insertId: number };
      return { ...user, id: insertResult.insertId };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Flight booking operations
  async createFlightBooking(booking: InsertFlightBooking): Promise<FlightBooking> {
    try {
      const [result] = await pool.execute(
        `INSERT INTO flight_bookings 
         (userId, departureCity, arrivalCity, departureDate, returnDate, airline, 
          flightNumber, passengerCount, travelClass, totalPrice, status, paymentStatus) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          booking.userId, booking.departureCity, booking.arrivalCity, 
          booking.departureDate, booking.returnDate || null, booking.airline,
          booking.flightNumber, booking.passengerCount, booking.travelClass, 
          booking.totalPrice, booking.status, booking.paymentStatus
        ]
      );
      
      const insertResult = result as { insertId: number };
      return { 
        ...booking, 
        id: insertResult.insertId, 
        emailSent: false
      };
    } catch (error) {
      console.error('Error creating flight booking:', error);
      throw error;
    }
  }

  async getFlightBooking(id: number): Promise<FlightBooking | undefined> {
    try {
      const [rows] = await pool.execute('SELECT * FROM flight_bookings WHERE id = ?', [id]);
      const bookings = rows as FlightBooking[];
      return bookings.length > 0 ? bookings[0] : undefined;
    } catch (error) {
      console.error('Error fetching flight booking:', error);
      return undefined;
    }
  }

  async getFlightBookingsByUser(userId: number): Promise<FlightBooking[]> {
    try {
      const [rows] = await pool.execute('SELECT * FROM flight_bookings WHERE userId = ?', [userId]);
      return rows as FlightBooking[];
    } catch (error) {
      console.error('Error fetching flight bookings by user:', error);
      return [];
    }
  }

  async updateFlightBookingEmailStatus(id: number, status: boolean): Promise<void> {
    try {
      await pool.execute(
        'UPDATE flight_bookings SET emailSent = ? WHERE id = ?',
        [status, id]
      );
    } catch (error) {
      console.error('Error updating flight booking email status:', error);
      throw error;
    }
  }

  // Hotel booking operations
  async createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking> {
    try {
      const [result] = await pool.execute(
        `INSERT INTO hotel_bookings 
         (userId, hotelName, location, checkInDate, checkOutDate, roomType, 
          guestCount, roomCount, totalPrice, status, paymentStatus) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          booking.userId, booking.hotelName, booking.location, 
          booking.checkInDate, booking.checkOutDate, booking.roomType,
          booking.guestCount, booking.roomCount, booking.totalPrice, 
          booking.status, booking.paymentStatus
        ]
      );
      
      const insertResult = result as { insertId: number };
      return { 
        ...booking, 
        id: insertResult.insertId, 
        emailSent: false
      };
    } catch (error) {
      console.error('Error creating hotel booking:', error);
      throw error;
    }
  }

  async getHotelBooking(id: number): Promise<HotelBooking | undefined> {
    try {
      const [rows] = await pool.execute('SELECT * FROM hotel_bookings WHERE id = ?', [id]);
      const bookings = rows as HotelBooking[];
      return bookings.length > 0 ? bookings[0] : undefined;
    } catch (error) {
      console.error('Error fetching hotel booking:', error);
      return undefined;
    }
  }

  async getHotelBookingsByUser(userId: number): Promise<HotelBooking[]> {
    try {
      const [rows] = await pool.execute('SELECT * FROM hotel_bookings WHERE userId = ?', [userId]);
      return rows as HotelBooking[];
    } catch (error) {
      console.error('Error fetching hotel bookings by user:', error);
      return [];
    }
  }

  async updateHotelBookingEmailStatus(id: number, status: boolean): Promise<void> {
    try {
      await pool.execute(
        'UPDATE hotel_bookings SET emailSent = ? WHERE id = ?',
        [status, id]
      );
    } catch (error) {
      console.error('Error updating hotel booking email status:', error);
      throw error;
    }
  }

  // Bus booking operations
  async createBusBooking(booking: InsertBusBooking): Promise<BusBooking> {
    try {
      const [result] = await pool.execute(
        `INSERT INTO bus_bookings 
         (userId, departureCity, arrivalCity, departureDate, returnDate, 
          busOperator, busType, passengerCount, totalPrice, status, paymentStatus) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          booking.userId, booking.departureCity, booking.arrivalCity, 
          booking.departureDate, booking.returnDate || null, booking.busOperator,
          booking.busType, booking.passengerCount, booking.totalPrice, 
          booking.status, booking.paymentStatus
        ]
      );
      
      const insertResult = result as { insertId: number };
      return { 
        ...booking, 
        id: insertResult.insertId, 
        emailSent: false
      };
    } catch (error) {
      console.error('Error creating bus booking:', error);
      throw error;
    }
  }

  async getBusBooking(id: number): Promise<BusBooking | undefined> {
    try {
      const [rows] = await pool.execute('SELECT * FROM bus_bookings WHERE id = ?', [id]);
      const bookings = rows as BusBooking[];
      return bookings.length > 0 ? bookings[0] : undefined;
    } catch (error) {
      console.error('Error fetching bus booking:', error);
      return undefined;
    }
  }

  async getBusBookingsByUser(userId: number): Promise<BusBooking[]> {
    try {
      const [rows] = await pool.execute('SELECT * FROM bus_bookings WHERE userId = ?', [userId]);
      return rows as BusBooking[];
    } catch (error) {
      console.error('Error fetching bus bookings by user:', error);
      return [];
    }
  }

  async updateBusBookingEmailStatus(id: number, status: boolean): Promise<void> {
    try {
      await pool.execute(
        'UPDATE bus_bookings SET emailSent = ? WHERE id = ?',
        [status, id]
      );
    } catch (error) {
      console.error('Error updating bus booking email status:', error);
      throw error;
    }
  }

  // Train booking operations
  async createTrainBooking(booking: InsertTrainBooking): Promise<TrainBooking> {
    try {
      const [result] = await pool.execute(
        `INSERT INTO train_bookings 
         (userId, departureStation, arrivalStation, departureDate, returnDate, 
          trainOperator, trainNumber, passengerCount, travelClass, totalPrice, status, paymentStatus) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          booking.userId, booking.departureStation, booking.arrivalStation, 
          booking.departureDate, booking.returnDate || null, booking.trainOperator,
          booking.trainNumber, booking.passengerCount, booking.travelClass, 
          booking.totalPrice, booking.status, booking.paymentStatus
        ]
      );
      
      const insertResult = result as { insertId: number };
      return { 
        ...booking, 
        id: insertResult.insertId, 
        emailSent: false
      };
    } catch (error) {
      console.error('Error creating train booking:', error);
      throw error;
    }
  }

  async getTrainBooking(id: number): Promise<TrainBooking | undefined> {
    try {
      const [rows] = await pool.execute('SELECT * FROM train_bookings WHERE id = ?', [id]);
      const bookings = rows as TrainBooking[];
      return bookings.length > 0 ? bookings[0] : undefined;
    } catch (error) {
      console.error('Error fetching train booking:', error);
      return undefined;
    }
  }

  async getTrainBookingsByUser(userId: number): Promise<TrainBooking[]> {
    try {
      const [rows] = await pool.execute('SELECT * FROM train_bookings WHERE userId = ?', [userId]);
      return rows as TrainBooking[];
    } catch (error) {
      console.error('Error fetching train bookings by user:', error);
      return [];
    }
  }

  async updateTrainBookingEmailStatus(id: number, status: boolean): Promise<void> {
    try {
      await pool.execute(
        'UPDATE train_bookings SET emailSent = ? WHERE id = ?',
        [status, id]
      );
    } catch (error) {
      console.error('Error updating train booking email status:', error);
      throw error;
    }
  }

  // Newsletter operations
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    try {
      const [result] = await pool.execute(
        'INSERT INTO newsletter_subscriptions (email) VALUES (?)',
        [subscription.email]
      );
      
      const insertResult = result as { insertId: number };
      return { 
        ...subscription, 
        id: insertResult.insertId
      };
    } catch (error) {
      console.error('Error creating newsletter subscription:', error);
      throw error;
    }
  }

  // Booking history
  async getAllUserBookings(userId: number): Promise<(FlightBooking | HotelBooking | BusBooking | TrainBooking)[]> {
    try {
      const allBookings = [];
      
      // Get flight bookings
      const [flightRows] = await pool.execute(
        'SELECT *, "flight" as bookingType FROM flight_bookings WHERE userId = ?', 
        [userId]
      );
      allBookings.push(...(flightRows as FlightBooking[]));
      
      // Get hotel bookings
      const [hotelRows] = await pool.execute(
        'SELECT *, "hotel" as bookingType FROM hotel_bookings WHERE userId = ?', 
        [userId]
      );
      allBookings.push(...(hotelRows as HotelBooking[]));
      
      // Get bus bookings
      const [busRows] = await pool.execute(
        'SELECT *, "bus" as bookingType FROM bus_bookings WHERE userId = ?', 
        [userId]
      );
      allBookings.push(...(busRows as BusBooking[]));
      
      // Get train bookings
      const [trainRows] = await pool.execute(
        'SELECT *, "train" as bookingType FROM train_bookings WHERE userId = ?', 
        [userId]
      );
      allBookings.push(...(trainRows as TrainBooking[]));
      
      // Sort by creation date (newest first)
      return allBookings.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });
    } catch (error) {
      console.error('Error fetching all user bookings:', error);
      return [];
    }
  }
}