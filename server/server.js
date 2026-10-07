const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Scan routes
const scanRoutes = require('./routes/scan');
app.use('/api/scan', scanRoutes);

const reportRoutes = require('./routes/report');
app.use('/api/report', reportRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

