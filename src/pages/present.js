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

  return (
    <div>
      <Header />
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 animate-slide">Present Books</h2>
      {loading ? (
        <div className="flex justify-center">
          <svg
            className="animate-spin h-5 w-5 text-blue-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" fill="#fff" />
            <path
              fill="#fff"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {books.map((book, index) => (
            <div key={book.id} className="flex flex-col items-center mb-8">
              <BookCard
                book={book}
                isFavorite={favoriteBook?.favorite?.id === book.id || favoriteBook == book.id}
                onFavorite={() => handleFavoriteBook(book.id)}
                accept={() => fetchChapterAndLessonList(book.id)}
                chapters={chapterAndLessonList} 
                toggleHiddenContent={() => toggleHiddenContent(index)}
                showHiddenContent={hiddenContentState[index]}
              />   
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm" onClick={() => handleShowModal(book.id)}>
                Jot Lessons
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <div className="bg-pink-100 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-pink-700">Reading Progress</h2>
              <div className="flex flex-col gap-4">
                <input
                  className="rounded-md border border-pink-300 px-4 py-2 focus:outline-none focus:border-pink-500"
                  type="text"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  placeholder="Chapter"
                />
                <textarea
                  className="rounded-md border border-pink-300 px-4 py-2 focus:outline-none focus:border-pink-500"
                  value={lesson}
                  onChange={(e) => setLesson(e.target.value)}
                  placeholder="Lesson"
                  rows="4"
                ></textarea>
                <button
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleSaveProgress}
                >
                  Save Progress
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default PresentBooks;





