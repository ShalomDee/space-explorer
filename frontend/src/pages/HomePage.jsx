import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApodImage } from '../services/api';

function HomePage() {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApodImage = async () => {
      try {
        setLoading(true);
        // Get today's APOD image
        const data = await getApodImage();
        setApodData(data);
      } catch (err) {
        setError('Failed to load NASA Astronomy Picture of the Day. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadApodImage();
  }, []);

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
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore the Wonders of Space</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Discover the beauty and mysteries of our universe through NASA's incredible imagery
        </p>
      </div>

      {apodData && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              {apodData.media_type === 'image' ? (
                <img 
                  src={apodData.url} 
                  alt={apodData.title} 
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '600px' }}
                />
              ) : (
                <div className="relative pt-[56.25%]">
                  <iframe
                    src={apodData.url}
                    title={apodData.title}
                    className="absolute top-0 left-0 w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
            <div className="md:w-1/2 p-6">
              <div className="uppercase text-space-accent font-semibold tracking-wider mb-2">
                Astronomy Picture of the Day
              </div>
              <h2 className="text-2xl font-bold mb-2">{apodData.title}</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {apodData.date}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-4">
                {apodData.explanation}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/explore" className="btn-primary">
                  Explore More
                </Link>
                <Link to="/learn" className="btn-secondary">
                  Learn About Space
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="card p-6">
          <div className="text-space-accent text-3xl mb-4">🔭</div>
          <h3 className="text-xl font-bold mb-2">Discover</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Explore breathtaking images from NASA's vast collection of space photography.
          </p>
          <Link to="/explore" className="text-space-light hover:text-space-dark dark:hover:text-space-accent">
            Start exploring →
          </Link>
        </div>
        <div className="card p-6">
          <div className="text-space-accent text-3xl mb-4">🧠</div>
          <h3 className="text-xl font-bold mb-2">Learn</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Discover fascinating facts about space, planets, stars, and the universe.
          </p>
          <Link to="/learn" className="text-space-light hover:text-space-dark dark:hover:text-space-accent">
            Start learning →
          </Link>
        </div>
        <div className="card p-6">
          <div className="text-space-accent text-3xl mb-4">🎮</div>
          <h3 className="text-xl font-bold mb-2">Challenge Yourself</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Test your space knowledge with fun quizzes and earn cosmic badges.
          </p>
          <Link to="/quiz" className="text-space-light hover:text-space-dark dark:hover:text-space-accent">
            Take a quiz →
          </Link>
        </div>
      </div>

    </div>
  );
}

export default HomePage;