// const express = require('express');
// const cors = require('cors');
// const app = express();

// // Enable CORS for all requests
// app.use(cors());

// // Your routes and other middleware
// app.post('/login', (req, res) => {
//   // Your login logic here
//   res.json({ token: 'fake-jwt-token' });
// });

// app.listen(5000, () => {
//   console.log('Backend is running on port 5000');
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const taskRoutes = require('./routes/tasks');

// // Load environment variables
// dotenv.config();

// // Initialize express app
// const app = express();

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/tasks', taskRoutes); 
// app.use('/api/auth', authRoutes); 

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// // Basic route
// app.get('/', (req, res) => {
//   res.send("Task Tracker API is working!");
// });

// // ❌ No app.listen()
// // ✅ Correct export
// module.exports = app;
