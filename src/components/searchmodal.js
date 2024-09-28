import React from 'react';

const Modal = ({ handleClose, children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 overflow-auto">
      <div className="modal bg-white p-4 rounded-lg shadow-md">
        <div className="modal-content">
          {children}
          <button onClick={handleClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
