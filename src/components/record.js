import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BACKEND_URL from '../context/bacurl';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/track/books/`,
        {
          title,
          author,
          pages,
          genre,
          description,
          category,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.access}`,
          },
        }
      );

      if (response.status === 201) {
        navigate(`/${category.toString()}`);
        clearFields();
      }

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearFields = () => {
    setTitle('');
    setAuthor('');
    setPages('');
    setGenre('');
    setDescription('');
    setCategory('');
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto"
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
        <h2 className="text-2xl font-bold text-center">Add Book to Your Library</h2>
        <p className="text-center text-blue-100 mt-2 text-sm">Expand your reading collection</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-b-2xl p-8"
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg flex items-center"
          >
            <svg
              className="h-5 w-5 text-red-400 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-red-700 flex-1">{error}</p>
            <button
              onClick={() => setError('')}
              className="text-red-400 hover:text-red-600"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </motion.div>
        )}

        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6"
        >
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Title<span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter title"
          />
        </motion.div>

        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mb-6"
        >
          <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
            Author<span className="text-red-500">*</span>
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter author"
          />
        </motion.div>

        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mb-6"
        >
          <label htmlFor="pages" className="block text-sm font-semibold text-gray-700 mb-2">
            Pages
          </label>
          <input
            id="pages"
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter number of pages"
          />
        </motion.div>

        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mb-6"
        >
          <label htmlFor="genre" className="block text-sm font-semibold text-gray-700 mb-2">
            Genre
          </label>
          <input
            id="genre"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter genre"
          />
        </motion.div>

        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mb-6"
        >
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
            placeholder="Enter description"
            rows="4"
          />
        </motion.div>

        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          custom={5}
          className="mb-6"
        >
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
            Category<span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select a Library</option>
            <option value="past">Past</option>
            <option value="present">Present</option>
            <option value="future">Future</option>
          </select>
        </motion.div>

        <motion.div
          className="flex items-center justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <button
            type="submit"
            className={`px-8 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {loading ? 'Adding...' : 'Add to Library'}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default BookForm;