import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import BACKEND_URL from '../context/bacurl';

const PasswordResetComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        e.preventDefault();
        axios.post(`${BACKEND_URL}/track/password-recovery/`, { 
            username, 
            email, 
            new_password: newPassword 
        })
        .then(response => {
            setMessage(response.data.message);
            setError('');
            navigate('/login');
        })
        .catch(error => {
            setMessage('');
            setError(error.response?.data?.error || 'An error occurred. Please try again.');
        });
    };

    return (
        <div className="min-h-screen bg-white">
          
            <Header />
            
            {/* Hero Section */}
            <div className="relative pt-20 pb-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Reset Your <span className="text-blue-600">Password</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light leading-relaxed">
                            Enter your details to secure your account
                        </p>
                    </div>
                </div>
            </div>

            {/* Password Reset Form */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Password Recovery</h2>
                                <p className="text-gray-600">Please fill in your account details</p>
                            </div>

                            {message && (
                                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                                    <p className="text-green-600">{message}</p>
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                    <p className="text-red-600">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleResetPassword} className="space-y-6">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your new password"
                                        required
                                        minLength="8"
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Remember your password?{' '}
                                    <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                                        Sign in
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PasswordResetComponent;