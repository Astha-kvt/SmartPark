import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        if (!data.captain || !data.token) {
          throw new Error("Invalid response structure");
        }

        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home', { replace: true });
        return;
      }
    } catch (error) {
      console.error('Signup failed:', error);
      if (error.response) {
        if (error.response.status === 400 && error.response.data?.code === 'E11000') {
          alert("This email is already registered. Please use a different email.");
        } else {
          alert(error.response.data?.message || "Registration failed");
        }
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <div className='flex flex-col justify-between h-screen p-4 bg-gray-50'>
      {/* Top Section */}
      <div className='flex-1 flex flex-col justify-center'>
        <img className="w-28 mx-auto mb-2" src={logo} alt="SmartPark Logo" />
        <h1 className='text-2xl font-bold text-center mb-6'>Welcome, Captain!</h1>

        <div className='bg-white p-6 rounded-xl shadow-sm max-w-md w-full mx-auto border border-gray-200'>
          <form onSubmit={submitHandler} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-2'>What's your name?</label>
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
              <label className='block text-sm font-medium mb-2'>Email</label>
              <input
                required
                className='w-full p-3 bg-gray-100 rounded-lg border border-gray-300'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='example@email.com'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>Password</label>
              <input
                required
                className='w-full p-3 bg-gray-100 rounded-lg border border-gray-300'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
              />
            </div>

            <button
              type="submit"
              className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors'
            >
              Create Account
            </button>

            <p className='text-center text-sm text-gray-600'>
              Already Registered? <Link to='/captain-login' className='text-blue-600 hover:underline'>Login Here</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='pb-4'>
        <p className='text-xs text-gray-500 text-center mb-3'>
          By proceeding, you consent to get SMS messages from SmartPark
        </p>
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

export default CaptainSignup;