
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/Authcontext';
import Header from '../components/header';
import Footer from '../components/footer';
import BACKEND_URL from '../context/bacurl';

const Bookshelf = () => {
  const [stats, setStats] = useState({
    past: 0,
    present: 0,
    future: 0,
  });
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookStats = async () => {
      if (!auth.access) return;
      setLoading(true);
      try {
        const headers = {
          Authorization: `Bearer ${auth.access}`,
        };
        const [pastRes, presentRes, futureRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/track/past-books/`, { headers }),
          axios.get(`${BACKEND_URL}/track/present-books/`, { headers }),
          axios.get(`${BACKEND_URL}/track/future-books/`, { headers }),
        ]);
        setStats({
          past: pastRes.data.length,
          present: presentRes.data.length,
          future: futureRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching book stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookStats();
  }, [auth.access]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Your <span className="text-blue-600">Personal Library</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
              Organize and explore your reading journey across time
            </p>
          </div>
        </div>
      </div>

      {/* Bookshelf Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Reading Timeline
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore your books organized by when you read them
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link 
                to="/present" 
                className="group rounded-xl overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-80">
                  <img 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                    src="/presentbooks.jpeg" 
                    alt="Present Books" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Present Reads</h3>
                    <p className="text-gray-200">Books you're currently reading</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/future" 
                className="group rounded-xl overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-80">
                  <img 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                    src="/fututebooks.jpg" 
                    alt="Future Books" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Future Reads</h3>
                    <p className="text-gray-200">Books you plan to read</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/past" 
                className="group rounded-xl overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-80">
                  <img 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                    src="/pastbooks.jpeg" 
                    alt="Past Books" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Past Reads</h3>
                    <p className="text-gray-200">Books you've completed</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {!auth.access && (
        <div className="py-8 bg-yellow-50 text-center">
          <p className="text-lg text-yellow-800">
            <Link to="/login" className="underline hover:text-yellow-900">Log in</Link> to see your personalized reading stats.
          </p>
        </div>
      )}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Reading Journey</h2>
              <p className="text-lg text-gray-600">
                Track your progress and discover insights about your reading habits
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-gray-50 rounded-lg p-8 shadow-md">
                {loading ? (
                  <div className="text-4xl font-bold text-blue-600 mb-2 animate-pulse">...</div>
                ) : (
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stats.past}</div>
                )}
                <div className="text-gray-600">Books Read</div>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-8 shadow-md">
                {loading ? (
                  <div className="text-4xl font-bold text-green-600 mb-2 animate-pulse">...</div>
                ) : (
                  <div className="text-4xl font-bold text-green-600 mb-2">{stats.present}</div>
                )}
                <div className="text-gray-600">Currently Reading</div>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-8 shadow-md">
                {loading ? (
                  <div className="text-4xl font-bold text-purple-600 mb-2 animate-pulse">...</div>
                ) : (
                  <div className="text-4xl font-bold text-purple-600 mb-2">{stats.future}</div>
                )}
                <div className="text-gray-600">On Your List</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Bookshelf;