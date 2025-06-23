import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBook,FiSearch, FiX, FiLoader } from 'react-icons/fi';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=5`
      );
      setSearchResults(response.data.docs);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className="relative max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <input
            type="text"
            placeholder="Search for books, authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 p-2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            {isLoading ? (
              <FiLoader className="animate-spin" />
            ) : (
              <FiSearch className="text-xl" />
            )}
          </button>
        </motion.div>
      </form>

      <AnimatePresence>
        {showModal && (
          <Modal handleClose={closeModal} searchTerm={searchTerm}>
            {searchResults.length > 0 ? (
              <motion.ul className="divide-y divide-gray-200">
                {searchResults.map((book) => (
                  <motion.li
                    key={book.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-4"
                  >
                    <BookResult book={book} />
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500"
              >
                No results found for "{searchTerm}"
              </motion.div>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

const BookResult = ({ book }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        {!imageError && book.cover_i ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            alt={book.title}
            className="w-16 h-24 object-cover rounded-md shadow-md"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-16 h-24 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
            <FiBook size={24} />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{book.title}</h3>
        <p className="text-sm text-gray-600">
          by {book.author_name?.join(', ') || 'Unknown author'}
        </p>
        {book.first_publish_year && (
          <p className="text-xs text-gray-500 mt-1">
            Published: {book.first_publish_year}
          </p>
        )}
        <a
          href={`https://openlibrary.org${book.key}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
        >
          View details
        </a>
      </div>
    </div>
  );
};

const Modal = ({ handleClose, children, searchTerm }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col"
      >
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold">
            Results for "{searchTerm}"
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;