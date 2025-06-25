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
              Your complete learning management system for organizing books, tracking progress, and building structured educational content
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
                  Continue organizing your educational journey and discover new knowledge
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-center text-gray-900 mb-6">Community Favorite Books</h3>
                  <FavoriteBooks />
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Add New Book to Library</h3>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Educational Journey</h3>
                  <p className="text-lg text-gray-600 mb-8">
                    Join thousands of learners who organize their books, create structured lessons, and track their educational progress
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

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Education Tracker Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple 4-step process to organize your entire educational library and create structured learning experiences
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -ml-8"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Organize Your Library</h3>
                <p className="text-gray-600 text-sm">
                  Add books to three categories: Present (currently reading), Future (want to read), and Past (completed)
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-green-600">2</span>
                  </div>
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -ml-8"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Create Chapters</h3>
                <p className="text-gray-600 text-sm">
                  Break down your books into organized chapters for structured learning and better comprehension
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -ml-8"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Build Lessons</h3>
                <p className="text-gray-600 text-sm">
                  Create detailed lessons within each chapter, turning your books into comprehensive learning modules
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl font-bold text-orange-600">4</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Track & Discover</h3>
                <p className="text-gray-600 text-sm">
                  Get personalized recommendations, mark favorites, and track your learning progress across all subjects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Learning Management</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to transform your reading habit into a structured, trackable educational experience
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Book Organization */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Library Organization</h3>
                <p className="text-gray-600 mb-4">
                  Categorize books into Present, Future, and Past libraries. Track what you're reading now, plan future reads, and maintain a record of completed books.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ Three-category system<br/>
                  ✓ Author & genre tracking<br/>
                  ✓ Personal library dashboard
                </div>
              </div>

              {/* Chapter Management */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Chapter-Based Structure</h3>
                <p className="text-gray-600 mb-4">
                  Break down complex books into manageable chapters. Create numbered sections that help you organize and navigate through your educational content systematically.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ Numbered chapter system<br/>
                  ✓ Book-chapter hierarchy<br/>
                  ✓ Sequential organization
                </div>
              </div>

              {/* Lesson Creation */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Interactive Lesson Builder</h3>
                <p className="text-gray-600 mb-4">
                  Transform chapters into detailed lessons with rich content. Create educational modules that turn any book into a structured learning curriculum.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ Rich lesson content<br/>
                  ✓ Chapter-lesson linking<br/>
                  ✓ Educational modules
                </div>
              </div>

              {/* Favorites & Recommendations */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Favorites System</h3>
                <p className="text-gray-600 mb-4">
                  Mark your favorite books and discover what the community loves. Get personalized recommendations based on your reading patterns and preferences.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ Personal favorites<br/>
                  ✓ Community recommendations<br/>
                  ✓ Smart suggestions
                </div>
              </div>

              {/* Progress Tracking */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Track your reading habits with detailed analytics. Discover your most-read genres and authors, and get insights to optimize your learning journey.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ Reading pattern analysis<br/>
                  ✓ Genre & author insights<br/>
                  ✓ Progress visualization
                </div>
              </div>

              {/* Secure Authentication */}
              <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Personal</h3>
                <p className="text-gray-600 mb-4">
                  Your educational data is protected with JWT authentication. Password recovery options ensure you never lose access to your learning progress.
                </p>
                <div className="text-sm text-gray-500">
                  ✓ JWT authentication<br/>
                  ✓ Password recovery<br/>
                  ✓ Personal data protection
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Empowering Learners Worldwide</h2>
              <p className="text-lg text-gray-600">
                Join a growing community of educators, students, and lifelong learners who are transforming their reading into structured education
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">15K+</div>
                <div className="text-gray-600 text-sm">Books Organized</div>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">8K+</div>
                <div className="text-gray-600 text-sm">Chapters Created</div>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">25K+</div>
                <div className="text-gray-600 text-sm">Lessons Built</div>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">5K+</div>
                <div className="text-gray-600 text-sm">Active Learners</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Reading Into Structured Learning?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of learners who have organized their libraries, created educational content, and accelerated their knowledge acquisition
            </p>
            {!user && (
              <div className="space-x-4">
                <a href="/register" className="inline-block bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300">
                  Start Your Educational Journey
                </a>
                <a href="/login" className="inline-block border-2 border-gray-600 text-gray-300 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-800 hover:text-white transition duration-300">
                  Sign In to Continue
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