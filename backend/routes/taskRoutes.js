const express = require("express");
const Task = require("../models/task");

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, text } = req.body;

  const task = new Task({
    userId,
    text,
  });

  try {
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
}
);
 
module.exports = router;