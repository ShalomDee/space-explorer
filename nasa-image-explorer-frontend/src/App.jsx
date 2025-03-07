import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorerPage from './pages/ExplorerPage';
import FavoritesPage from './pages/FavoritesPage';
import LearnPage from './pages/LearnPage';
import QuizPage from './pages/QuizPage';
import './App.css';

function App() {
  // Simple user ID for demo purposes
  // In a real app, you'd implement proper authentication
  const userId = localStorage.getItem('userId') || 'user-' + Math.random().toString(36).substring(2, 9);
  
  if (!localStorage.getItem('userId')) {
    localStorage.setItem('userId', userId);
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorerPage userId={userId} />} />
            <Route path="/favorites" element={<FavoritesPage userId={userId} />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;