import {
  users,
  flightBookings,
  hotelBookings,
  busBookings,
  trainBookings,
  newsletterSubscriptions,
  type User,
  type InsertUser,
  type FlightBooking,
  type InsertFlightBooking,
  type HotelBooking,
  type InsertHotelBooking,
  type BusBooking,
  type InsertBusBooking,
  type TrainBooking,
  type InsertTrainBooking,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Flight booking operations
  createFlightBooking(booking: InsertFlightBooking): Promise<FlightBooking>;
  getFlightBooking(id: number): Promise<FlightBooking | undefined>;
  getFlightBookingsByUser(userId: number): Promise<FlightBooking[]>;
  updateFlightBookingEmailStatus(id: number, status: boolean): Promise<void>;
  
  // Hotel booking operations
  createHotelBooking(booking: InsertHotelBooking): Promise<HotelBooking>;
  getHotelBooking(id: number): Promise<HotelBooking | undefined>;
  getHotelBookingsByUser(userId: number): Promise<HotelBooking[]>;
  updateHotelBookingEmailStatus(id: number, status: boolean): Promise<void>;
  
  // Bus booking operations
  createBusBooking(booking: InsertBusBooking): Promise<BusBooking>;
  getBusBooking(id: number): Promise<BusBooking | undefined>;
  getBusBookingsByUser(userId: number): Promise<BusBooking[]>;
  updateBusBookingEmailStatus(id: number, status: boolean): Promise<void>;
  
  // Train booking operations
  createTrainBooking(booking: InsertTrainBooking): Promise<TrainBooking>;
  getTrainBooking(id: number): Promise<TrainBooking | undefined>;
  getTrainBookingsByUser(userId: number): Promise<TrainBooking[]>;
  updateTrainBookingEmailStatus(id: number, status: boolean): Promise<void>;
  
  // Newsletter operations
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  
  // Booking history
  getAllUserBookings(userId: number): Promise<(FlightBooking | HotelBooking | BusBooking | TrainBooking)[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private flightBookings: Map<number, FlightBooking>;
  private hotelBookings: Map<number, HotelBooking>;
  private busBookings: Map<number, BusBooking>;
  private trainBookings: Map<number, TrainBooking>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  
  private userCurrentId: number;
  private flightBookingCurrentId: number;
  private hotelBookingCurrentId: number;
  private busBookingCurrentId: number;
  private trainBookingCurrentId: number;
  private newsletterSubscriptionCurrentId: number;

  constructor() {
    this.users = new Map();
    this.flightBookings = new Map();
    this.hotelBookings = new Map();
    this.busBookings = new Map();
    this.trainBookings = new Map();
    this.newsletterSubscriptions = new Map();
    
    this.userCurrentId = 1;
    this.flightBookingCurrentId = 1;
    this.hotelBookingCurrentId = 1;
    this.busBookingCurrentId = 1;
    this.trainBookingCurrentId = 1;
    this.newsletterSubscriptionCurrentId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Flight booking operations
  async createFlightBooking(insertBooking: InsertFlightBooking): Promise<FlightBooking> {
    const id = this.flightBookingCurrentId++;
    const now = new Date();
    const booking: FlightBooking = { 
      ...insertBooking, 
      id, 
      bookingDate: now, 
      emailSent: false 
    };
    this.flightBookings.set(id, booking);
    return booking;
  }
  
  async getFlightBooking(id: number): Promise<FlightBooking | undefined> {
    return this.flightBookings.get(id);
  }
  
  async getFlightBookingsByUser(userId: number): Promise<FlightBooking[]> {
    return Array.from(this.flightBookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  
  async updateFlightBookingEmailStatus(id: number, status: boolean): Promise<void> {
    const booking = await this.getFlightBooking(id);
    if (booking) {
      this.flightBookings.set(id, { ...booking, emailSent: status });
    }
  }
  
  // Hotel booking operations
  async createHotelBooking(insertBooking: InsertHotelBooking): Promise<HotelBooking> {
    const id = this.hotelBookingCurrentId++;
    const now = new Date();
    const booking: HotelBooking = { 
      ...insertBooking, 
      id, 
      bookingDate: now, 
      emailSent: false 
    };
    this.hotelBookings.set(id, booking);
    return booking;
  }
  
  async getHotelBooking(id: number): Promise<HotelBooking | undefined> {
    return this.hotelBookings.get(id);
  }
  
  async getHotelBookingsByUser(userId: number): Promise<HotelBooking[]> {
    return Array.from(this.hotelBookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  
  async updateHotelBookingEmailStatus(id: number, status: boolean): Promise<void> {
    const booking = await this.getHotelBooking(id);
    if (booking) {
      this.hotelBookings.set(id, { ...booking, emailSent: status });
    }
  }
  
  // Bus booking operations
  async createBusBooking(insertBooking: InsertBusBooking): Promise<BusBooking> {
    const id = this.busBookingCurrentId++;
    const now = new Date();
    const booking: BusBooking = { 
      ...insertBooking, 
      id, 
      bookingDate: now, 
      emailSent: false 
    };
    this.busBookings.set(id, booking);
    return booking;
  }
  
  async getBusBooking(id: number): Promise<BusBooking | undefined> {
    return this.busBookings.get(id);
  }
  
  async getBusBookingsByUser(userId: number): Promise<BusBooking[]> {
    return Array.from(this.busBookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  
  async updateBusBookingEmailStatus(id: number, status: boolean): Promise<void> {
    const booking = await this.getBusBooking(id);
    if (booking) {
      this.busBookings.set(id, { ...booking, emailSent: status });
    }
  }
  
  // Train booking operations
  async createTrainBooking(insertBooking: InsertTrainBooking): Promise<TrainBooking> {
    const id = this.trainBookingCurrentId++;
    const now = new Date();
    const booking: TrainBooking = { 
      ...insertBooking, 
      id, 
      bookingDate: now, 
      emailSent: false 
    };
    this.trainBookings.set(id, booking);
    return booking;
  }
  
  async getTrainBooking(id: number): Promise<TrainBooking | undefined> {
    return this.trainBookings.get(id);
  }
  
  async getTrainBookingsByUser(userId: number): Promise<TrainBooking[]> {
    return Array.from(this.trainBookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  
  async updateTrainBookingEmailStatus(id: number, status: boolean): Promise<void> {
    const booking = await this.getTrainBooking(id);
    if (booking) {
      this.trainBookings.set(id, { ...booking, emailSent: status });
    }
  }
  
  // Newsletter operations
  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = this.newsletterSubscriptionCurrentId++;
    const now = new Date();
    const subscription: NewsletterSubscription = { 
      ...insertSubscription, 
      id, 
      subscriptionDate: now, 
      active: true 
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }
  
  // Booking history
  async getAllUserBookings(userId: number): Promise<(FlightBooking | HotelBooking | BusBooking | TrainBooking)[]> {
    const flightBookings = await this.getFlightBookingsByUser(userId);
    const hotelBookings = await this.getHotelBookingsByUser(userId);
    const busBookings = await this.getBusBookingsByUser(userId);
    const trainBookings = await this.getTrainBookingsByUser(userId);
    
    return [
      ...flightBookings,
      ...hotelBookings,
      ...busBookings,
      ...trainBookings
    ].sort((a, b) => {
      return b.bookingDate.getTime() - a.bookingDate.getTime();
    });
  }
}

// Export a single instance of MemStorage to be used throughout the app
// Import MySQLStorage
import { MySQLStorage } from './mysqlStorage';

// Use MemStorage for development if MySQL is not available
// Use MySQL storage for production
export const storage = new MySQLStorage();
