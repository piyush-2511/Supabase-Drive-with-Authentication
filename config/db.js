const mongoose = require('mongoose');
require("dotenv").config();

const uri = process.env.MONGO_URI;

async function connectToDb() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // Timeout after 30s instead of 10s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
}

async function closeDb() {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed successfully.");
  } catch (error) {
    console.error(`Error closing MongoDB connection: ${error.message}`);
  }
}

module.exports = { connectToDb, closeDb };