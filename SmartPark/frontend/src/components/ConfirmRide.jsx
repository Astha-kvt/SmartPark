import React from 'react';

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0" onClick={() => {
            props.setConfirmRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm your Ride
      </h3>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <img className='h-20' src="https://th.bing.com/th/id/OIP.oRfBSGPGjvPVUh8SyVvJ-gHaGM?w=860&h=720&rs=1&pid=ImgDetMain" alt=""/>
      <div className='w-full mt-5'>
            <div className='flex items-center gap-5 border-2 border-gray-300'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-7</h3>
                <p className='text-sm -mt-1 text-gray-600'>Clement town, Dehradun, Uttarakhand</p>
            </div>
            </div>

            <div className='flex items-center gap-5 border-2 border-gray-300'>
            <i className="ri-id-card-fill"></i>
            <div>
                <h3 className='text-lg font-medium'>Subhash Pal</h3>
                <p className='text-sm -mt-1 text-gray-600'>Contact no: 892********</p>
            </div>
            </div>

            <div className='flex items-center gap-5 border-2 border-gray-300'>
            <i className ="text-lg ri-map-pin-2-line"></i>
            <div>
                <h3 className='text-lg font-medium'>Route</h3>
                <p className='text-sm -mt-1 text-gray-600'>Clock tower to Clement town</p>
            </div>
            </div>
      </div>
        <button onClick={()=>{
          props.setVehicleFound(true)
          props.setConfirmRidePanel(false)
          props.createRide()
        }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmRide;
