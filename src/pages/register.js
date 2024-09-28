import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DynamicBackground from '../components/dynamic';
import Footer from '../components/footer';
import BACKEND_URL from '../context/bacurl';

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/track/register/`, data);
      console.log(response.data);
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <DynamicBackground />
      <div className='flex flex-col min-h-screen'>

    <div className="flex flex-col items-center justify-center h-screen">
      
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 p-6 bg-gray-100 rounded-lg shadow-md">
        <label htmlFor="username" className="block mb-2">Username:</label>
        <input
          name="username"
          type="text"
          autoComplete="off"
          {...register("username", { required: "Required" })}
          className="w-full py-2 px-4 mb-4 bg-white border border-gray-300 rounded-lg"
        />
        {errors.username && <p className="text-red-500">Username is required</p>}

        <label htmlFor="email" className="block mb-2">Email:</label>
        <input
          name="email"
          type="email"
          autoComplete="off"
          {...register("email", { required: "Required" })}
          className="w-full py-2 px-4 mb-4 bg-white border border-gray-300 rounded-lg"
        />
        {errors.email && <p className="text-red-500">Email is required</p>}

        <label htmlFor="password" className="block mb-2">Password:</label>
        <input
          name="password"
          type="password"
          autoComplete="off"
          {...register("password", { required: "Required" })}
          className="w-full py-2 px-4 mb-4 bg-white border border-gray-300 rounded-lg"
        />
        {errors.password && <p className="text-red-500">Password is required</p>}

        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
    <Footer/>
    </div>
    </div>
  );
};

export default RegistrationForm;
