require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT || 3307,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
});

module.exports = db; // Export the promise-based pool
