import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// NASA image related functions
export const getApodImage = async (params = {}) => {
  // Convert params object to query string
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${API_URL}/nasa/apod?${queryString}` : `${API_URL}/nasa/apod`;
  
  const response = await axios.get(url);
  return response.data;
};

export const addToFavorites = async (userId, imageData) => {
  try {
    const response = await axios.post(`${API_URL}/favorites`, {
      userId,
      title: imageData.title,
      url: imageData.url,
      date: imageData.date,
      explanation: imageData.explanation,
      mediaType: imageData.media_type
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const getFavorites = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/favorites/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const removeFavorite = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/favorites/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

export const getQuizQuestions = async () => {
  const response = await axios.get(`${API_URL}/quiz`);
  return response.data;
};