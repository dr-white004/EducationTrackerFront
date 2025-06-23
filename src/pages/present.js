import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/Authcontext';
import Header from '../components/header';
import BookCard from '../components/bookcards';
import BACKEND_URL from '../context/bacurl';

const PresentBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoriteBook, setFavoriteBook] = useState(null);
  const [lesson, setLesson] = useState('');
  const [chapter, setChapter] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [chapterAndLessonList, setChapterAndLessonList] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [particular, setParticular] = useState(false);
  const [hiddenContentState, setHiddenContentState] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/track/present-books/`, {
          headers: {
            Authorization: "Bearer " + String(auth.access),
          },
        });
        setHiddenContentState(new Array(response.data.length).fill(false));
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching present books. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchfav = async () => {
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

    fetchfav();
  }, []);

  const handleFavoriteBook = async (bookId) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/track/favorite-book/${bookId}/`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + String(auth.access),
        },
      });
      setFavoriteBook(response.data);
    } catch (error) {
      setError("Error favoriting the book. Please try again.");
    }
  };

  const handleShowModal = async (bookId) => {
    setShowModal(true);
    setParticular(bookId);
  };

  const handleSaveProgress = async (e) => {
    e.preventDefault();

    if (!chapter || !lesson.trim()) {
      setError("Please fill in both chapter and lesson fields.");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/track/create-chapter-with-lesson/`, {
        chapter_number: chapter,
        lesson_content: lesson,
        book_id: particular
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.access}`,
        }
      });
      setParticular('');
      setChapter('');
      setLesson('');
      setShowModal(false);
      setError(null);
    } catch (error) {
      setError("Error saving progress. Please try again.");
    }
  };

  const fetchChapterAndLessonList = async (bookId) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/track/chapters-and-lessons/${bookId}/`);
      setChapterAndLessonList([]);
      setChapterAndLessonList(response.data);
      setFetch(false);
    } catch (error) {
      setError("Error fetching chapters and lessons. Please try again.");
      setFetch(false);
    }
  };

  const toggleHiddenContent = (index) => {
    const updatedHiddenContentState = hiddenContentState.map((state, i) => (i === index ? !state : false));
    setHiddenContentState(updatedHiddenContentState);
  };

  // Filter books based on search term and filter
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'favorites') {
      return matchesSearch && (favoriteBook?.favorite?.id === book.id || favoriteBook == book.id);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Reading Collection
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Track your progress and dive deeper into your favorite books
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
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg max-w-4xl mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-600"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-lg text-gray-600">Loading your books...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"></path>
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {searchTerm || filterBy === 'favorites' ? 'No books found' : 'No books yet'}
              </h3>
              <p className="mt-2 text-gray-500">
                {searchTerm || filterBy === 'favorites' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Start building your reading collection by adding some books.'}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {filterBy === 'favorites' ? 'Your Favorite Books' : 'Your Books'}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'})
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBooks.map((book, index) => (
                <div key={book.id} className="group">
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <BookCard
                      book={book}
                      isFavorite={favoriteBook?.favorite?.id === book.id || favoriteBook == book.id}
                      onFavorite={() => handleFavoriteBook(book.id)}
                      accept={() => fetchChapterAndLessonList(book.id)}
                      chapters={chapterAndLessonList} 
                      toggleHiddenContent={() => toggleHiddenContent(index)}
                      showHiddenContent={hiddenContentState[index]}
                    />   
                    
                    <div className="p-6 border-t border-gray-100">
                      <button 
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                        onClick={() => handleShowModal(book.id)}
                      >
                        <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                        Add Learning Notes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Track Your Progress</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <p className="text-pink-100 mt-2">Record your learning journey</p>
            </div>
            
            <form onSubmit={handleSaveProgress} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chapter Number
                </label>
                <input
                  type="number"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder="Enter chapter number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Key Lessons & Notes
                </label>
                <textarea
                  value={lesson}
                  onChange={(e) => setLesson(e.target.value)}
                  placeholder="What did you learn? Key insights, important concepts, or personal reflections..."
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none"
                  required
                ></textarea>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 font-medium transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300"
                >
                  Save Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PresentBooks;