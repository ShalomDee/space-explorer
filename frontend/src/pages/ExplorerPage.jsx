import { useState, useEffect, useCallback } from 'react';
import { getApodImage, addToFavorites } from '../services/api';

function ExplorerPage({ userId }) {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [notification, setNotification] = useState(null);

  const fetchTodayApod = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const data = await getApodImage();
      setApodData(data);
    } catch (err) {
      console.error('Error fetching APOD:', err);
      setError('Failed to load NASA Astronomy Picture of the Day. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load today's APOD on component mount
  useEffect(() => {
    fetchTodayApod();
  }, [fetchTodayApod]);

  const handleDateSearch = async (e) => {
    e.preventDefault();
    if (!searchDate) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getApodImage({ date: searchDate });
      setApodData(data);
    } catch (err) {
      console.error('Error fetching APOD for date:', err);
      setError(`Failed to load APOD for ${searchDate}. Please try another date.`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = async (image) => {
    if (!userId) {
      setNotification('Please log in to add favorites');
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    try {
      await addToFavorites(userId, image);
      setNotification('Added to favorites!');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error('Error adding to favorites:', err);
      if (err.response && err.response.status === 400) {
        setNotification('Already in favorites');
      } else {
        setNotification('Error adding to favorites');
      }
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const clearError = () => setError(null);

  // Show loading state only when no data is available
  if (loading && !apodData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-space-dark"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Explore Space</h1>
        <form onSubmit={handleDateSearch} className="flex flex-wrap gap-2 max-w-md">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="input-field flex-1 text-space-dark"
            max={new Date().toISOString().split('T')[0]}
            min="1995-06-16" // NASA APOD started on this date
          />
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'View This Date'}
          </button>
          <button 
            type="button" 
            onClick={fetchTodayApod} 
            className="btn-secondary"
            disabled={loading}
          >
            Today's Image
          </button>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div className="text-center py-8 mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="text-red-600 dark:text-red-400 text-xl mb-4">⚠️ {error}</div>
            <div className="flex justify-center gap-2">
              <button 
                onClick={fetchTodayApod} 
                className="btn-primary"
                disabled={loading}
              >
                Load Today's Image
              </button>
              <button 
                onClick={clearError} 
                className="btn-secondary"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator when data exists but new data is loading */}
      {loading && apodData && (
        <div className="text-center py-4 mb-4">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
            <span className="text-blue-600 dark:text-blue-400">Loading new image...</span>
          </div>
        </div>
      )}

      {/* APOD Data Display */}
      {apodData && (
        <div className="card">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{apodData.title}</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">{apodData.date}</div>
          </div>
          
          <div className="mb-6">
            {apodData.media_type === 'image' ? (
              <img 
                src={apodData.url} 
                alt={apodData.title} 
                className="w-full rounded-lg"
                onError={(e) => {
                  // Try hdurl as fallback
                  if (apodData.hdurl && e.target.src !== apodData.hdurl) {
                    e.target.src = apodData.hdurl;
                  } else {
                    e.target.src = '/placeholder-image.jpg';
                  }
                }}
              />
            ) : (
              <div className="relative pt-[56.25%]">
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {apodData.explanation}
            </p>
          </div>
          
          <div className="flex justify-between items-center">
            {/* Display copyright info if available */}
            {apodData.copyright && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                © {apodData.copyright}
              </div>
            )}
            <div className="flex gap-2 ml-auto">
              {/* Open original image in new tab */}
              {apodData.hdurl && (
                <a 
                  href={apodData.hdurl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  View HD
                </a>
              )}
              <button 
                onClick={() => handleAddToFavorites(apodData)}
                className="btn-primary"
                disabled={!userId}
                title={!userId ? "Please log in to add favorites" : "Add to favorites"}
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-40">
          {notification}
        </div>
      )}
    </div>
  );
}

export default ExplorerPage;
