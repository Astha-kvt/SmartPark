import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, {
        email,
        password
      });

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className='flex flex-col justify-between h-screen p-6 bg-gray-50'>
      {/* Top Section - Logo and Form */}
      <div className='flex-1 flex flex-col justify-center'>
        <img className="w-28 mx-auto mb-4" src={logo} alt="SmartPark Logo" />
        <h1 className='text-2xl font-bold text-center mb-6'>Welcome back, Captain!</h1>
        
        <div className='bg-white p-6 rounded-xl shadow-sm max-w-md w-full mx-auto border border-gray-200'>
          <form onSubmit={submitHandler} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-2'>Email</label>
              <input 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black'
                type="email" 
                placeholder='example@email.com'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>Password</label>
              <input 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-3 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black'
                type="password" 
                placeholder='••••••••'
              />
            </div>

            <button 
              type="submit"
              className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors'
            >
              Login
            </button>

            <p className='text-center text-sm text-gray-600'>
              Want to join the community? <Link to='/captain-signup' className='text-blue-600 hover:underline'>Register as a Captain</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Bottom Section - User Login */}
      <div className='pb-4'>
        <Link 
          to='/login'
          className='block bg-blue-900 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;