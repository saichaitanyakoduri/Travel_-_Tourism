import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  insertUserSchema,
  insertFlightBookingSchema,
  insertHotelBookingSchema,
  insertBusBookingSchema,
  insertTrainBookingSchema,
  insertNewsletterSubscriptionSchema
} from "@shared/schema";
import session from "express-session";
import { z } from "zod";

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Middleware to verify JWT token
const authenticateToken = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    
    req.body.user = user;
    next();
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  app.use(
    session({
      secret: "travelworld_session_secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production", maxAge: 24 * 60 * 60 * 1000 } // 24 hours
    })
  );

  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      // Create new user with hashed password
      const newUser = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      
      // Generate JWT token
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: "24h" }
      );
      
      // Return user data (excluding password) and token
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json({
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error during registration" });
    }
  });
  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "24h" }
      );
      
      // Return user data (excluding password) and token
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json({
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      res.status(500).json({ message: "Server error during login" });
    }
  });
  
  // User profile route
  app.get("/api/user/profile", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.user.id;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Server error fetching user profile" });
    }
  });
  
  // Flight booking routes
  app.post("/api/bookings/flight", authenticateToken, async (req, res) => {
    try {
      const bookingData = insertFlightBookingSchema.parse(req.body);
      const booking = await storage.createFlightBooking(bookingData);
      res.status(201).json({ booking });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error creating flight booking" });
    }
  });
  
  app.get("/api/bookings/flight/:id", authenticateToken, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      const booking = await storage.getFlightBooking(bookingId);
      
      if (!booking) {
        return res.status(404).json({ message: "Flight booking not found" });
      }
      
      res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({ message: "Server error fetching flight booking" });
    }
  });
  
  app.post("/api/bookings/flight/:id/email-sent", authenticateToken, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      await storage.updateFlightBookingEmailStatus(bookingId, true);
      res.status(200).json({ message: "Email status updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error updating email status" });
    }
  });
  
  // Hotel booking routes
  app.post("/api/bookings/hotel", authenticateToken, async (req, res) => {
    try {
      const bookingData = insertHotelBookingSchema.parse(req.body);
      const booking = await storage.createHotelBooking(bookingData);
      res.status(201).json({ booking });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error creating hotel booking" });
    }
  });
  
  app.get("/api/bookings/hotel/:id", authenticateToken, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      const booking = await storage.getHotelBooking(bookingId);
      
      if (!booking) {
        return res.status(404).json({ message: "Hotel booking not found" });
      }
      
      res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({ message: "Server error fetching hotel booking" });
    }
  });
  
  app.post("/api/bookings/hotel/:id/email-sent", authenticateToken, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      await storage.updateHotelBookingEmailStatus(bookingId, true);
      res.status(200).json({ message: "Email status updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error updating email status" });
    }
  });
  
  // Bus booking routes
  app.post("/api/bookings/bus", authenticateToken, async (req, res) => {
    try {
      const bookingData = insertBusBookingSchema.parse(req.body);
      const booking = await storage.createBusBooking(bookingData);
      res.status(201).json({ booking });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error creating bus booking" });
    }
  });
  
  app.get("/api/bookings/bus/:id", authenticateToken, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      const booking = await storage.getBusBooking(bookingId);
      
      if (!booking) {
        return res.status(404).json({ message: "Bus booking not found" });
      }
      
      res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({ message: "Server error fetching bus booking" });
    }
  });
  
  app.post("/api/bookings/bus/:id/email-sent", authenticateToken, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      await storage.updateBusBookingEmailStatus(bookingId, true);
      res.status(200).json({ message: "Email status updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error updating email status" });
    }
  });
  
  // Train booking routes
  app.post("/api/bookings/train", authenticateToken, async (req, res) => {
    try {
      const bookingData = insertTrainBookingSchema.parse(req.body);
      const booking = await storage.createTrainBooking(bookingData);
      res.status(201).json({ booking });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error creating train booking" });
    }
  });
  
  app.get("/api/bookings/train/:id", authenticateToken, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      const booking = await storage.getTrainBooking(bookingId);
      
      if (!booking) {
        return res.status(404).json({ message: "Train booking not found" });
      }
      
      res.status(200).json({ booking });
    } catch (error) {
      res.status(500).json({ message: "Server error fetching train booking" });
    }
  });
  
  app.post("/api/bookings/train/:id/email-sent", authenticateToken, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      await storage.updateTrainBookingEmailStatus(bookingId, true);
      res.status(200).json({ message: "Email status updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error updating email status" });
    }
  });
  
  // Booking history route
  app.get("/api/bookings/history", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.user.id;
      const bookings = await storage.getAllUserBookings(userId);
      res.status(200).json({ bookings });
    } catch (error) {
      res.status(500).json({ message: "Server error fetching booking history" });
    }
  });
  
  // Newsletter subscription route
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const subscriptionData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Check if email is already subscribed
      const existingSubscriptions = Array.from(storage.getAllUserBookings(0));
      const isAlreadySubscribed = existingSubscriptions.some(booking => 
        'email' in req.body && req.body.email === booking.email
      );
      
      if (isAlreadySubscribed) {
        return res.status(409).json({ message: "This email is already subscribed to the newsletter" });
      }
      
      const subscription = await storage.createNewsletterSubscription(subscriptionData);
      res.status(201).json({ subscription, message: "Successfully subscribed to the newsletter" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subscription data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error creating newsletter subscription" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
