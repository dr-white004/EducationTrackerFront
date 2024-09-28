
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className="max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Add Book to Your Library</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="Enter title"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author:</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input-field"
            placeholder="Enter author"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pages" className="block text-gray-700 text-sm font-bold mb-2">Pages:</label>
          <input
            id="pages"
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="input-field"
            placeholder="Enter number of pages"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">Genre:</label>
          <input
            id="genre"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="input-field"
            placeholder="Enter genre"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            placeholder="Enter description"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field"
          >
            <option value="">Select a Library</option>
            <option value="past">Past</option>
            <option value="present">Present</option>
            <option value="future">Future</option>
          </select>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
        <button
  type="submit"
  className="btn-submit px-6 py-2 text-white font-bold bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300 transition duration-300 ease-in-out"
  disabled={loading}
>
  {loading ? 'Adding...' : 'Add to Library'}
</button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default BookForm;
