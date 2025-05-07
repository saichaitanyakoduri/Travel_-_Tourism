import { users, hotels, buses, trains, bookings, destinations, type User, type InsertUser, type Hotel, type InsertHotel, type Bus, type InsertBus, type Train, type InsertTrain, type Booking, type InsertBooking, type Destination, type InsertDestination } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { pool } from './mysql-database';

// Initialize memory store for session management
const MemoryStore = createMemoryStore(session);

// Import the IStorage interface
import { IStorage } from './storage';

// Database storage implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // For simplicity, we'll still use memory store for sessions
    // In production, you might want to use MySQL session store
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
      const rowsArray = rows as any[];
      return rowsArray.length > 0 ? rowsArray[0] as User : undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      const rowsArray = rows as any[];
      return rowsArray.length > 0 ? rowsArray[0] as User : undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      const rowsArray = rows as any[];
      return rowsArray.length > 0 ? rowsArray[0] as User : undefined;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const [result] = await pool.query(
        'INSERT INTO users (username, password, email, firstName, lastName, phone) VALUES (?, ?, ?, ?, ?, ?)',
        [user.username, user.password, user.email, user.firstName, user.lastName, user.phone]
      );
      const insertResult = result as any;
      return { ...user, id: insertResult.insertId } as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Hotel operations
  async getHotels(): Promise<Hotel[]> {
    try {
      const [rows] = await pool.query('SELECT * FROM hotels');
      return rows as Hotel[];
    } catch (error) {
      console.error('Error getting hotels:', error);
      return [];
    }
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    try {
      const [rows] = await pool.query('SELECT * FROM hotels WHERE id = ?', [id]);
      const rowsArray = rows as any[];
      return rowsArray.length > 0 ? rowsArray[0] as Hotel : undefined;
    } catch (error) {
      console.error('Error getting hotel:', error);
      return undefined;
    }
  }

  async createHotel(hotel: InsertHotel): Promise<Hotel> {
    try {
      const facilities = hotel.facilities ? JSON.stringify(hotel.facilities) : null;
      
      const [result] = await pool.query(
        'INSERT INTO hotels (name, location, description, price, rating, image, facilities) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [hotel.name, hotel.location, hotel.description, hotel.price, hotel.rating, hotel.image, facilities]
      );
      const insertResult = result as any;
      return { ...hotel, id: insertResult.insertId } as Hotel;
    } catch (error) {
      console.error('Error creating hotel:', error);
      throw error;
    }
  }

  // Bus operations
  async getBuses(): Promise<Bus[]> {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id, 
          name as companyName, 
          from_location as \`from\`, 
          to_location as \`to\`, 
          price, 
          departure_time as departureTime,
          arrival_time as arrivalTime, 
          bus_type as busType,
          seats_available as seatsAvailable 
        FROM buses
      `);
      return rows as Bus[];
    } catch (error) {
      console.error('Error getting buses:', error);
      return [];
    }
  }

  async getBus(id: number): Promise<Bus | undefined> {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id, 
          name as companyName, 
          from_location as \`from\`, 
          to_location as \`to\`, 
          price, 
          departure_time as departureTime,
          arrival_time as arrivalTime, 
          bus_type as busType,
          seats_available as seatsAvailable 
        FROM buses 
        WHERE id = ?
      `, [id]);
      const rowsArray = rows as any[];
      return rowsArray.length > 0 ? rowsArray[0] as Bus : undefined;
    } catch (error) {
      console.error('Error getting bus:', error);
      return undefined;
    }
  }

  async searchBuses(from: string, to: string, date: string): Promise<Bus[]> {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id, 
          name as companyName, 
          from_location as \`from\`, 
          to_location as \`to\`, 
          price, 
          departure_time as departureTime,
          arrival_time as arrivalTime, 
          bus_type as busType,
          seats_available as seatsAvailable 
        FROM buses 
        WHERE from_location = ? AND to_location = ? AND departure_date = ? AND seats_available > 0
      `, [from, to, date]);
      return rows as Bus[];
    } catch (error) {
      console.error('Error searching buses:', error);
      return [];
    }
  }

  async createBus(bus: InsertBus): Promise<Bus> {
    try {
      const [result] = await pool.query(
        'INSERT INTO buses (name, from_location, to_location, departure_date, departure_time, arrival_date, arrival_time, price, bus_type, seats_available, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          bus.companyName, 
          bus.from, 
          bus.to, 
          new Date(), // Use current date as departure date for demo
          bus.departureTime,
          new Date(), // Use current date as arrival date for demo
          bus.arrivalTime,
          bus.price,
          bus.busType,
          bus.seatsAvailable,
          ''  // Empty description for demo
        ]
      );
      const insertResult = result as any;
      return { ...bus, id: insertResult.insertId } as Bus;
    } catch (error) {
      console.error('Error creating bus:', error);
      throw error;
    }
  }

  // Train operations
  async getTrains(): Promise<Train[]> {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id, 
          name as trainName,
          train_number as trainNumber,
          from_location as \`from\`, 
          to_location as \`to\`, 
          price, 
          departure_time as departureTime,
          arrival_time as arrivalTime, 
          train_type as class,
          seats_available as seatsAvailable 
        FROM trains
      `);
      return rows as Train[];
    } catch (error) {
      console.error('Error getting trains:', error);
      return [];
    }
  }

  async getTrain(id: number): Promise<Train | undefined> {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id, 
          name as trainName,
          train_number as trainNumber,
          from_location as \`from\`, 
          to_location as \`to\`, 
          price, 
          departure_time as departureTime,
          arrival_time as arrivalTime, 
          train_type as class,
          seats_available as seatsAvailable 
        FROM trains 
        WHERE id = ?
      `, [id]);
      const rowsArray = rows as any[];
      return rowsArray.length > 0 ? rowsArray[0] as Train : undefined;
    } catch (error) {
      console.error('Error getting train:', error);
      return undefined;
    }
  }

  async searchTrains(from: string, to: string, date: string): Promise<Train[]> {
    try {
      const [rows] = await pool.query(`
        SELECT 
          id, 
          name as trainName,
          train_number as trainNumber,
          from_location as \`from\`, 
          to_location as \`to\`, 
          price, 
          departure_time as departureTime,
          arrival_time as arrivalTime, 
          train_type as class,
          seats_available as seatsAvailable 
        FROM trains 
        WHERE from_location = ? AND to_location = ? AND departure_date = ? AND seats_available > 0
      `, [from, to, date]);
      return rows as Train[];
    } catch (error) {
      console.error('Error searching trains:', error);
      return [];
    }
  }

  async createTrain(train: InsertTrain): Promise<Train> {
    try {
      const [result] = await pool.query(
        'INSERT INTO trains (name, train_number, from_location, to_location, departure_date, departure_time, arrival_date, arrival_time, price, train_type, seats_available, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          train.trainName,
          train.trainNumber,
          train.from, 
          train.to, 
          new Date(), // Use current date as departure date for demo
          train.departureTime,
          new Date(), // Use current date as arrival date for demo
          train.arrivalTime,
          train.price,
          train.class,
          train.seatsAvailable,
          ''  // Empty description for demo
        ]
      );
      const insertResult = result as any;
      return { ...train, id: insertResult.insertId } as Train;
    } catch (error) {
      console.error('Error creating train:', error);
      throw error;
    }
  }

  // Booking operations
  async getBookings(userId: number): Promise<Booking[]> {
    try {
      const [rows] = await pool.query('SELECT * FROM bookings WHERE userId = ?', [userId]);
      return rows as Booking[];
    } catch (error) {
      console.error('Error getting bookings:', error);
      return [];
    }
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    try {
      const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [id]);
      const rowsArray = rows as any[];
      return rowsArray.length > 0 ? rowsArray[0] as Booking : undefined;
    } catch (error) {
      console.error('Error getting booking:', error);
      return undefined;
    }
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    try {
      const bookingDate = booking.bookingDate || new Date();
      const guestCount = booking.guestCount || 1;
      
      const [result] = await pool.query(
        'INSERT INTO bookings (userId, bookingType, referenceId, bookingDate, travelDate, returnDate, totalAmount, status, guestCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          booking.userId, 
          booking.bookingType, 
          booking.referenceId, 
          bookingDate,
          booking.travelDate,
          booking.returnDate,
          booking.totalAmount,
          booking.status,
          guestCount
        ]
      );
      const insertResult = result as any;
      return { 
        ...booking, 
        id: insertResult.insertId, 
        bookingDate,
        guestCount
      } as Booking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking> {
    try {
      await pool.query('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
      const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [id]);
      const rowsArray = rows as any[];
      if (rowsArray.length === 0) {
        throw new Error(`Booking with ID ${id} not found`);
      }
      return rowsArray[0] as Booking;
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  }

  // Destination operations
  async getDestinations(): Promise<Destination[]> {
    try {
      const [rows] = await pool.query('SELECT * FROM destinations');
      return rows as Destination[];
    } catch (error) {
      console.error('Error getting destinations:', error);
      return [];
    }
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    try {
      const [rows] = await pool.query('SELECT * FROM destinations WHERE id = ?', [id]);
      const rowsArray = rows as any[];
      return rowsArray.length > 0 ? rowsArray[0] as Destination : undefined;
    } catch (error) {
      console.error('Error getting destination:', error);
      return undefined;
    }
  }

  async createDestination(destination: InsertDestination): Promise<Destination> {
    try {
      const discount = destination.discount || null;
      
      const [result] = await pool.query(
        'INSERT INTO destinations (name, location, description, image, rating, discount) VALUES (?, ?, ?, ?, ?, ?)',
        [
          destination.name,
          destination.location,
          destination.description,
          destination.image,
          destination.rating,
          discount
        ]
      );
      const insertResult = result as any;
      return { ...destination, id: insertResult.insertId, discount } as Destination;
    } catch (error) {
      console.error('Error creating destination:', error);
      throw error;
    }
  }
}