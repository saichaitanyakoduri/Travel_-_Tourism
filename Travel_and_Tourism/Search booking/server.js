const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const trainRoutes = require('./routes/trainRoutes');
const busRoutes = require('./routes/busRoutes');
const flightRoutes = require('./routes/flightRoutes');
const cabRoutes = require('./routes/cabRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/trains', trainRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/cabs', cabRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
