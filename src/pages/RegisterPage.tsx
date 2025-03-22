import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useAuthContext } from '../contexts/AuthContext';
import { RegisterCredentials } from '../types/auth.types';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, error, loading, clearError, isAuthenticated } = useAuthContext();
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/search');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
    if (passwordError) setPasswordError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (credentials.password !== credentials.confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    
    try {
      await register(credentials);
      navigate('/search');
    } catch (err) {
    }
  };

  return (
    <Layout isAuthPage>
      <div className="app-name-box">InstaWordFinder</div>
      <div className="register-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Choose your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Choose your password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          {passwordError && <div className="error-message">{passwordError}</div>}
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading} className="register-button">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <p className="login-prompt">
            Already have an account? 
            <Link to="/login" className="login-link">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default RegisterPage;