import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-space-dark text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <svg className="h-8 w-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" />
              <path d="M30 70 Q50 20 70 70" stroke="white" strokeWidth="2" fill="none" />
            </svg>
            <span className="text-xl font-bold">NASA Explorer</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop nav */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`hover:text-space-accent ${isActive('/') ? 'border-b-2 border-space-accent' : ''}`}>
              Home
            </Link>
            <Link to="/explore" className={`hover:text-space-accent ${isActive('/explore') ? 'border-b-2 border-space-accent' : ''}`}>
              Explore
            </Link>
            <Link to="/favorites" className={`hover:text-space-accent ${isActive('/favorites') ? 'border-b-2 border-space-accent' : ''}`}>
              Favorites
            </Link>
            <Link to="/learn" className={`hover:text-space-accent ${isActive('/learn') ? 'border-b-2 border-space-accent' : ''}`}>
              Learn
            </Link>
            <Link to="/quiz" className={`hover:text-space-accent ${isActive('/quiz') ? 'border-b-2 border-space-accent' : ''}`}>
              Quiz
            </Link>
          </div>
        </div>
        
        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`px-2 py-1 rounded ${isActive('/') ? 'bg-space-light' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/explore" 
                className={`px-2 py-1 rounded ${isActive('/explore') ? 'bg-space-light' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link 
                to="/favorites" 
                className={`px-2 py-1 rounded ${isActive('/favorites') ? 'bg-space-light' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
              <Link 
                to="/learn" 
                className={`px-2 py-1 rounded ${isActive('/learn') ? 'bg-space-light' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Learn
              </Link>
              <Link 
                to="/quiz" 
                className={`px-2 py-1 rounded ${isActive('/quiz') ? 'bg-space-light' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;