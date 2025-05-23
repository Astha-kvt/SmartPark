import React from 'react'

const CaptainDetails = () => {
  return (
    <div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-between gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src='https://img.freepik.com/premium-photo/professional-bus-driver-solid-blue-background_1077802-90538.jpg' alt=''/>
            <h4 className='text-lg font-medium'>Epsilon Not</h4>
          </div>
        </div>
        <div className='flex mt-3 p-6 justify-center gap-5 items-start rounded-xl bg-gray-100 '>
          <div className='text-center'>
            <i className="text-3xl font-thin ri-time-line"></i>
            <h5 className='text-lg font-medium'>8</h5>
            <p className='text-sm font-gry-600'>Hours On duty</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl font-thin ri-speed-up-line"></i>
            <h5 className='text-lg font-medium'>Section A</h5>
            <p className='text-sm font-gry-600'>Desk-2</p>
          </div>
          <div className='text-center'>
            <i className="text-3xl font-thin ri-book-marked-line"></i>
            <h5 className='text-lg font-medium'>3</h5>
            <p className='text-sm font-gry-600'>Highlights</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails