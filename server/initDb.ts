import { pool, testConnection } from './mysql';
import fs from 'fs';
import path from 'path';

// Function to initialize the database
async function initializeDatabase() {
  console.log('Initializing database...');

  try {
    // Test the connection first
    const connected = await testConnection();
    if (!connected) {
      console.error('Failed to connect to MySQL. Please check if XAMPP MySQL service is running.');
      process.exit(1);
    }

    // Read the SQL setup file
    const sqlFilePath = path.join(__dirname, '../database/setup.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Split SQL script into individual statements
    const statements = sqlScript
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);
    
    // Execute each statement
    for (const statement of statements) {
      try {
        await pool.execute(statement + ';');
        console.log('Executed SQL statement successfully.');
      } catch (error) {
        console.error('Error executing SQL statement:', statement);
        console.error(error);
        // Continue with other statements even if one fails
      }
    }
    
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Export the initialization function
export default initializeDatabase;