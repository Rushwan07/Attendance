const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes')
const userRoutes = require('./routes/user')
require('dotenv').config()

// Create an Express application
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes)
app.use('/api/user', userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
