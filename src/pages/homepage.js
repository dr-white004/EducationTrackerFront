import React, { useContext } from 'react';
import BookForm from '../components/record';
import FavoriteBooks from '../components/favoritebooks';
import Footer from '../components/footer';
import AuthContext from '../context/Authcontext';
import Header from '../components/header';

const Homepage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-white">
        <Header />
   
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Welcome to <span className="text-blue-600">EDUCATION TRACKER</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
              Your ultimate destination for managing and exploring your reading journey
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-12 max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 italic">
                "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
              </p>
              <p className="text-sm text-gray-500 mt-2">- Malcolm X</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {user ? (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome back, {user.username}!
                </h2>
                <p className="text-lg text-gray-600">
                  Continue your reading journey and discover new knowledge
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-center text-gray-900 mb-6">Favorite Books</h3>
                  <FavoriteBooks />
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Add New Book</h3>
                  <BookForm />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-12">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Reading Journey</h3>
                  <p className="text-lg text-gray-600 mb-8">
                    Sign up immediately to monitor your reading personally and unlock all features
                  </p>
                </div>
                <div className="space-y-4">
                  <a href="/register" className="block w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300">
                    Get Started Free
                  </a>
                  <a href="/login" className="block w-full border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-lg font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition duration-300">
                    Already have an account? Sign In
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Education Tracker?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the tools and features that make tracking your reading journey effortless and enjoyable
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor your reading habits, set goals, and visualize your progress with detailed analytics and insights.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Curate Favorites</h3>
              <p className="text-gray-600 leading-relaxed">
                Build your personal library of favorite books and create custom collections for easy organization.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Discover New Books</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized recommendations based on your reading history and explore new genres and authors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Thousands of Readers</h2>
              <p className="text-lg text-gray-600">
                Be part of a growing community of book lovers and knowledge seekers
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white rounded-lg p-8 shadow-md">
                <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">Books Tracked</div>
              </div>
              <div className="text-center bg-white rounded-lg p-8 shadow-md">
                <div className="text-4xl font-bold text-green-600 mb-2">5K+</div>
                <div className="text-gray-600">Active Readers</div>
              </div>
              <div className="text-center bg-white rounded-lg p-8 shadow-md">
                <div className="text-4xl font-bold text-purple-600 mb-2">50K+</div>
                <div className="text-gray-600">Reading Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Reading Experience?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of readers who have already started their journey with Education Tracker
            </p>
            {!user && (
              <div className="space-x-4">
                <a href="/register" className="inline-block bg-white text-blue-600 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300">
                  Start Free Today
                </a>
                <a href="/login" className="inline-block border-2 border-white text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition duration-300">
                  Sign In
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;