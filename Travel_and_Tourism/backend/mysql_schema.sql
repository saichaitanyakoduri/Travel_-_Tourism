-- SQL schema for XAMPP (MySQL)
-- Run this file in phpMyAdmin to create the database and tables for your app

CREATE DATABASE IF NOT EXISTS travel_app;
USE travel_app;

-- User Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Booking Table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  guideId INT,
  date DATE NOT NULL,
  numberOfPeople INT NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  specialRequirements TEXT,
  status VARCHAR(20) DEFAULT 'Pending',
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Add more tables as needed for guides, cabs, flights, etc.

-- Example for guides
CREATE TABLE IF NOT EXISTS guides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL
);
