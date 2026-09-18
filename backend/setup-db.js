const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

async function setupDatabase() {
  try {
    console.log('Connecting to MySQL...');
    
    // First connect without database to create it
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log('Reading schema file...');
    const schema = fs.readFileSync('./schema.sql', 'utf8');
    
    console.log('Executing schema...');
    await connection.query(schema);
    
    console.log('Database setup completed successfully!');
    await connection.end();
  } catch (error) {
    console.error('Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase();
