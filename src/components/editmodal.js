import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/Authcontext';
import BACKEND_URL from '../context/bacurl';

const EditModal = ({ book, setSelectedBook, setBooks }) => {
  const [editedBook, setEditedBook] = useState({
    pk: book.id,
    user: book.user,
    title: book.title,
    author: book.author,
    pages: book.pages,
    genre: book.genre,
    description: book.description,
    category: book.category,
  });
  let{auth} = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({
      ...editedBook,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + String(auth.access),
          };
        await axios.put(`${BACKEND_URL}/track/detail-books/${parseInt(book.id)}/`, editedBook , { headers });

      // Update UI
      setBooks(prevBooks => prevBooks.map(book => book.id === editedBook.pk ? editedBook : book));
      setSelectedBook(null); // Close modal
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Book</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold mb-1">Title:</label>
          <input type="text" id="title" name="title" value={editedBook.title} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block font-semibold mb-1">Author:</label>
          <input type="text" id="author" name="author" value={editedBook.author} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="pages" className="block font-semibold mb-1">Pages:</label>
          <input type="number" id="pages" name="pages" value={editedBook.pages} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block font-semibold mb-1">Genre:</label>
          <input type="text" id="genre" name="genre" value={editedBook.genre} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-1">Description:</label>
          <textarea id="description" name="description" value={editedBook.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2"></textarea>
        </div>
        <div className="flex justify-end">
          <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Update</button>
          <button onClick={() => setSelectedBook(null)} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
