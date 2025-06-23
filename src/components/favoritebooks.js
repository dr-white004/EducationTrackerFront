import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/Authcontext';
import axios from 'axios';
import { motion } from 'framer-motion';
import BACKEND_URL from '../context/bacurl';

const FavoriteBooks = () => {
    const [currentBook, setCurrentBook] = useState(0);
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    let { auth } = useContext(AuthContext);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: "Bearer " + String(auth.access),
            },
        };

        axios.get(`${BACKEND_URL}/track/favorite-books/`, config)
            .then(response => response.data)
            .then(data => {
                // Parse the JSON string into a JavaScript object
                const parsedData = JSON.parse(data.favorite_books);
                setFavoriteBooks(parsedData);
                if (parsedData.length > 0) {
                    setCurrentBook(0);
                }
            })
            .catch(error => console.error(error));
    }, [auth]);

    const nextBook = () => {
        setCurrentBook((currentBook + 1) % favoriteBooks.length);
    };

    const prevBook = () => {
        setCurrentBook((currentBook - 1 + favoriteBooks.length) % favoriteBooks.length);
    };

    const cardVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center w-full"
        >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl w-full max-w-md">
                <h3 className="text-xl font-bold text-center">Community Favorite Books</h3>
                <p className="text-center text-blue-100 text-sm mt-1">Discover what other readers love</p>
            </div>
            {favoriteBooks.length > 0 ? (
                <motion.div
                    key={currentBook}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full max-w-md bg-white rounded-b-2xl shadow-lg overflow-hidden"
                >
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2 truncate">
                            {favoriteBooks[currentBook].fields.title}
                        </h2>
                        <p className="text-gray-600 mb-3 text-sm italic">
                            by {favoriteBooks[currentBook].fields.author}
                        </p>
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                            {favoriteBooks[currentBook].fields.description || 'No description available.'}
                        </p>
                        <div className="flex justify-between gap-2">
                            <button
                                onClick={prevBook}
                                disabled={currentBook === 0}
                                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                    currentBook === 0
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={nextBook}
                                disabled={currentBook === favoriteBooks.length - 1}
                                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                    currentBook === favoriteBooks.length - 1
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 text-center">
                        <p className="text-gray-500 text-xs">
                            Book {currentBook + 1} of {favoriteBooks.length}
                        </p>
                    </div>
                </motion.div>
            ) : (
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">
                    <svg
                        className="mx-auto h-16 w-16 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
                        />
                    </svg>
                    <p className="text-gray-600 text-sm">
                        No community favorite books yet.
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default FavoriteBooks;