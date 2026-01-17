// NAVBAR COMPONENTS

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../services/authService.js';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper to check if link is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-100 via-blue-50 to-cyan-50 shadow-md border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <span className="bg-blue-200 bg-opacity-40 rounded-lg p-2">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              LeadFlow
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/dashboard')
                  ? 'bg-blue-200 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/leads"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/leads')
                  ? 'bg-blue-200 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              Leads
            </Link>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-sm hover:shadow-md font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;