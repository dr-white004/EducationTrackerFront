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
    <nav className="bg-gray-800 py-4 lg:py-0">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-white text-lg font-bold hover:text-gray-300 mr-6">Homepage</Link>
            <Link to="/register" className="text-white hover:text-gray-300 mr-6">Register</Link>
            <Link to="/bookshelf" className="text-white hover:text-gray-300 mr-6 hidden lg:block">Bookshelf</Link>
          </div>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none focus:text-gray-300"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 5h18v1H3V5zm0 7h18v1H3v-1zm0 6h18v1H3v-1z"
                />
              </svg>
            </button>
          </div>
          {user ? (
            <div className="hidden lg:flex items-center">
             
  <p className="text-white font-semibold">Welcome {user.username}</p>
  <Link to="/recommend" className="text-white hover:text-gray-300 ml-4">Explore</Link>
  <button onClick={logoutUser} className="text-white bg-transparent px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out">Logout</button>

            </div>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300 hidden lg:block">Login</Link>
          )}
        </div>
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4">
            {user && (
              <p className="text-white mb-4">
                Welcome {user.username}
              </p>
            )}
            <Link to="/bookshelf" className="block text-white hover:text-gray-300 py-2">Bookshelf</Link>
            <Link to="/recommend" className="block text-white hover:text-gray-300 py-2">Explore</Link>
            <Link to="/login" className="block text-white hover:text-gray-300 py-2">Login</Link>
            {/* Add logout option here if needed */}
            <button onClick={logoutUser} className="text-white bg-transparent py-3 rounded hover:bg-white hover:text-gray-800 transition duration-300 ease-in-out">Logout</button>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
