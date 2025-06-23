import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/Authcontext';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Main Navigation */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition duration-300"
            >
              📚 Education Tracker
            </Link>
            
            <div className="hidden lg:flex items-center space-x-6">
              {!user && (
                <Link 
                  to="/register" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
                >
                  Register
                </Link>
              )}
              <Link 
                to="/bookshelf" 
                className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
              >
                Bookshelf
              </Link>
              {user && (
                <Link 
                  to="/recommend" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
                >
                  Explore
                </Link>
              )}
            </div>
          </div>

          {/* User Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Welcome, {user.username}
                  </span>
                </div>
                <button 
                  onClick={logoutUser}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition duration-300"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {user && (
                <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-md">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Welcome, {user.username}
                  </span>
                </div>
              )}
              
              {!user && (
                <Link 
                  to="/register" 
                  className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-md transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              )}
              
              <Link 
                to="/bookshelf" 
                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-md transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Bookshelf
              </Link>
              
              {user && (
                <Link 
                  to="/recommend" 
                  className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-md transition duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Explore
                </Link>
              )}
              
              {user ? (
                <button 
                  onClick={() => {
                    logoutUser();
                    setIsOpen(false);
                  }}
                  className="text-left w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 font-medium"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/login" 
                    className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-md transition duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;