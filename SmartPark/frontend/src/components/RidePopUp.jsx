import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={() => {
                props.setRidePopUpPannel(false);
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-5">
            New Client Available
        </h3>
        <div className='flex items-center justify-between  mt-3 rounded-lg bg-yellow-400'>
            <div className='flex items-center gap-3'>
                <img className='rounded-full object-cover h-10 w-10' src='https://petapixel.com/assets/uploads/2019/02/aYmax6O3.jpg' alt=''/>
                <h5 className='text-lg font-medium'>Astha-kvt</h5>
            </div>
            <h4 className='text-lg font-semibold'>Dehradun</h4>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center'>
      <div className='w-full mt-5'>
            <div className='flex items-center gap-5 border-2 border-gray-300'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
                <h3 className='text-lg font-medium'>UK-562/11-7</h3>
                <p className='text-sm -mt-1 text-gray-600'>Clement town, Dehradun, Uttarakhand</p>
            </div>
            </div>

            <div className='flex items-center mt-3 gap-5 border-2 border-gray-300'>
            <i className="ri-id-card-fill"></i>
            <div>
                <h3 className='text-lg font-medium'>Astha kavtiyal</h3>
                <p className='text-sm -mt-1 text-gray-600'>Contact no: 95481*****</p>
            </div>
            </div>

            <div className='flex items-center mt-3 gap-5 border-2 border-gray-300'>
                <i className ="text-lg ri-map-pin-2-line"></i>
                <div>
                <h3 className='text-lg font-medium'>Route</h3>
                <p className='text-sm -mt-1 text-gray-600'>Dehradun to Delhi</p>
                </div>
            </div>
        </div>
        <div className='mt-5 flex w-full items-center justify-between'>
        <button onClick={()=>{
            props.setConfirmRidePopUp(true);
        }} className=' bg-blue-900 text-white font-semibold p-3 px-10 rounded-lg'>Accept</button>
        <button onClick={()=>{
            props.setRidePopUpPannel(false);
        }} className=' bg-gray-700 text-white font-semibold p-3 px-10 rounded-lg'>Ignore</button>
        </div>
        </div>
    </div>
  )
}

export default RidePopUp