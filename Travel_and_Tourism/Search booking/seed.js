const mongoose = require('mongoose');
const fs = require('fs');
const Train = require('./models/Train');
const Bus = require('./models/Bus');
const Flight = require('./models/flight');
const Cab = require('./models/cab');
const connectDB = require('./config/db');

// Load JSON file
const data = JSON.parse(fs.readFileSync('bookings.json', 'utf-8'));

// Seed function
const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Train.deleteMany();
    await Bus.deleteMany();
    await Flight.deleteMany();
    await Cab.deleteMany();

    // Insert new data
    await Train.insertMany(data.trains);
    await Bus.insertMany(data.buses);
    await Flight.insertMany(data.flights);
    await Cab.insertMany(data.cabs);

    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();
