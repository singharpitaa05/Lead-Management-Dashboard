// CREATE LEADMODAL COCOMPONENTS

import { useState } from 'react';
import { createLead } from '../services/leadService.js';

const CreateLeadModal = ({ isOpen, onClose, onLeadCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    leadStatus: 'New',
    leadSource: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await createLead(formData);
      
      if (response.success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          leadStatus: 'New',
          leadSource: '',
        });
        
        // Notify parent component
        onLeadCreated();
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-linear-gradient-to-r from-blue-200 to-purple-200 bg-opacity-20 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-blue-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create New Lead</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter lead name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter email address"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter phone number"
              />
            </div>

            {/* Company Input */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter company name"
              />
            </div>

            {/* Lead Status Select */}
            <div>
              <label htmlFor="leadStatus" className="block text-sm font-medium text-gray-700 mb-1">
                Lead Status
              </label>
              <select
                id="leadStatus"
                name="leadStatus"
                value={formData.leadStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            {/* Lead Source Select */}
            <div>
              <label htmlFor="leadSource" className="block text-sm font-medium text-gray-700 mb-1">
                Lead Source <span className="text-red-500">*</span>
              </label>
              <select
                id="leadSource"
                name="leadSource"
                required
                value={formData.leadSource}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select source</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Ads">Ads</option>
                <option value="Email">Email</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Creating...' : 'Create Lead'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLeadModal;