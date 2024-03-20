const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/user');
require('dotenv').config();

// Create an Express application
const app = express();

// Middleware
app.use(express.json());

// CORS middleware with specific origin
app.use(cors());

app.use(cors(
  {
      origin: ["https://attendance-snowy-chi.vercel.app"],
      methods: ["POST", "GET", "DELETE"],
      credentials: true
  }
));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
