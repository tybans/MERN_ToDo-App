const express = require("express");
const Task = require("../models/task");

// Create an Express router to define task-related routes
const router = express.Router();

//  Route to Add a New Task
router.post("/", async (req, res) => {
  // Extract userId and text from the request body
  const { userId, text } = req.body;

  // Create a new task instance with the provided userId and text, defaulting `completed` to false
  const task = new Task({
    userId,
    text,
    completed: false,
  });

  try {
    // Save the task to the database
    await task.save();

    // Fetch the updated list of tasks for the user after adding the new task
    const tasks = await Task.find({ userId });

    res.status(201).json({ message: "Task created successfully", tasks });

  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to Fetch All Tasks for a User
router.get("/:userId", async (req, res) => {
  // Extract userId from URL parameters
  const userId = req.params.userId;

  try {
    // Fetch all tasks belonging to the user from the database
    const tasks = await Task.find({ userId });

    // Send the tasks as a JSON response
    res.json(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Route to Toggle Task Completion Status
router.put("/:id", async (req, res) => {
  // Extract task ID from URL parameters
  const id = req.params.id;

  try {
    // Find the task in the database by its ID
    const task = await Task.findById(id);

    // Toggle the 'completed' status of the task
    task.completed = !task.completed;

    //  Save the updated task back to the database
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Route to Delete a Task
router.delete("/:id", async (req, res) => {
  // Extract task ID from URL parameters
  const id = req.params.id;

  try {
    // Find and delete the task from the database by its ID
    await Task.findByIdAndDelete(id);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = router;
