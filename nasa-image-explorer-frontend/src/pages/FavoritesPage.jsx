import { useState, useEffect, useCallback } from 'react';
import { getFavorites, removeFavorite } from '../services/api';

function FavoritesPage({ userId }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, [userId, loadFavorites]);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFavorites(userId);
      setFavorites(data);
    } catch (err) {
      setError('Failed to load favorites. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const handleRemoveFavorite = async (id) => {
    try {
      await removeFavorite(id);
      setFavorites(favorites.filter(fav => fav._id !== id));
      setNotification('Removed from favorites');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
        console.error('Error removing favorite:', err); // Log the error
      setNotification('Error removing from favorites');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const viewImageDetails = (image) => {
    setSelectedImage(image);
  };

  const closeImageDetails = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-space-dark"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-space-accent text-xl mb-4">⚠️ {error}</div>
        <button 
          onClick={loadFavorites} 
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-2xl font-bold mb-2">No favorites yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explore space images and add them to your favorites.
          </p>
          <a href="/explore" className="btn-primary">
            Start Exploring
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div key={favorite._id} className="card">
            <div 
              className="aspect-[4/3] overflow-hidden cursor-pointer"
              onClick={() => viewImageDetails(favorite)}
            >
              {favorite.mediaType === 'image' ? (
                <img 
                  src={favorite.url} 
                  alt={favorite.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              ) : (
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  <span className="text-white">Video Content</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm-2 14.5v-9l6 4.5-6 4.5z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 line-clamp-1">{favorite.title}</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{favorite.date}</div>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                {favorite.explanation}
              </p>
              <div className="flex justify-between">
                <button 
                  onClick={() => viewImageDetails(favorite)}
                  className="text-space-light hover:text-space-dark"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleRemoveFavorite(favorite._id)}
                  className="text-space-accent hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Detail Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">{selectedImage.title}</h3>
              <button 
                onClick={closeImageDetails}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {selectedImage.mediaType === 'image' ? (
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.title} 
                  className="w-full mb-4"
                />
              ) : (
                <div className="relative pt-[56.25%] mb-4">
                  <iframe
                    src={selectedImage.url}
                    title={selectedImage.title}
                    className="absolute top-0 left-0 w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              <div className="mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">{selectedImage.date}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">
                {selectedImage.explanation}
              </p>
              <div className="flex justify-between">
                <button 
                  onClick={closeImageDetails}
                  className="btn-primary"
                >
                  Close
                </button>
                <button 
                  onClick={() => handleRemoveFavorite(selectedImage._id)}
                  className="btn-secondary"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
          {notification}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;