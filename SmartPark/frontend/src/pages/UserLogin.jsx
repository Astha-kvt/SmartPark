import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import logo from '../assets/logo.png';

const UserLogin = () => {
  const { setUser } = useContext(UserDataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const userData = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
  
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className='flex flex-col justify-between h-screen p-6 bg-gray-50'>
      {/* Top Section - Logo and Form */}
      <div className='flex-1 flex flex-col justify-center'>
        <img className="w-28 mx-auto mb-2" src={logo} alt="Bus Buddy Logo" />
        <h1 className='text-2xl font-bold text-center mb-6'>Welcome back, User!</h1>
        
        <div className='bg-white p-6 rounded-xl shadow-sm max-w-md w-full mx-auto border border-gray-200'>
          <form onSubmit={submitHandler} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>Email</label>
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
              <label className='block text-sm font-medium mb-1'>Password</label>
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

            <p className='text-center text-sm text-gray-600 mt-4'>
              New here? <Link to='/signup' className='text-blue-600 hover:underline'>Sign up</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Bottom Section - Captain Login */}
      <div className='pb-4'>
        <Link 
          to='/captain-login'
          className='block bg-blue-900 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;