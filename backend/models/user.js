const mongoose = require('mongoose');

// Import bcryptjs to hash passwords for security
const bcrypt = require('bcryptjs');

// Define a schema for users using mongoose.Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

// Middleware function to hash the password before saving the user
UserSchema.pre('save', async function (next) {
  const user = this; // Reference the current user instance

  if (user.isModified('password')) return next(); 
  // If the password field is not modified, move to the next middleware

  user.password = await bcrypt.hash(user.password, 10); 
  // Hash the password using bcrypt with a salt factor of 10

  next(); // Move to the next step in the save process
}); 

module.exports = mongoose.model('User', UserSchema);



// What this code does:
// Defines a UserSchema that represents a user in the database:

// name: Required string field for the user's name.
// email: Required, unique string field for the user's email.
// password: Required string field for storing the user's password.
// Uses a Mongoose middleware (pre('save')):

// Automatically hashes the password before saving the user.
// Uses bcrypt.hash(password, 10) to ensure security.
// Skips password hashing if the password is not modified.
// Creates a User model to interact with the database.

// This ensures secure password storage and proper data validation for user registration.