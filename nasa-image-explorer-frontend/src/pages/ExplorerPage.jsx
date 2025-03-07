import { useState, useEffect } from 'react';
import { getApodImage, addToFavorites } from '../services/api';

function ExplorerPage({ userId }) {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchTodayApod();
  }, []);

  const fetchTodayApod = async () => {
    try {
      setLoading(true);
      // Get today's APOD image
      const data = await getApodImage();
      setApodData(data);
    } catch (err) {
      console.error('Error fetching APOD:', err);
      setError('Failed to load NASA Astronomy Picture of the Day. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateSearch = async (e) => {
    e.preventDefault();
    if (!searchDate) return;
    
    try {
      setLoading(true);
      // Get APOD for specific date
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
    try {
      await addToFavorites(userId, image);
      setNotification('Added to favorites!');
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setNotification('Already in favorites');
      } else {
        setNotification('Error adding to favorites');
      }
      setTimeout(() => setNotification(null), 3000);
    }
  };

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
            className="input-field flex-1"
            max={new Date().toISOString().split('T')[0]}
            min="1995-06-16" // NASA APOD started on this date
          />
          <button type="submit" className="btn-primary">
            View This Date
          </button>
          <button 
            type="button" 
            onClick={fetchTodayApod} 
            className="btn-secondary"
          >
            Today's Image
          </button>
        </form>
      </div>

      {error && (
        <div className="text-center py-8">
          <div className="text-space-accent text-xl mb-4">⚠️ {error}</div>
          <button 
            onClick={fetchTodayApod} 
            className="btn-primary"
          >
            Load Today's Image
          </button>
        </div>
      )}

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
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {apodData.explanation}
            </p>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => handleAddToFavorites(apodData)}
              className="btn-secondary"
            >
              Add to Favorites
            </button>
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

export default ExplorerPage;