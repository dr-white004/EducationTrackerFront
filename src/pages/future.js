import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/Authcontext';
import Header from '../components/header';
import EditModal from '../components/editmodal';
import SecondCard from '../components/secondcard';
import BACKEND_URL from '../context/bacurl';

const FutureBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState(null);
  let {auth} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/track/future-books/`, {
          headers: {
            Authorization: "Bearer " + String(auth.access),
          },
        });



        setBooks(response.data);
      } catch (error) {
        console.error(error.response.data);
        setError("Error fetching future books. Please try again.");
      }
    };

    fetchData();
  }, []);


  const handleEditClick = (book) => {
    setSelectedBook(book);
  };

  const handleDeleteClick =async (book) => {
    try {
      const deleteBookResponse = await axios.delete(`${BACKEND_URL}/track/detail-books/${book.id}/`, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      });
    
      // Update UI
      setBooks( books.filter(item => item.id !== book.id));
    } catch (error) {
      console.error(error.response.data);
      setError("Error deleting the book. Please try again.");
    }
  };

  const handleUpdateBook = async (updatedBook) => {
    try {
      const updatedBookResponse = await axios.put(`${BACKEND_URL}/track/detail-books/${updatedBook.id}/`, updatedBook, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      });
     
        console.log( updatedBookResponse.data)
        setBooks(books =>
          books.map(book =>
            book.id === updatedBook.id ? updatedBookResponse.data : book
          )
        );
    
    setSelectedBook(null); // Close modal
    } catch (error) {
      console.error(error.response.data);
      setError("Error updating the book. Please try again.");
    }
  };


  return (
    <div>
       <Header />
       <h2 className="text-3xl font-bold mb-8 text-center text-blue-700 animate-slide">Books to Read Later</h2>
       {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative error-message" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">{error}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.354 5.354a2 2 0 0 1 0 2.828L7.828 12l6.526 6.526a2 2 0 1 1-2.828 2.828L5 14.828l-6.526 6.526a2 2 0 1 1-2.828-2.828L2.172 12 8.7 5.474a2 2 0 0 1 2.828-2.828L12 9.172l6.526-6.526a2 2 0 1 1 2.828 2.828L14.828 12l6.526 6.526a2 2 0 1 1-2.828 2.828L12 14.828l-6.526 6.526a2 2 0 1 1-2.828-2.828L9.172 12 2.646 5.474a2 2 0 0 1 0-2.828L8.172 2.172a2 2 0 0 1 2.828 2.828L12 9.172l6.526-6.526a2 2 0 0 1 2.828 2.828L14.828 12l6.526 6.526a2 2 0 0 1-2.828 2.828L12 14.828l-6.526 6.526a2 2 0 0 1-2.828-2.828L9.172 12 2.646 5.474a2 2 0 0 1 0-2.828L8.172 2.172a2 2 0 0 1 2.828 2.828L12 9.172l6.526-6.526a2 2 0 1 1 2.828 2.828L14.828 12l6.526 6.526a2 2 0 1 1-2.828 2.828L12 14.828l-6.526 6.526a2 2 0 1 1-2.828-2.828L9.172 12 2.646 5.474a2 2 0 0 1 0-2.828z"/></svg>
        </span>
      </div>
      )}
      <div className="flex flex-wrap justify-center gap-8">
      {books.map((book) => (
            <div key={book.id}>
            <SecondCard
              book={book}
              
              edit={() => handleEditClick(book)}
              delet={() => handleDeleteClick(book)}
              
              
            />   
              
           </div>
          ))}
      
      </div>
      {selectedBook && (
        <EditModal
          book={selectedBook}
          handleUpdateBook={handleUpdateBook}
          setSelectedBook={setSelectedBook}
          setBooks ={setBooks}
        />
      )}
      </div>
   
  );
};


export default FutureBooks;
