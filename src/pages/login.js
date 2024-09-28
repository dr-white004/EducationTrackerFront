import React, { useContext } from 'react';
import AuthContext from '../context/Authcontext';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import DynamicBackground from '../components/dynamic';

const Login = () => {
    const { loginUser, error } = useContext(AuthContext);

    return (
        <div>
            <DynamicBackground />
            <div className='flex flex-col min-h-screen'>
                <div className="flex flex-col items-center justify-center h-screen">
                    {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                    <form onSubmit={loginUser} className="mt-4 p-6 bg-gray-100 rounded-lg shadow-md">
                        <input
                            type="text"
                            name="username"
                            placeholder="Your name"
                            className="w-full py-2 px-4 mb-4 bg-white border border-gray-300 rounded-lg"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            className="w-full py-2 px-4 mb-4 bg-white border border-gray-300 rounded-lg"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </form>
                    <Link to="/reset" className="text-blue hover:text-gray-300 mr-6">Forgot Password</Link>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Login;
