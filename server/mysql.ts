import mysql from 'mysql2/promise';

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',      // XAMPP default host
  port: 3306,             // XAMPP default MySQL port
  user: 'root',           // XAMPP default username
  password: '',           // XAMPP default password (empty)
  database: 'travelworld', // Database name we'll create
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    return false;
  }
}

export { pool, testConnection };