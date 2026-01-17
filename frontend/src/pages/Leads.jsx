// LEAD PAGES

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateLeadModal from '../components/CreateLeadModal.jsx';
import Navbar from '../components/Navbar.jsx';
import { deleteLead, getLeads } from '../services/leadService.js';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const [limit] = useState(10);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  
  // Sort state
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchLeads();
  }, [currentPage, searchTerm, statusFilter, sourceFilter, sortBy, sortOrder]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await getLeads({
        search: searchTerm,
        status: statusFilter,
        source: sourceFilter,
        sortBy,
        sortOrder,
        page: currentPage,
        limit,
      });
      
      if (response.success) {
        setLeads(response.data);
        setTotalPages(response.totalPages);
        setTotalLeads(response.total);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadCreated = () => {
    setCurrentPage(1); // Reset to first page
    fetchLeads(); // Refresh leads list
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      const response = await deleteLead(id);
      
      if (response.success) {
        fetchLeads(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Failed to delete lead. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle filter changes
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleSourceFilterChange = (e) => {
    setSourceFilter(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  // Handle sort changes
  const handleSortChange = (field) => {
    if (sortBy === field) {
      // Toggle sort order if same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to descending
      setSortBy(field);
      setSortOrder('desc');
    }
    setCurrentPage(1); // Reset to first page
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setSourceFilter('');
    setSortBy('createdAt');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    const colors = {
      New: 'bg-blue-100 text-blue-800',
      Contacted: 'bg-yellow-100 text-yellow-800',
      Qualified: 'bg-purple-100 text-purple-800',
      Converted: 'bg-green-100 text-green-800',
      Lost: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    
    return sortOrder === 'asc' ? (
      <svg className="inline h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="inline h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      
      <div className="relative">
        <Navbar />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Leads</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage and track all your leads
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
             Create Lead
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                Source
              </label>
              <select
                id="source"
                value={sourceFilter}
                onChange={handleSourceFilterChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">All Sources</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Ads">Ads</option>
                <option value="Email">Email</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(searchTerm || statusFilter || sourceFilter) && (
            <div className="mt-4">
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Leads List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-blue-100">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No leads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter || sourceFilter
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first lead'}
            </p>
            {!searchTerm && !statusFilter && !sourceFilter && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                Create Lead
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-blue-100">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                  <tr>
                    <th
                      onClick={() => handleSortChange('name')}
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      Name {getSortIcon('name')}
                    </th>
                    <th
                      onClick={() => handleSortChange('company')}
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      Company {getSortIcon('company')}
                    </th>
                    <th
                      onClick={() => handleSortChange('leadStatus')}
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      Status {getSortIcon('leadStatus')}
                    </th>
                    <th
                      onClick={() => handleSortChange('leadSource')}
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      Source {getSortIcon('leadSource')}
                    </th>
                    <th
                      onClick={() => handleSortChange('createdAt')}
                      className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      Created {getSortIcon('createdAt')}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-blue-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-blue-50 transition-colors border-b border-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link 
                          to={`/leads/${lead._id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {lead.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.leadStatus)}`}>
                          {lead.leadStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.leadSource}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/leads/${lead._id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(lead._id)}
                          disabled={deleteLoading === lead._id}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        >
                          {deleteLoading === lead._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 border-t border-blue-200 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                {/* Mobile Pagination */}
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * limit, totalLeads)}
                    </span>{' '}
                    of <span className="font-medium">{totalLeads}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-blue-300 bg-white text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      // Show first, last, current, and adjacent pages
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                              currentPage === pageNum
                                ? 'z-10 bg-blue-100 border-blue-500 text-blue-600'
                                : 'bg-white border-blue-300 text-blue-600 hover:bg-blue-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return (
                          <span
                            key={pageNum}
                            className="relative inline-flex items-center px-4 py-2 border border-blue-300 bg-white text-sm font-medium text-blue-700"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                    
                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-blue-300 bg-white text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Lead Modal */}
      <CreateLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLeadCreated={handleLeadCreated}
      />
    </div>
  );
};

export default Leads;