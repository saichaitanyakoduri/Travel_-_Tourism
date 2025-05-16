const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { sendMail } = require('./emailService');
require('dotenv').config();

const app = express();
// Use get-port to auto-select a free port if PORT=0
let getPort;
try {
  getPort = require('get-port').default || require('get-port');
} catch (e) {
  getPort = require('get-port');
}
let PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

// MySQL connection (XAMPP)
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'travel_app',
  port: process.env.DB_PORT || 3306  // <-- add this line
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  } else {
    console.log('Connected to MySQL (XAMPP)');
  }
});

// CORS Options
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, // Allow cookies to be included in requests
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// AUTH ROUTES (login/signup)
app.post('/api/auth/signup', async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  try {
    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (results && results.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }
      // Hash password
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(password, 12);
      db.query('INSERT INTO users (fullName, email, phone, password) VALUES (?, ?, ?, ?)',
        [fullName, email, phone, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ error: 'DB error' });
          // Optionally send welcome email
          // EmailJS expects { to, subject, message }
sendMail({
            to: email,
            subject: 'Welcome to Travel App',
            message: `Hello ${fullName}, your account was created successfully!`,
          }).catch(e => console.error('EmailJS error:', e));
          res.status(201).json({ message: 'User created successfully' });
        }
      );
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!results || results.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const user = results[0];
    const bcrypt = require('bcryptjs');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Optionally generate JWT token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, fullName: user.fullName, email: user.email });
  });
});

// BOOKING ROUTES (example)
app.post('/api/bookings', (req, res) => {
  const { userId, guideId, date, numberOfPeople, phoneNumber, email, specialRequirements } = req.body;
  db.query(
    'INSERT INTO bookings (userId, guideId, date, numberOfPeople, phoneNumber, email, specialRequirements) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [userId, guideId, date, numberOfPeople, phoneNumber, email, specialRequirements],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      // Optionally send booking confirmation email
      // EmailJS expects { to, subject, message }
sendMail({
        to: email,
        subject: 'Booking Confirmation',
        message: `Your booking has been confirmed for ${date}.`,
      }).catch(e => console.error('EmailJS error:', e));
      res.status(201).json({ message: 'Booking created successfully' });
    }
  );
});

// Start the server with dynamic port assignment if needed
(async () => {
  if (!PORT || PORT === 0) {
    PORT = await getPort({ port: Array.from({ length: 101 }, (_, i) => 5000 + i) });
  }
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
