import React, { useState } from 'react';

const SecondCard = ({ book, delet, edit }) => {
  

  

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 max-w-md flex flex-col items-center overflow-hidden"
      style={{
        width: '300px',
        height: '400px', //  fixed height for the book card
        borderRadius: '20px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'auto', //  card scrollable if content exceeds the height
      }}
    >
      <div className="w-20 h-20 rounded-full flex items-center justify-center bg-pink-100" style={{ border: '2px solid #FFD1DC', marginBottom: '1rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-12 h-12 text-pink-500">
          <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zM4.354 9.146a6 6 0 1 1 8.486 8.485l.002.001.001-.001a6 6 0 0 1-8.486-8.485z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold mb-2 text-center" style={{ color: '#7B4B9E' }}>
        {book.title}
      </h2>
      <p className="text-gray-700 mb-2 text-center" style={{ color: '#7B4B9E' }}>
        <span className="font-semibold">Author:</span> {book.author}
      </p>
      <p className="text-gray-700 mb-2 text-center" style={{ color: '#7B4B9E' }}>
        <span className="font-semibold">Pages:</span> {book.pages}
      </p>
      <p className="text-gray-700 mb-2 text-center" style={{ color: '#7B4B9E' }}>
        <span className="font-semibold">Genre:</span> {book.genre}
      </p>
      <p className="text-gray-700 mb-2 text-center" style={{ color: '#7B4B9E' }}>
        <span className="font-semibold">Your Review:</span> {book.description}
      </p>
     <div className='flex flex-row gap-2'>
      <button
        className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
        onClick={edit}
      >
        Edit
      </button>
      <button
        className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
        onClick={delet}
      >
        Delete
      </button>

      </div>
    </div>
  );
};

export default SecondCard;
