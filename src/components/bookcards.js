import React from 'react';

const BookCard = ({ book, isFavorite, onFavorite, chapters, showHiddenContent, accept, toggleHiddenContent }) => {
  const handleToggleAndAccept = () => {
    toggleHiddenContent();
    accept();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Card Header with Book Icon */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 text-center relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={onFavorite}
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isFavorite 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h2>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <svg className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm">
              <span className="font-medium">Author:</span> {book.author}
            </span>
          </div>

          <div className="flex items-center text-gray-700">
            <svg className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm">
              <span className="font-medium">Pages:</span> {book.pages}
            </span>
          </div>

          <div className="flex items-center text-gray-700">
            <svg className="w-4 h-4 mr-3 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-sm">
              <span className="font-medium">Genre:</span> {book.genre}
            </span>
          </div>
        </div>

        {/* Review Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-4 h-4 mr-3 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <div>
              <span className="text-sm font-medium text-gray-900">Your Review:</span>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">{book.description}</p>
            </div>
          </div>
        </div>

        {/* Progress/Chapters Section */}
        {showHiddenContent && chapters && chapters.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-semibold text-blue-900">Learning Progress</span>
              </div>
              
              <div className="space-y-3 max-h-32 overflow-y-auto">
                {chapters.map((chapter) => (
                  <div key={chapter.id} className="bg-white rounded-md p-3 border-l-4 border-blue-400">
                    <div className="font-medium text-sm text-gray-900 mb-1">
                      Chapter {chapter.chapter.number}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {chapter.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={handleToggleAndAccept}
          className="w-full flex items-center justify-center py-2 px-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 group-hover:bg-blue-100"
        >
          <svg 
            className={`w-4 h-4 mr-2 transform transition-transform duration-200 ${showHiddenContent ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
          {showHiddenContent ? 'Hide Progress' : 'View Progress'}
        </button>
      </div>
    </div>
  );
};

export default BookCard;