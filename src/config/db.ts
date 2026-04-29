import mysql from 'mysql2/promise';

// Configured using async/await connection pooling from mysql2
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // update with your db user
  password: '', // update with your db password
  database: 'test_db', // update with your db name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
