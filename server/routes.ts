import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { z } from "zod";
import { insertBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication
  setupAuth(app);

  // API routes
  app.get("/api/hotels", async (req, res) => {
    try {
      const hotels = await storage.getHotels();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hotels" });
    }
  });

  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const hotelId = parseInt(req.params.id);
      const hotel = await storage.getHotel(hotelId);
      
      if (!hotel) {
        return res.status(404).json({ error: "Hotel not found" });
      }
      
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hotel details" });
    }
  });

  app.get("/api/buses", async (req, res) => {
    try {
      const buses = await storage.getBuses();
      res.json(buses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch buses" });
    }
  });

  app.get("/api/buses/search", async (req, res) => {
    try {
      const { from, to, date } = req.query;
      
      if (!from || !to || !date) {
        return res.status(400).json({ error: "Missing required search parameters" });
      }
      
      const buses = await storage.searchBuses(from.toString(), to.toString(), date.toString());
      res.json(buses);
    } catch (error) {
      res.status(500).json({ error: "Failed to search buses" });
    }
  });

  app.get("/api/buses/:id", async (req, res) => {
    try {
      const busId = parseInt(req.params.id);
      const bus = await storage.getBus(busId);
      
      if (!bus) {
        return res.status(404).json({ error: "Bus not found" });
      }
      
      res.json(bus);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bus details" });
    }
  });

  app.get("/api/trains", async (req, res) => {
    try {
      const trains = await storage.getTrains();
      res.json(trains);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trains" });
    }
  });

  app.get("/api/trains/search", async (req, res) => {
    try {
      const { from, to, date } = req.query;
      
      if (!from || !to || !date) {
        return res.status(400).json({ error: "Missing required search parameters" });
      }
      
      const trains = await storage.searchTrains(from.toString(), to.toString(), date.toString());
      res.json(trains);
    } catch (error) {
      res.status(500).json({ error: "Failed to search trains" });
    }
  });

  app.get("/api/trains/:id", async (req, res) => {
    try {
      const trainId = parseInt(req.params.id);
      const train = await storage.getTrain(trainId);
      
      if (!train) {
        return res.status(404).json({ error: "Train not found" });
      }
      
      res.json(train);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch train details" });
    }
  });

  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destinationId = parseInt(req.params.id);
      const destination = await storage.getDestination(destinationId);
      
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      
      res.json(destination);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destination details" });
    }
  });

  // Protected routes
  app.get("/api/bookings", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const bookings = await storage.getBookings(userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const bookingData = { ...req.body, userId };
      
      // Validate booking data
      const validatedData = insertBookingSchema.parse(bookingData);
      
      const booking = await storage.createBooking(validatedData);
      
      // Send email notification for booking confirmation
      // In a real implementation, this would use EmailJS
      // For this example, we'll just log the event
      console.log(`Booking confirmation email would be sent to ${req.user!.email} for booking ID ${booking.id}`);
      
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid booking data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  app.get("/api/bookings/:id", isAuthenticated, async (req, res) => {
    try {
      const bookingId = parseInt(req.params.id);
      const booking = await storage.getBooking(bookingId);
      
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      
      // Ensure users can only access their own bookings
      if (booking.userId !== req.user!.id) {
        return res.status(403).json({ error: "Access denied" });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch booking details" });
    }
  });

  // Helper middleware to check if user is authenticated
  function isAuthenticated(req: Request, res: Response, next: Function) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: "Unauthorized" });
  }

  const httpServer = createServer(app);
  return httpServer;
}
