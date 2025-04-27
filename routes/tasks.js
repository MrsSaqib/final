// const express = require('express');
// const Task = require('../models/Task');
// const protect = require('../middleware/authMiddleware'); // Import the protect middleware
// const router = express.Router();

// // Create a new task - Protected Route
// router.post('/', protect, async (req, res) => {
//   const { title, description, assignedTo } = req.body;

//   const task = new Task({ title, description, assignedTo });
//   await task.save();

//   res.json(task);
// });

// // Get all tasks - Protected Route
// router.get('/', protect, async (req, res) => {
//   const tasks = await Task.find().populate('assignedTo', 'username');
//   res.json(tasks);
// });

// // Update task status - Protected Route
// router.put('/:id', protect, async (req, res) => {
//   const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(task);
// });

// // Delete task - Protected Route
// router.delete('/:id', protect, async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Task deleted' });
// });

// module.exports = router;


const express = require('express');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware'); // Import the protect middleware
const router = express.Router();

// Sample route to get tasks for a specific column
// Fetch tasks for a column based on the columnId (e.g., 'to-do', 'in-progress', 'done')
router.get('/tasks/:columnId', protect, async (req, res) => {
  const columnId = req.params.columnId; // Extract columnId from request parameters

  // Fetch tasks from your database based on columnId
  try {
    const tasks = await Task.find({ status: columnId }).populate('assignedTo', 'username'); // Assuming 'status' is the column

    // Send tasks for the requested column
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tasks for this column' });
  }
});

// Create a new task - Protected Route
router.post('/', protect, async (req, res) => {
  const { title, description, assignedTo, status } = req.body; // Assuming `status` for task column (e.g., "To Do", "In Progress")

  // Create a new task with the provided data
  const task = new Task({ title, description, assignedTo, status });
  await task.save();

  res.json(task);
});

// Update task status - Protected Route
router.put('/:id', protect, async (req, res) => {
  const { status } = req.body; // Expecting status field in request body
  const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
});

// Delete task - Protected Route
router.delete('/:id', protect, async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json({ message: 'Task deleted' });
});

module.exports = router;
