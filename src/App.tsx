import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SavedPostsProvider } from './contexts/SavedPostsContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import UserProfile from './pages/UserProfile';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SavedPostsProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </SavedPostsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;