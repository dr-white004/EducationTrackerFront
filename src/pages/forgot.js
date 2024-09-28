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
    const navigate = useNavigate()

    const handleResetPassword = () => {
        axios.post(`${BACKEND_URL}/track/password-recovery/`, { username, email, new_password: newPassword })
            .then(response => {
                setMessage(response.data.message);
                setError('');
                navigate('/login')
            })
            .catch(error => {
                setMessage('');
                setError(error.response.data.error);
            });
    };

    return (
        <div>
            <Header />
            <div className='flex flex-col min-h-screen'>
                <div className="max-w-md mx-auto my-8 px-4 py-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Password Reset</h2>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 mb-2 rounded border" placeholder="Username" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 mb-2 rounded border" placeholder="Email" />
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-2 mb-2 rounded border" placeholder="New Password" />
                    <button onClick={handleResetPassword} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Reset Password</button>
                    {message && <p className="text-green-600 mt-2">{message}</p>}
                    {error && <p className="text-red-600 mt-2">{error}</p>}
                </div>
        <Footer/>
        </div>
        </div>
    );
};

export default PasswordResetComponent;
