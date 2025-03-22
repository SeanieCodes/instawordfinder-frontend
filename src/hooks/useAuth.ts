import { useState, useEffect, useCallback } from 'react';
import { 
  login as loginService, 
  register as registerService,
  getCurrentUser,
  logout as logoutService,
  isLoggedIn
} from '../services/auth.service';
import { AuthState, LoginCredentials, RegisterCredentials, User } from '../types/auth.types';

// Initial state for authentication
const initialState: AuthState = {
  user: null as User | null,
  token: localStorage.getItem('token'),
  isAuthenticated: isLoggedIn(),
  loading: false,
  error: null
};

export const useAuth = () => {
  const [state, setState] = useState<AuthState>(initialState);

  // Effect to load user data if token exists
  useEffect(() => {
    if (state.token && !state.user) {
      loadUser();
    }
  }, [state.token]);

  // Function to load the current user's data
  const loadUser = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await getCurrentUser();
      
      // This explicitly uses the User type from the response
      const userData: User = response.user;
      
      setState(prev => ({
        ...prev,
        user: userData,
        isAuthenticated: true,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: 'Failed to load user'
      }));
      localStorage.removeItem('token');
    }
  };

  // Function to handle user login
  const login = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await loginService(credentials);
      
      // Explicitly using User type to ensure type safety
      const userData: User = response.user;
      
      setState(prev => ({
        ...prev,
        user: userData,
        token: response.token,
        isAuthenticated: true,
        loading: false
      }));
      return response;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }));
      throw error;
    }
  };

  // Function to handle user registration
  const register = async (credentials: RegisterCredentials) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await registerService(credentials);
      
      // Explicitly typing the user data
      const userData: User = response.user;
      
      setState(prev => ({
        ...prev,
        user: userData,
        token: response.token,
        isAuthenticated: true,
        loading: false
      }));
      return response;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      }));
      throw error;
    }
  };

  // Function to handle user logout
  const logout = useCallback(() => {
    logoutService();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  }, []);

  // Function to clear any auth errors
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
    clearError
  };
};