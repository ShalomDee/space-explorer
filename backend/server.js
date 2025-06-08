const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Enhanced MongoDB connection with better error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Atlas connected successfully');
    console.log('Database name:', mongoose.connection.db.databaseName);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if can't connect to database
  });

// Monitor connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

// Define Favorite schema with better validation
const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true }, // Add index for better performance
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: String, required: true },
  explanation: { type: String, required: true },
  mediaType: { type: String, required: true, default: 'image' }
}, {
  timestamps: true // Add createdAt and updatedAt fields
});

// Add compound index to prevent duplicates
favoriteSchema.index({ userId: 1, date: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// NASA APOD API endpoint with better error handling
app.get('/api/nasa/apod', async (req, res) => {
  try {
    const { date, count, start_date, end_date } = req.query;
    
    // Validate NASA API key
    if (!process.env.NASA_API_KEY) {
      return res.status(500).json({ message: 'NASA API key not configured' });
    }
    
    const params = {
      api_key: process.env.NASA_API_KEY,
      ...(date && { date }),
      ...(count && { count }),
      ...(start_date && { start_date }),
      ...(end_date && { end_date })
    };

    console.log('Fetching NASA APOD with params:', params);
    const response = await axios.get('https://api.nasa.gov/planetary/apod', { params });
    res.json(response.data);
  } catch (error) {
    console.error('NASA API error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Error fetching data from NASA API',
      error: error.response?.data?.error || error.message
    });
  }
});

// Enhanced favorites endpoints with better error handling and logging
app.post('/api/favorites', async (req, res) => {
  try {
    const { userId, title, url, date, explanation, mediaType } = req.body;
    
    console.log('Adding favorite for user:', userId, 'date:', date);
    
    // Validate required fields
    if (!userId || !title || !url || !date || !explanation) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Check if already favorited
    const existing = await Favorite.findOne({ userId, date });
    if (existing) {
      console.log('Favorite already exists for user:', userId, 'date:', date);
      return res.status(400).json({ message: 'Already in favorites' });
    }
    
    const newFavorite = new Favorite({
      userId,
      title,
      url,
      date,
      explanation,
      mediaType: mediaType || 'image'
    });
    
    const savedFavorite = await newFavorite.save();
    console.log('Favorite saved successfully:', savedFavorite._id);
    res.status(201).json(savedFavorite);
  } catch (error) {
    console.error('Error saving favorite:', error);
    res.status(500).json({ 
      message: 'Error saving to favorites',
      error: error.message
    });
  }
});

app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log('Fetching favorites for user:', userId);
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    
    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      console.error('Database not connected');
      return res.status(500).json({ message: 'Database connection error' });
    }
    
    const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 });
    console.log(`Found ${favorites.length} favorites for user ${userId}`);
    
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Error fetching favorites',
      error: error.message
    });
  }
});

app.delete('/api/favorites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('Deleting favorite with ID:', id);
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid favorite ID' });
    }
    
    const deletedFavorite = await Favorite.findByIdAndDelete(id);
    
    if (!deletedFavorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    
    console.log('Favorite deleted successfully:', id);
    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ 
      message: 'Error removing favorite',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('MongoDB URI configured:', !!process.env.MONGODB_URI);
  console.log('NASA API Key configured:', !!process.env.NASA_API_KEY);
});
