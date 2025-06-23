import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/Authcontext';
import Header from '../components/header';
import SearchBar from '../components/search';
import axios from 'axios';
import Footer from '../components/footer';
import BACKEND_URL from '../context/bacurl';
import { FiBook, FiUser, FiFilter, FiLoader, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

function BookRecommendations() {
  const [mostCommonGenre, setMostCommonGenre] = useState('');
  const [mostCommonAuthor, setMostCommonAuthor] = useState('');
  const [booksByAuthor, setBooksByAuthor] = useState([]);
  const [booksInGenre, setBooksInGenre] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  useEffect(() => {
    if (mostCommonAuthor !== '' && mostCommonGenre !== '') {
      fetchBooks();
    }
  }, [mostCommonAuthor, mostCommonGenre]);

  const fetchRecommendations = () => {
    setIsLoading(true);
    fetch(`${BACKEND_URL}/track/recommend-books/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(auth.access),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMostCommonGenre(data.most_common_genre);
        setMostCommonAuthor(data.most_common_author);
      })
      .catch((error) => console.error('Error fetching recommendations:', error))
      .finally(() => setIsLoading(false));
  };

  const fetchBooksByAuthor = () => {
    axios
      .get(`https://openlibrary.org/search.json?author=${mostCommonAuthor}&limit=10`)
      .then((response) => {
        setBooksByAuthor(response.data.docs);
      })
      .catch((error) => console.error('Error fetching books by author:', error));
  };

  const fetchBooksInGenre = () => {
    axios
      .get(`https://openlibrary.org/subjects/${mostCommonGenre}.json?limit=10`)
      .then((response) => {
        setBooksInGenre(response.data.works);
      })
      .catch((error) => console.error('Error fetching books from genre:', error));
  };

  const fetchBooks = () => {
    fetchBooksByAuthor();
    fetchBooksInGenre();
  };

  const filteredBooks = () => {
    switch (activeTab) {
      case 'author':
        return booksByAuthor.map((book) => ({ ...book, type: 'author' }));
      case 'genre':
        return booksInGenre.map((book) => ({ ...book, type: 'genre' }));
      default:
        return [
          ...booksByAuthor.map((book) => ({ ...book, type: 'author' })),
          ...booksInGenre.map((book) => ({ ...book, type: 'genre' })),
        ].sort(() => 0.5 - Math.random());
    }
  };

  const BookCover = ({ book }) => {
    const [imageError, setImageError] = useState(false);

    return (
      <div className="relative h-48 overflow-hidden">
        {!imageError && book.cover_i ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-xl">
            <FiBook size={32} className="text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
          {book.type === 'author' ? (
            <span className="text-indigo-600 flex items-center">
              <FiUser className="mr-1" /> Author Pick
            </span>
          ) : (
            <span className="text-pink-600 flex items-center">
              <FiFilter className="mr-1" /> Genre Pick
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <SearchBar />

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <FiLoader className="animate-spin text-4xl text-indigo-600 mb-4" />
              <p className="text-gray-600">Discovering your perfect reads...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Personalized Book Recommendations</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Based on your reading history, we've curated these special picks just for you
                </p>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="bg-white rounded-full shadow-sm p-1 inline-flex">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    All Recommendations
                  </button>
                  <button
                    onClick={() => setActiveTab('author')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === 'author' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    <FiUser className="inline mr-2" />
                    From {mostCommonAuthor}
                  </button>
                  <button
                    onClick={() => setActiveTab('genre')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeTab === 'genre' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    <FiFilter className="inline mr-2" />
                    {mostCommonGenre} Genre
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks().map((book, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <BookCover book={book} />
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
                      <p className="text-gray-600 mb-4">
                        {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {book.first_publish_year || 'Year unknown'}
                        </span>
                        <a
                          href={`https://openlibrary.org${book.key}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          View Details <FiExternalLink className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-4">Want More Recommendations?</h2>
                  <p className="text-lg mb-6">
                    Tell us more about your reading preferences and we'll find even better matches for you.
                  </p>
                  <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Take Reading Preference Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default BookRecommendations;