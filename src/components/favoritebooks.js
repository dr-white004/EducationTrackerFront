
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/Authcontext';
import axios from 'axios';
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

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Other users favourite books</h3>
            {favoriteBooks.length > 0 && (
                <div className="w-full max-w-md text-center bg-gray-100 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">{favoriteBooks[currentBook].fields.title}</h2>
                    <p className="text-gray-600 mb-4">{favoriteBooks[currentBook].fields.author}</p>
                    <p className="text-gray-600 mb-4">{favoriteBooks[currentBook].fields.description}</p>
                    <div className="flex justify-between">
                        <button onClick={prevBook} disabled={currentBook === 0} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline">
                            Previous
                        </button>
                        <button onClick={nextBook} disabled={currentBook === favoriteBooks.length - 1} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline">
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FavoriteBooks;
