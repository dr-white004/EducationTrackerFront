
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AuthContext from '../context/Authcontext';
import Header from '../components/header';
import BookCard from '../components/bookcards';
import EditModal from '../components/editmodal';
import BACKEND_URL from '../context/bacurl';

const PastBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [favoriteBook, setFavoriteBook] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/track/past-books/`, {
          headers: {
            Authorization: "Bearer " + String(auth.access),
          },
        });
        setBooks(response.data);
      } catch (error) {
        setError("Error fetching past books. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [auth.access]);

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/track/personal-favorite/`, {
          headers: {
            Authorization: "Bearer " + String(auth.access),
          },
        });
        const data = response.data;
        if (data.personal_favorite !== "") {
          const personalFavoriteData = JSON.parse(data.personal_favorite);
          const pk = personalFavoriteData[0].pk;
          setFavoriteBook(pk);
        }
      } catch (error) {
        setError("Error fetching personal favorite book. Please try again.");
      }
    };
    fetchFav();
  }, [auth.access]);

  const handleFavoriteBook = async (bookId) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/track/favorite-book/${bookId}/`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + String(auth.access),
        },
      });
      setFavoriteBook(response.data.book_id || response.data.favorite?.id || bookId);
    } catch (error) {
      setError("Error favoriting the book. Please try again.");
    }
  };

  const handleEditClick = (book) => {
    setSelectedBook(book);
  };

  const handleDeleteClick = async (book) => {
    try {
      await axios.delete(`${BACKEND_URL}/track/detail-books/${book.id}/`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      });
      setBooks(books.filter((item) => item.id !== book.id));
    } catch (error) {
      setError("Error deleting the book. Please try again.");
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterBy === 'favorites') {
      return matchesSearch && (favoriteBook === book.id || favoriteBook?.favorite?.id === book.id);
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Past Reads</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Revisit the books you've completed and cherish your reading journey
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search books by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="all">All Books</option>
                <option value="favorites">Favorites Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg max-w-4xl mx-auto"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-lg text-gray-600">Loading your past books...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <svg
                  className="mx-auto h-24 w-24 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {searchTerm || filterBy === 'favorites' ? 'No books found' : 'No past books yet'}
                </h3>
                <p className="mt-2 text-gray-500">
                  {searchTerm || filterBy === 'favorites'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Your completed books will appear here.'}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filterBy === 'favorites' ? 'Your Favorite Past Books' : 'Your Past Books'}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'})
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                      <BookCard
                        book={book}
                        isFavorite={favoriteBook === book.id || favoriteBook?.favorite?.id === book.id}
                        onFavorite={() => handleFavoriteBook(book.id)}
                        chapters={[]}
                        showHiddenContent={false}
                        toggleHiddenContent={() => {}}
                        accept={() => {}}
                      />
                      <div className="p-6 border-t border-gray-100 flex gap-2">
                        <button
                          onClick={() => handleEditClick(book)}
                          className="flex-1 bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(book)}
                          className="flex-1 bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        {selectedBook && (
          <EditModal
            book={selectedBook}
            setSelectedBook={setSelectedBook}
            setBooks={setBooks}
          />
        )}
      </div>
    </div>
  );
};

export default PastBooks;