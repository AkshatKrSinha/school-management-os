import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool to the database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection immediately
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Connected to the MySQL Database successfully.');
    connection.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();

export default db;