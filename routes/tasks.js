const express = require('express');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware'); // Import the protect middleware
const router = express.Router();

// Create a new task - Protected Route
router.post('/', protect, async (req, res) => {
  const { title, description, assignedTo } = req.body;

  const task = new Task({ title, description, assignedTo });
  await task.save();

  res.json(task);
});

// Get all tasks - Protected Route
router.get('/', protect, async (req, res) => {
  const tasks = await Task.find().populate('assignedTo', 'username');
  res.json(tasks);
});

// Update task status - Protected Route
router.put('/:id', protect, async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Delete task - Protected Route
router.delete('/:id', protect, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
