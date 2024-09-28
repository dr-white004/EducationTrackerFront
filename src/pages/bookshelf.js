import React from 'react';
import { Link } from 'react-router-dom';
import DynamicBackground from '../components/dynamic';
import Footer from '../components/footer';

const Bookshelf = () => {
  return (
    <div>
         <DynamicBackground />
      <div className='flex flex-col min-h-screen'>
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-semibold text-center mb-8">Your Bookshelf</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/present" className="rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            <img className="w-full h-64 object-cover" src="/presentbooks.jpeg" alt="Present Books" />
            <div className="py-4 px-6 bg-gray-900 text-white text-center">
               Present books library
            </div>
          </Link>

          <Link to="/future" className="rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            <img className="w-full h-64 object-cover" src="/fututebooks.jpg" alt="Future Books" />
            <div className="py-4 px-6 bg-gray-900 text-white text-center">
              Future Books library
            </div>
          </Link>

          <Link to="/past" className="rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            <img className="w-full h-64 object-cover" src="/pastbooks.jpeg" alt="Past Books" />
            <div className="py-4 px-6 bg-gray-900 text-white text-center">
            Past books library
            </div>
          </Link>
        </div>
      </div>
      <Footer/>
      </div>
    </div>
  );
};

export default Bookshelf;
