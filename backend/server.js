// Import the Express framework to create a server
const express = require('express');

// Import CORS middleware to allow cross-origin requests
const cors = require('cors');

// Import Mongoose for interacting with MongoDB
const mongoose = require('mongoose');

// Load environment variables from the .env file
require('dotenv').config();

// Import user and task route handlers
const userRoutes = require('./routes/userRoutes'); // Handles user authentication (register/login)
const taskRoutes = require('./routes/taskRoutes'); // Handles task management (CRUD operations)

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable CORS to allow requests from different origins (frontend)
app.use(cors());

// Define API routes
app.use('/api/users', userRoutes); // Routes related to user authentication
app.use('/api/tasks', taskRoutes); // Routes related to task management

// Connect to MongoDB using the URI stored in environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Define the port number (either from environment variables or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the Express server and listen for requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

