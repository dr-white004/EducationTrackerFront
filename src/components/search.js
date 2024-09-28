import React, { useState } from 'react';
import axios from 'axios';
import Modal from './searchmodal';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchTerm}`);
      setSearchResults(response.data.docs.slice(0, 5));
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a book"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Search</button>
        {isLoading && <p className="absolute top-full left-0 mt-1 text-sm text-gray-500">Loading...</p>}
      </form>
      {showModal && (
        <Modal handleClose={() => { setShowModal(false); setSearchTerm('');  setSearchResults([]) }}>
          <ul>
            {searchResults.map((book) => (
              <li key={book.key} className="mb-4">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">Author: {book.author_name?.join(', ') || 'Unknown'}</p>
                <p className="text-sm text-gray-600">First Publish Year: {book.first_publish_year}</p>
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} className="w-24 h-32 object-cover rounded-md shadow-md" />
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default SearchBar;
