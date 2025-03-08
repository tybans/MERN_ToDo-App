const mongoose = require('mongoose');

// Define a schema for tasks using mongoose.Schema
const TaskSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, 
  // Stores the ID of the user who owns the task
  // References the MongoDB ObjectId type for user association

  text: String, 
  // Stores the task description as a string

  completed: { type: Boolean, default: false }, 
  // Stores the task completion status as a boolean
  // Defaults to 'false' (task is incomplete by default)
});

// Create a mongoose model named 'Task' using the defined schema
module.exports = mongoose.model('Task', TaskSchema);



// What this code does:
// Imports Mongoose to define a schema and interact with MongoDB.
// Defines a TaskSchema that represents a task in the database:
// userId: Stores the ID of the user who owns the task.
// text: Stores the actual task description.
// completed: Indicates whether the task is completed (default is false).
// Creates a Mongoose model (Task) to perform database operations.
// This schema ensures tasks are structured correctly in MongoDB.