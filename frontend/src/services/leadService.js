// LEAD SERVICES

import api from '../utils/api.js';

// Create new lead
export const createLead = async (leadData) => {
  const response = await api.post('/leads', leadData);
  return response.data;
};

// Get all leads with search, filter, sort, and pagination
export const getLeads = async (params = {}) => {
  const {
    search = '',
    status = '',
    source = '',
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 10,
  } = params;

  // Build query string
  const queryParams = new URLSearchParams();
  
  if (search) queryParams.append('search', search);
  if (status) queryParams.append('status', status);
  if (source) queryParams.append('source', source);
  queryParams.append('sortBy', sortBy);
  queryParams.append('sortOrder', sortOrder);
  queryParams.append('page', page);
  queryParams.append('limit', limit);

  const response = await api.get(`/leads?${queryParams.toString()}`);
  return response.data;
};

// Get single lead by ID
export const getLeadById = async (id) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};

// Update lead
export const updateLead = async (id, leadData) => {
  const response = await api.put(`/leads/${id}`, leadData);
  return response.data;
};

// Delete lead
export const deleteLead = async (id) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};