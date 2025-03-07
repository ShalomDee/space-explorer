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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Favorite schema
const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: String, required: true },
  explanation: { type: String, required: true },
  mediaType: { type: String, required: true }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

// NASA APOD API endpoint
app.get('/api/nasa/apod', async (req, res) => {
  try {
    const { date, count, start_date, end_date } = req.query;
    const params = {
      api_key: process.env.NASA_API_KEY,
      ...(date && { date }),
      ...(count && { count }),
      ...(start_date && { start_date }),
      ...(end_date && { end_date })
    };

    const response = await axios.get('https://api.nasa.gov/planetary/apod', { params });
    res.json(response.data);
  } catch (error) {
    console.error('NASA API error:', error);
    res.status(500).json({ message: 'Error fetching data from NASA API' });
  }
});

// Favorites endpoints
app.post('/api/favorites', async (req, res) => {
  try {
    const { userId, title, url, date, explanation, mediaType } = req.body;
    
    // Check if already favorited
    const existing = await Favorite.findOne({ userId, date });
    if (existing) {
      return res.status(400).json({ message: 'Already in favorites' });
    }
    
    const newFavorite = new Favorite({
      userId,
      title,
      url,
      date,
      explanation,
      mediaType
    });
    
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    console.error('Error saving favorite:', error);
    res.status(500).json({ message: 'Error saving to favorites' });
  }
});

app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ userId });
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

app.delete('/api/favorites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Favorite.findByIdAndDelete(id);
    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Error removing favorite' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});