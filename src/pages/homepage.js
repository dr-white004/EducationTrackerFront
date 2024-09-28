import React, { useContext } from 'react';
import BookForm from '../components/record';
import DynamicBackground from '../components/dynamic';
import FavoriteBooks from '../components/favoritebooks';
import Footer from '../components/footer';
import AuthContext from '../context/Authcontext';

const Homepage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <DynamicBackground />
      <div className="flex flex-col min-h-screen items-center justify-center">
      <div className='container mx-auto px-4 py-8 md:py-16 text-center'>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
          Welcome to <span className="text-blue-600">EDUCATION TRACKER</span> – your ultimate destination for managing and exploring your reading journey!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 md:max-w-lg mx-auto">
          "Education is the passport to the future, for tomorrow belongs to those who prepare for it today." - Malcolm X
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
          {user ? (
            <div className="text-center">
              <FavoriteBooks />
              <BookForm />
            </div>
          ) : (
            <p>Sign up immediately to monitor your reading personally</p> 
          )}
        </div>
      </div>
      <Footer />
      </div>
    </div>
  );
};

export default Homepage;
