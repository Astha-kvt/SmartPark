import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CaptainRiding = () => {
    const finishRidePannelRef = useRef(null)
    const [finishRidePannel, setfinishRidePannel] = useState(false)

    useGSAP(function() {
        if (finishRidePannel) {
          gsap.to(finishRidePannelRef.current, { transform: 'translateY(0)' });
        } else {
          gsap.to(finishRidePannelRef.current, { transform: 'translateY(100%)' });
        }
      }, [finishRidePannel]);

  return (
    <div className='h-screen'>
        <div className='fixed p-3 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src={logo} alt="logo" />
            <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow z-10'>
            <i className='text-lg font-medium ri-logout-box-r-line'></i>
            </Link>
        </div>

        <div className='h-4/5'>
        <img
          className='h-full w-full object-cover'
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt="background gif"/>
        </div>
        
        <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 rounded-t-2xl'
        onClick={()=>{
            setfinishRidePannel(true)
        }}>
            <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={() => {
                }}><i className="text-3xl text-gray-100 ri-arrow-up-wide-line"></i>
            </h5>
            <h4 className='text-xl font-semibold'>4 KM Away</h4>
            <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete ride</button>
        </div>

        <div ref={finishRidePannelRef}
            className="fixed w-full h-[75vh] z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14 ">
            <FinishRide setfinishRidePannel={setfinishRidePannel}/>
        </div>

    </div>
  )
}

export default CaptainRiding