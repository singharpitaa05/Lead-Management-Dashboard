// ANALYTICS SERVICES

// ANALYTICS SERVICES

import api from '../utils/api.js';

// Get dashboard analytics
export const getDashboardAnalytics = async () => {
  const response = await api.get('/analytics/dashboard');
  return response.data;
};