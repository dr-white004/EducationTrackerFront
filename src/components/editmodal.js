// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import AuthContext from '../context/Authcontext';
// import BACKEND_URL from '../context/bacurl';

// const EditModal = ({ book, setSelectedBook, setBooks }) => {
//   const [editedBook, setEditedBook] = useState({
//     pk: book.id,
//     user: book.user,
//     title: book.title,
//     author: book.author,
//     pages: book.pages,
//     genre: book.genre,
//     description: book.description,
//     category: book.category,
//   });
//   let{auth} = useContext(AuthContext)

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedBook({
//       ...editedBook,
//       [name]: value,
//     });
//   };

//   const handleUpdate = async () => {
//     try {
//         const headers = {
//             'Content-Type': 'application/json',
//             Authorization: "Bearer " + String(auth.access),
//           };
//         await axios.put(`${BACKEND_URL}/track/detail-books/${parseInt(book.id)}/`, editedBook , { headers });

//       // Update UI
//       setBooks(prevBooks => prevBooks.map(book => book.id === editedBook.pk ? editedBook : book));
//       setSelectedBook(null); // Close modal
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
//         <h2 className="text-xl font-bold mb-4">Edit Book</h2>
//         <div className="mb-4">
//           <label htmlFor="title" className="block font-semibold mb-1">Title:</label>
//           <input type="text" id="title" name="title" value={editedBook.title} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="author" className="block font-semibold mb-1">Author:</label>
//           <input type="text" id="author" name="author" value={editedBook.author} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="pages" className="block font-semibold mb-1">Pages:</label>
//           <input type="number" id="pages" name="pages" value={editedBook.pages} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="genre" className="block font-semibold mb-1">Genre:</label>
//           <input type="text" id="genre" name="genre" value={editedBook.genre} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="description" className="block font-semibold mb-1">Description:</label>
//           <textarea id="description" name="description" value={editedBook.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2"></textarea>
//         </div>
//         <div className="flex justify-end">
//           <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Update</button>
//           <button onClick={() => setSelectedBook(null)} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md">Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;




import React, { useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AuthContext from '../context/Authcontext';
import BACKEND_URL from '../context/bacurl';

const EditModal = ({ book, setSelectedBook, setBooks }) => {
  const [editedBook, setEditedBook] = useState({
    pk: book.id,
    user: book.user,
    title: book.title || '',
    author: book.author || '',
    pages: book.pages || '',
    genre: book.genre || '',
    description: book.description || '',
    category: book.category || '',
  });
  const [error, setError] = useState('');
  let { auth } = useContext(AuthContext);

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
      await axios.put(`${BACKEND_URL}/track/detail-books/${parseInt(book.id)}/`, editedBook, { headers });

      // Update UI
      setBooks(prevBooks => prevBooks.map(book => book.id === editedBook.pk ? editedBook : book));
      setSelectedBook(null); // Close modal
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating the book. Please try again.');
      console.error(error.response.data);
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Edit Book</h2>
            <button
              onClick={() => setSelectedBook(null)}
              className="text-white hover:text-gray-200"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-blue-100 mt-2 text-sm">Update your book details</p>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center"
            >
              <svg className="h-5 w-5 text-red-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-red-700 flex-1">{error}</p>
              <button
                onClick={() => setError('')}
                className="text-red-400 hover:text-red-600"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </motion.div>
          )}

          <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={0}>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">Title<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedBook.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </motion.div>

          <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={1}>
            <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">Author<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="author"
              name="author"
              value={editedBook.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </motion.div>

          <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={2}>
            <label htmlFor="pages" className="block text-sm font-semibold text-gray-700 mb-2">Pages</label>
            <input
              type="number"
              id="pages"
              name="pages"
              value={editedBook.pages}
              onChange={handleChange}
              placeholder="Enter number of pages"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </motion.div>

          <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={3}>
            <label htmlFor="genre" className="block text-sm font-semibold text-gray-700 mb-2">Genre</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={editedBook.genre}
              onChange={handleChange}
              placeholder="Enter genre"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </motion.div>

          <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={4}>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={editedBook.description}
              onChange={handleChange}
              placeholder="Enter book description or review"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
            />
          </motion.div>

          <motion.div variants={fieldVariants} initial="hidden" animate="visible" custom={5}>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">Category<span className="text-red-500">*</span></label>
            <select
              id="category"
              name="category"
              value={editedBook.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="">Select a Library</option>
              <option value="past">Past</option>
              <option value="present">Present</option>
              <option value="future">Future</option>
            </select>
          </motion.div>

          <motion.div
            className="flex gap-3 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <button
              type="button"
              onClick={() => setSelectedBook(null)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Save Changes
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditModal;