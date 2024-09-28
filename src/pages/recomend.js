import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/Authcontext';
import Header from '../components/header';
import SearchBar from '../components/search';
import axios from 'axios';
import Footer from '../components/footer';
import BACKEND_URL from '../context/bacurl';

function BookRecommendations() {
  const [mostCommonGenre, setMostCommonGenre] = useState('');
  const [mostCommonAuthor, setMostCommonAuthor] = useState('');
  const [booksByAuthor, setBooksByAuthor] = useState([]);
  const [booksInGenre, setBooksInGenre] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div>
      <Header />
      <div className='flex flex-col min-h-screen'>
        <div className="container mx-auto p-4">
          <SearchBar />
          {isLoading ? (
            <div className="flex justify-center mt-8">
              <div className="loader"></div>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-semibold mb-8 text-center">Book Recommendations</h2>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="bg-white shadow-md rounded-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-pink-600">Books by {mostCommonAuthor}</h3>
                  <ul className="flex flex-col">
                    {booksByAuthor.map((book, index) => (
                      <li key={index} className="flex items-center mb-4">
                        <img
                          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                          alt={book.title}
                          className="w-12 h-16 mr-4 rounded"
                        />
                        <a
                          href={`https://openlibrary.org${book.key}`}
                          className="text-gray-800"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {book.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white shadow-md rounded-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-pink-600">Books in {mostCommonGenre} genre</h3>
                  <ul className="flex flex-col">
                    {booksInGenre.map((book, index) => (
                      <li key={index} className="flex items-center mb-4">
                        <img
                          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                          alt={book.title}
                          className="w-12 h-16 mr-4 rounded"
                        />
                        <a
                          href={`https://openlibrary.org${book.key}`}
                          className="text-gray-800"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {book.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default BookRecommendations;
