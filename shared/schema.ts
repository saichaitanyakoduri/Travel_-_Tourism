import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

// Bookings common fields
const bookingFields = {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  bookingDate: timestamp("booking_date").defaultNow().notNull(),
  status: text("status").notNull().default("confirmed"),
  totalPrice: text("total_price").notNull(),
  paymentStatus: text("payment_status").notNull().default("paid"),
  emailSent: boolean("email_sent").default(false),
};

// Flight bookings
export const flightBookings = pgTable("flight_bookings", {
  ...bookingFields,
  departureCity: text("departure_city").notNull(),
  arrivalCity: text("arrival_city").notNull(),
  departureDate: text("departure_date").notNull(),
  returnDate: text("return_date"),
  airline: text("airline").notNull(),
  flightNumber: text("flight_number").notNull(),
  passengerCount: integer("passenger_count").notNull(),
  travelClass: text("travel_class").notNull(),
});

// Hotel bookings
export const hotelBookings = pgTable("hotel_bookings", {
  ...bookingFields,
  hotelName: text("hotel_name").notNull(),
  location: text("location").notNull(),
  checkInDate: text("check_in_date").notNull(),
  checkOutDate: text("check_out_date").notNull(),
  roomType: text("room_type").notNull(),
  guestCount: integer("guest_count").notNull(),
  roomCount: integer("room_count").notNull(),
});

// Bus bookings
export const busBookings = pgTable("bus_bookings", {
  ...bookingFields,
  departureCity: text("departure_city").notNull(),
  arrivalCity: text("arrival_city").notNull(),
  departureDate: text("departure_date").notNull(),
  returnDate: text("return_date"),
  busOperator: text("bus_operator").notNull(),
  busType: text("bus_type").notNull(),
  passengerCount: integer("passenger_count").notNull(),
});

// Train bookings
export const trainBookings = pgTable("train_bookings", {
  ...bookingFields,
  departureStation: text("departure_station").notNull(),
  arrivalStation: text("arrival_station").notNull(),
  departureDate: text("departure_date").notNull(),
  returnDate: text("return_date"),
  trainOperator: text("train_operator").notNull(),
  trainNumber: text("train_number").notNull(),
  passengerCount: integer("passenger_count").notNull(),
  travelClass: text("travel_class").notNull(),
});

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscriptionDate: timestamp("subscription_date").defaultNow().notNull(),
  active: boolean("active").default(true),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
});

export const insertFlightBookingSchema = createInsertSchema(flightBookings).omit({
  id: true,
  bookingDate: true,
  emailSent: true,
});

export const insertHotelBookingSchema = createInsertSchema(hotelBookings).omit({
  id: true,
  bookingDate: true,
  emailSent: true,
});

export const insertBusBookingSchema = createInsertSchema(busBookings).omit({
  id: true,
  bookingDate: true,
  emailSent: true,
});

export const insertTrainBookingSchema = createInsertSchema(trainBookings).omit({
  id: true,
  bookingDate: true,
  emailSent: true,
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).pick({
  email: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type FlightBooking = typeof flightBookings.$inferSelect;
export type InsertFlightBooking = z.infer<typeof insertFlightBookingSchema>;

export type HotelBooking = typeof hotelBookings.$inferSelect;
export type InsertHotelBooking = z.infer<typeof insertHotelBookingSchema>;

export type BusBooking = typeof busBookings.$inferSelect;
export type InsertBusBooking = z.infer<typeof insertBusBookingSchema>;

export type TrainBooking = typeof trainBookings.$inferSelect;
export type InsertTrainBooking = z.infer<typeof insertTrainBookingSchema>;

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
