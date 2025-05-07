import { users, hotels, buses, trains, bookings, destinations, type User, type InsertUser, type Hotel, type InsertHotel, type Bus, type InsertBus, type Train, type InsertTrain, type Booking, type InsertBooking, type Destination, type InsertDestination } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// Initialize memory store
const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Hotel operations
  getHotels(): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;
  
  // Bus operations
  getBuses(): Promise<Bus[]>;
  getBus(id: number): Promise<Bus | undefined>;
  searchBuses(from: string, to: string, date: string): Promise<Bus[]>;
  createBus(bus: InsertBus): Promise<Bus>;
  
  // Train operations
  getTrains(): Promise<Train[]>;
  getTrain(id: number): Promise<Train | undefined>;
  searchTrains(from: string, to: string, date: string): Promise<Train[]>;
  createTrain(train: InsertTrain): Promise<Train>;
  
  // Booking operations
  getBookings(userId: number): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking>;
  
  // Destination operations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;

  // Session store
  sessionStore: session.Store;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private hotels: Map<number, Hotel>;
  private buses: Map<number, Bus>;
  private trains: Map<number, Train>;
  private bookings: Map<number, Booking>;
  private destinations: Map<number, Destination>;
  sessionStore: session.Store;
  
  private userIdCounter: number;
  private hotelIdCounter: number;
  private busIdCounter: number;
  private trainIdCounter: number;
  private bookingIdCounter: number;
  private destinationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.hotels = new Map();
    this.buses = new Map();
    this.trains = new Map();
    this.bookings = new Map();
    this.destinations = new Map();
    
    this.userIdCounter = 1;
    this.hotelIdCounter = 1;
    this.busIdCounter = 1;
    this.trainIdCounter = 1;
    this.bookingIdCounter = 1;
    this.destinationIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Add initial data
    this.initializeData();
  }

  private initializeData() {
    // Add sample hotels (10 total)
    this.createHotel({
      name: "Grand Luxury Resort & Spa",
      location: "Maldives, Indian Ocean",
      description: "Experience world-class accommodations with beach front views.",
      price: 350,
      rating: 5,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      facilities: ["Beach Front", "Spa", "Pool", "All-Inclusive"]
    });
    
    this.createHotel({
      name: "Urban Boutique Hotel",
      location: "New York City, USA",
      description: "Modern hotel in the heart of NYC with rooftop bar.",
      price: 275,
      rating: 4,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      facilities: ["City Center", "Rooftop Bar", "Luxury", "WiFi"]
    });
    
    this.createHotel({
      name: "Mountain Lodge Resort",
      location: "Aspen, Colorado",
      description: "Ski-in/Ski-out resort with mountain views and hot tubs.",
      price: 320,
      rating: 4,
      image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      facilities: ["Mountain View", "Ski-in/Ski-out", "Fireplace", "Hot Tub"]
    });
    
    this.createHotel({
      name: "Beachside Paradise Resort",
      location: "Cancun, Mexico",
      description: "All-inclusive beachfront resort with multiple pools and water activities.",
      price: 390,
      rating: 5,
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      facilities: ["All-Inclusive", "Beach Access", "Multiple Pools", "Water Sports"]
    });
    
    this.createHotel({
      name: "Historic City Hotel",
      location: "Prague, Czech Republic",
      description: "Elegant hotel in a historic building in the heart of Prague's Old Town.",
      price: 245,
      rating: 4,
      image: "https://images.unsplash.com/photo-1549294413-26f195471c9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      facilities: ["Historic Building", "Breakfast Included", "City Center", "Free WiFi"]
    });
    
    this.createHotel({
      name: "Desert Oasis Resort",
      location: "Dubai, UAE",
      description: "Luxury desert resort with private pools and desert views.",
      price: 420,
      rating: 5,
      image: "https://images.unsplash.com/photo-1512958783669-56e451fc6d5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      facilities: ["Private Pools", "Desert Views", "Spa Services", "All-Inclusive"]
    });
    
    this.createHotel({
      name: "Seaside Cliff Hotel",
      location: "Amalfi Coast, Italy",
      description: "Stunning hotel perched on the cliffs with panoramic views of the Mediterranean.",
      price: 375,
      rating: 5,
      image: "https://images.unsplash.com/photo-1534612899740-55c821a90129?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      facilities: ["Sea Views", "Fine Dining", "Infinity Pool", "Beach Access"]
    });
    
    this.createHotel({
      name: "Rainforest Eco Lodge",
      location: "Costa Rica",
      description: "Sustainable eco-lodge nestled in the rainforest with wildlife viewing opportunities.",
      price: 280,
      rating: 4,
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      facilities: ["Eco-Friendly", "Wildlife Tours", "Jungle Views", "Sustainable"]
    });
    
    this.createHotel({
      name: "Cherry Blossom Inn",
      location: "Kyoto, Japan",
      description: "Traditional Japanese ryokan with garden views and onsen bath.",
      price: 310,
      rating: 4,
      image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      facilities: ["Traditional Ryokan", "Onsen Bath", "Garden Views", "Tea Ceremony"]
    });
    
    this.createHotel({
      name: "Northern Lights Lodge",
      location: "Tromsø, Norway",
      description: "Remote lodge with glass ceiling rooms for viewing the northern lights.",
      price: 450,
      rating: 5,
      image: "https://images.unsplash.com/photo-1520681062065-4cd6cb3a183c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      facilities: ["Glass Ceiling", "Northern Lights Views", "Winter Activities", "Gourmet Dining"]
    });
    
    // Add sample destinations
    this.createDestination({
      name: "Santorini",
      location: "Greece",
      description: "Experience the stunning white-washed buildings and breathtaking sunsets.",
      price: 899,
      rating: 5,
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      discount: 20
    });
    
    this.createDestination({
      name: "Venice",
      location: "Italy",
      description: "Explore the magical city of canals, gondolas, and historic architecture.",
      price: 749,
      rating: 5,
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      discount: 15
    });
    
    this.createDestination({
      name: "Bali",
      location: "Indonesia",
      description: "Discover pristine beaches, lush rice terraces, and vibrant culture.",
      price: 1050,
      rating: 5,
      image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      discount: 10
    });
    
    // Add sample buses (10 total)
    this.createBus({
      companyName: "Luxury Transport",
      from: "New York",
      to: "Boston",
      departureTime: "08:00 AM",
      arrivalTime: "12:30 PM",
      price: 45,
      seatsAvailable: 35,
      busType: "Luxury"
    });
    
    this.createBus({
      companyName: "Express Tours",
      from: "Los Angeles",
      to: "San Francisco",
      departureTime: "09:15 AM",
      arrivalTime: "16:45 PM",
      price: 65,
      seatsAvailable: 28,
      busType: "Premium"
    });
    
    this.createBus({
      companyName: "Metro Connections",
      from: "Chicago",
      to: "Milwaukee",
      departureTime: "10:30 AM",
      arrivalTime: "12:45 PM",
      price: 35,
      seatsAvailable: 42,
      busType: "Standard"
    });
    
    this.createBus({
      companyName: "Sunshine Travel",
      from: "Miami",
      to: "Orlando",
      departureTime: "07:45 AM",
      arrivalTime: "11:30 AM",
      price: 55,
      seatsAvailable: 38,
      busType: "Premium"
    });
    
    this.createBus({
      companyName: "Mountain Express",
      from: "Denver",
      to: "Aspen",
      departureTime: "08:30 AM",
      arrivalTime: "12:15 PM",
      price: 60,
      seatsAvailable: 30,
      busType: "Luxury"
    });
    
    this.createBus({
      companyName: "Capital Shuttle",
      from: "Washington DC",
      to: "Philadelphia",
      departureTime: "09:00 AM",
      arrivalTime: "11:30 AM",
      price: 40,
      seatsAvailable: 35,
      busType: "Standard"
    });
    
    this.createBus({
      companyName: "Southern Comfort",
      from: "Atlanta",
      to: "Nashville",
      departureTime: "07:30 AM",
      arrivalTime: "12:45 PM",
      price: 70,
      seatsAvailable: 32,
      busType: "Premium"
    });
    
    this.createBus({
      companyName: "Pacific Coast Lines",
      from: "Portland",
      to: "Seattle",
      departureTime: "10:15 AM",
      arrivalTime: "13:30 PM",
      price: 50,
      seatsAvailable: 40,
      busType: "Standard"
    });
    
    this.createBus({
      companyName: "Desert Cruiser",
      from: "Las Vegas",
      to: "Phoenix",
      departureTime: "06:45 AM",
      arrivalTime: "12:15 PM",
      price: 65,
      seatsAvailable: 35,
      busType: "Premium"
    });
    
    this.createBus({
      companyName: "Lone Star Express",
      from: "Houston",
      to: "Dallas",
      departureTime: "08:45 AM",
      arrivalTime: "12:30 PM",
      price: 55,
      seatsAvailable: 45,
      busType: "Standard"
    });
    
    // Add sample trains (10 total)
    this.createTrain({
      trainName: "Express Bullet",
      trainNumber: "EB-101",
      from: "Paris",
      to: "London",
      departureTime: "10:00 AM",
      arrivalTime: "13:30 PM",
      price: 120,
      seatsAvailable: 120,
      class: "First Class"
    });
    
    this.createTrain({
      trainName: "Coastal Cruiser",
      trainNumber: "CC-202",
      from: "Seattle",
      to: "Portland",
      departureTime: "08:45 AM",
      arrivalTime: "12:15 PM",
      price: 85,
      seatsAvailable: 150,
      class: "Business"
    });
    
    this.createTrain({
      trainName: "Alpine Express",
      trainNumber: "AE-303",
      from: "Zurich",
      to: "Milan",
      departureTime: "07:30 AM",
      arrivalTime: "11:45 AM",
      price: 95,
      seatsAvailable: 100,
      class: "First Class"
    });
    
    this.createTrain({
      trainName: "Eastern Star",
      trainNumber: "ES-404",
      from: "Berlin",
      to: "Warsaw",
      departureTime: "09:15 AM",
      arrivalTime: "14:30 PM",
      price: 110,
      seatsAvailable: 140,
      class: "Business"
    });
    
    this.createTrain({
      trainName: "Nordic Voyager",
      trainNumber: "NV-505",
      from: "Stockholm",
      to: "Oslo",
      departureTime: "08:00 AM",
      arrivalTime: "12:45 PM",
      price: 75,
      seatsAvailable: 160,
      class: "Economy"
    });
    
    this.createTrain({
      trainName: "Mediterranean Express",
      trainNumber: "ME-606",
      from: "Barcelona",
      to: "Nice",
      departureTime: "10:30 AM",
      arrivalTime: "16:15 PM",
      price: 130,
      seatsAvailable: 110,
      class: "First Class"
    });
    
    this.createTrain({
      trainName: "City Hopper",
      trainNumber: "CH-707",
      from: "Amsterdam",
      to: "Brussels",
      departureTime: "11:00 AM",
      arrivalTime: "13:30 PM",
      price: 70,
      seatsAvailable: 180,
      class: "Business"
    });
    
    this.createTrain({
      trainName: "Imperial Transit",
      trainNumber: "IT-808",
      from: "Vienna",
      to: "Budapest",
      departureTime: "07:15 AM",
      arrivalTime: "10:45 AM",
      price: 85,
      seatsAvailable: 130,
      class: "Economy"
    });
    
    this.createTrain({
      trainName: "Golden Eagle",
      trainNumber: "GE-909",
      from: "Moscow",
      to: "St. Petersburg",
      departureTime: "09:45 AM",
      arrivalTime: "13:50 PM",
      price: 100,
      seatsAvailable: 90,
      class: "First Class"
    });
    
    this.createTrain({
      trainName: "Southern Cross",
      trainNumber: "SC-1010",
      from: "Rome",
      to: "Naples",
      departureTime: "08:30 AM",
      arrivalTime: "11:15 AM",
      price: 65,
      seatsAvailable: 140,
      class: "Business"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user = { ...insertUser, id } as User;
    this.users.set(id, user);
    return user;
  }
  
  // Hotel methods
  async getHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values());
  }
  
  async getHotel(id: number): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }
  
  async createHotel(insertHotel: InsertHotel): Promise<Hotel> {
    const id = this.hotelIdCounter++;
    const hotel = { ...insertHotel, id } as Hotel;
    this.hotels.set(id, hotel);
    return hotel;
  }
  
  // Bus methods
  async getBuses(): Promise<Bus[]> {
    return Array.from(this.buses.values());
  }
  
  async getBus(id: number): Promise<Bus | undefined> {
    return this.buses.get(id);
  }
  
  async searchBuses(from: string, to: string, date: string): Promise<Bus[]> {
    return Array.from(this.buses.values()).filter(
      (bus) => bus.from.toLowerCase().includes(from.toLowerCase()) && 
                bus.to.toLowerCase().includes(to.toLowerCase())
    );
  }
  
  async createBus(insertBus: InsertBus): Promise<Bus> {
    const id = this.busIdCounter++;
    const bus = { ...insertBus, id } as Bus;
    this.buses.set(id, bus);
    return bus;
  }
  
  // Train methods
  async getTrains(): Promise<Train[]> {
    return Array.from(this.trains.values());
  }
  
  async getTrain(id: number): Promise<Train | undefined> {
    return this.trains.get(id);
  }
  
  async searchTrains(from: string, to: string, date: string): Promise<Train[]> {
    return Array.from(this.trains.values()).filter(
      (train) => train.from.toLowerCase().includes(from.toLowerCase()) && 
                 train.to.toLowerCase().includes(to.toLowerCase())
    );
  }
  
  async createTrain(insertTrain: InsertTrain): Promise<Train> {
    const id = this.trainIdCounter++;
    const train = { ...insertTrain, id } as Train;
    this.trains.set(id, train);
    return train;
  }
  
  // Booking methods
  async getBookings(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
  
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    // Set defaults for any missing fields
    const bookingDate = insertBooking.bookingDate || new Date();
    const guestCount = insertBooking.guestCount || 1;
    const booking = { ...insertBooking, id, bookingDate, guestCount } as Booking;
    this.bookings.set(id, booking);
    return booking;
  }
  
  async updateBookingStatus(id: number, status: string): Promise<Booking> {
    const booking = this.bookings.get(id);
    if (!booking) {
      throw new Error(`Booking with ID ${id} not found`);
    }
    
    const updatedBooking = { ...booking, status } as Booking;
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
  
  // Destination methods
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }
  
  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }
  
  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.destinationIdCounter++;
    const discount = insertDestination.discount || null;
    const destination = { ...insertDestination, id, discount } as Destination;
    this.destinations.set(id, destination);
    return destination;
  }
}

// Import the DatabaseStorage for XAMPP MySQL
import { DatabaseStorage } from './db-storage';

// Switch between storage implementations
// Use MemStorage for in-memory development, or DatabaseStorage for MySQL
let useDatabase = false;

try {
  // If process.env.USE_DATABASE is set to "true", use the database
  useDatabase = process.env.USE_DATABASE === "true";
  
  // Log which storage method is being used
  console.log(`[database] Using ${useDatabase ? 'MySQL database' : 'in-memory storage'} for development`);
} catch (error) {
  console.error("[database] Error checking database environment variables:", error);
  console.log("[database] Falling back to in-memory storage");
}

// Export the appropriate storage implementation
export const storage = useDatabase ? new DatabaseStorage() : new MemStorage();