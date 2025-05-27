import React from 'react'
import logo from '../assets/logo.png'
import bgImage from '../assets/Landing.png'
import parkingLot from '../assets/ParkingLayout.jpg'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className="h-screen w-full ">

      <div
        className="w-full flex flex-col justify-between items-center relative bg-cover bg-center aspect-[2/2] md:aspect-[2/1]"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >

        <div className="text-center px-6 mt-2 md:mt-5">
          <h1 className="text-black text-2xl md:text-4xl font-bold mb-2">SmartPark</h1>
          <h2 className="text-black text-lg md:text-2xl font-bold mb-2">Smart Parking, Simplified.</h2>
          <h3 className="text-black text-sm md:text-lg font-bold mb-3">Real-time parking management system</h3>
          <Link to="/login" className="inline-block bg-blue-900 hover:bg-blue-800 transition text-white py-2 px-4 md:py-3 md:px-6 rounded-3xl text-sm md:text-lg">
            Start With SmartPark
          </Link>
        </div>
      </div>

      {/* Bottom half with image + text side by side */}
      <div className="w-full bg-[#e9f8fd] flex flex-col md:flex-row items-center justify-center px-8 py-8 gap-8">

        {/* Text section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg px-8 py-6 rounded-lg">
          <h2 className="text-black font-bold text-3xl mb-4 text-center md:text-left">
            Experience hassle-free parking with real-time tracking!
          </h2>
          <p className="text-gray-700 text-center md:text-left">
            <span className="font-bold">SmartPark</span> is an intelligent parking management system that helps you find and manage parking spaces in real-time.
            With our user-friendly interface, you can easily locate available parking spots and get guided to your destination.
            No more circling around looking for parking — stay informed and plan your parking with confidence!
            Whether you're a regular parker or a visitor, SmartPark ensures a smooth and efficient parking experience!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Start
