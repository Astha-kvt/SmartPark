import React from 'react'
import { Link } from 'react-router-dom';


const Riding = () => {
  return (
    <div className='h-screen flex flex-col'>
      {/* Fixed Top Left Home Icon */}
      <Link to='/Home' className='fixed top-4 right-2 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow z-10'>
        <i className='text-lg font-medium ri-home-2-line'></i>
      </Link>

      {/* Top Half: Map */}
      <div className='h-1/2'>
        <img
          className='h-full w-full object-cover'
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt="background gif"
        />
      </div>

      {/* Bottom Half: Info */}
      <div className='h-1/2 bg-white p-4 flex flex-col justify-between rounded-t-lg shadow-lg'>
        {/* Bus Info Header */}
        <div className='flex items-center justify-between'>
          <img
            className='h-12 w-12 rounded-md'
            src="https://th.bing.com/th/id/OIP.oRfBSGPGjvPVUh8SyVvJ-gHaGM?w=860&h=720&rs=1&pid=ImgDetMain"
            alt="bus"
          />
          <div className='text-right'>
            <h2 className='text-lg font-semibold'>Subhash Pal</h2>
            <h4 className='text-xl font-bold -mt-1'>UK07 AB 2098</h4>
            <p className='text-sm text-gray-600'>College bus</p>
          </div>
        </div>

        {/* Details */}
        <div className='space-y-2'>
          <div className='flex items-center gap-3 border p-2 rounded-md'>
            <i className="ri-map-pin-user-fill text-green-600"></i>
            <div>
              <h3 className='text-base font-medium'>562/11-7</h3>
              <p className='text-sm text-gray-600'>Clement town, Dehradun</p>
            </div>
          </div>

          <div className='flex items-center gap-3 border p-2 rounded-md'>
            <i className="ri-id-card-fill text-blue-600"></i>
            <div>
              <h3 className='text-base font-medium'>Subhash Pal</h3>
              <p className='text-sm text-gray-600'>Contact no: 892********</p>
            </div>
          </div>

          <div className='flex items-center gap-3 border p-2 rounded-md'>
            <i className="ri-map-pin-2-line text-red-600"></i>
            <div>
              <h3 className='text-base font-medium'>Route</h3>
              <p className='text-sm text-gray-600'>Clock tower to Clement town</p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button className='w-full bg-green-600 text-white font-semibold mt-2 py-2 rounded-md hover:bg-green-700 transition'>
          Make a payment
        </button>
      </div>
    </div>
  )
}

export default Riding
