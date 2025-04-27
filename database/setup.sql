-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS travelworld;

-- Use the database
USE travelworld;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create flight_bookings table
CREATE TABLE IF NOT EXISTS flight_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  departureCity VARCHAR(100) NOT NULL,
  arrivalCity VARCHAR(100) NOT NULL,
  departureDate VARCHAR(100) NOT NULL,
  returnDate VARCHAR(100),
  airline VARCHAR(100) NOT NULL,
  flightNumber VARCHAR(50) NOT NULL,
  passengerCount INT NOT NULL,
  travelClass VARCHAR(50) NOT NULL,
  totalPrice VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  paymentStatus VARCHAR(50) NOT NULL,
  emailSent BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create hotel_bookings table
CREATE TABLE IF NOT EXISTS hotel_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  hotelName VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  checkInDate VARCHAR(100) NOT NULL,
  checkOutDate VARCHAR(100) NOT NULL,
  roomType VARCHAR(100) NOT NULL,
  guestCount INT NOT NULL,
  roomCount INT NOT NULL,
  totalPrice VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  paymentStatus VARCHAR(50) NOT NULL,
  emailSent BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create bus_bookings table
CREATE TABLE IF NOT EXISTS bus_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  departureCity VARCHAR(100) NOT NULL,
  arrivalCity VARCHAR(100) NOT NULL,
  departureDate VARCHAR(100) NOT NULL,
  returnDate VARCHAR(100),
  busOperator VARCHAR(100) NOT NULL,
  busType VARCHAR(100) NOT NULL,
  passengerCount INT NOT NULL,
  totalPrice VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  paymentStatus VARCHAR(50) NOT NULL,
  emailSent BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create train_bookings table
CREATE TABLE IF NOT EXISTS train_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  departureStation VARCHAR(100) NOT NULL,
  arrivalStation VARCHAR(100) NOT NULL,
  departureDate VARCHAR(100) NOT NULL,
  returnDate VARCHAR(100),
  trainOperator VARCHAR(100) NOT NULL,
  trainNumber VARCHAR(50) NOT NULL,
  passengerCount INT NOT NULL,
  travelClass VARCHAR(50) NOT NULL,
  totalPrice VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  paymentStatus VARCHAR(50) NOT NULL,
  emailSent BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);