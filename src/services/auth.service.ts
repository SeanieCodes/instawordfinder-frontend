import api from './api';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth.types';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const response = await api.get<AuthResponse>('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const isLoggedIn = (): boolean => {
  return localStorage.getItem('token') !== null;
};