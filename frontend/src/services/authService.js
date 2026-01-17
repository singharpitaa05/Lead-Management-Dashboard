// AUTHENTICATION SERVICES

import api from '../utils/api.js';

// Register new user
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  
  // Store token and user data in localStorage
  if (response.data.success) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  
  return response.data;
};

// Login user
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  
  // Store token and user data in localStorage
  if (response.data.success) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }
  
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Get user from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};