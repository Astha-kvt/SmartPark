import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import logo from '../assets/logo.png';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password
    };
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token); 
        navigate('/home');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert("Signup failed: " + (error.response?.data?.message || "Internal server error"));
    }
  };

  return (
    <div className='flex flex-col justify-between h-screen p-4 bg-gray-50'>
      {/* Top Section - Logo and Form */}
      <div className='flex-1 flex flex-col justify-center'>
        <img className="w-24 mx-auto mb-2" src={logo} alt="logo" />
        <h1 className='text-2xl font-bold text-center mb-4'>Welcome, User!</h1>
        
        <div className='bg-white p-4 rounded-lg shadow-sm max-w-md w-full mx-auto'>
          <form onSubmit={submitHandler} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>What's your name?</label>
              <div className='flex gap-2 w-full'>
                <input
                  required
                  className='flex-1 p-2 border rounded w-1/2'
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='First Name'
                />
                <input
                  required
                  className='flex-1 p-2 border rounded w-1/2'
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Last Name'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Email</label>
              <input
                required
                className='w-full p-2 border rounded'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='example@email.com'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-1'>Password</label>
              <input
                required
                className='w-full p-2 border rounded'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
              />
            </div>

            <button
              type="submit"
              className='w-full bg-black text-white py-2 rounded font-medium'
            >
              Create Account
            </button>

            <p className='text-center text-sm'>
              Already registered? <Link to='/login' className='text-blue-600'>Login here</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Bottom Section - Footer and Captain Login */}
      <div className='pb-4'>
        <p className='text-xs text-gray-500 text-center mb-2'>
          By proceeding, you consent to get SMS messages from Bus-Buddy
        </p>
        <Link
          to='/captain-login'
          className='block bg-blue-900 text-white text-center py-2 rounded font-medium'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;