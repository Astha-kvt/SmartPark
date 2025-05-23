import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'; 
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const CaptainHome = () => {
  const ridePopUpPannelRef = useRef(null);
  const ConfirmRidePopUpPannelRef = useRef(null);

  const [ridePopUpPannel, setRidePopUpPannel] = useState(true);
  const [ConfirmridePopUp, setConfirmRidePopUp] = useState(false);

  useGSAP(function() {
    if (ridePopUpPannel) {
      gsap.to(ridePopUpPannelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(ridePopUpPannelRef.current, { transform: 'translateY(100%)' });
    }
  }, [ridePopUpPannel]);

  useGSAP(function() {
    if (ConfirmridePopUp) {
      gsap.to(ConfirmRidePopUpPannelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(ConfirmRidePopUpPannelRef.current, { transform: 'translateY(100%)' });
    }
  }, [ConfirmridePopUp]);

  return (
    <div className='h-screen flex flex-col'>

      <div className='h-2/3'>
        <img
          className='h-full w-full object-cover'
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt="background gif"/>
      </div>

      <div className='h-3/5 p-6'>
        <CaptainDetails />
      </div>

      {/* Bottom Half: Info */}
      <div className='h-3/5'>
        <div
          ref={ridePopUpPannelRef}
          className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14 shadow-xl max-h-[80vh] overflow-y-auto">
          <RidePopUp setRidePopUpPannel={setRidePopUpPannel} setConfirmRidePopUp={setConfirmRidePopUp} />
        </div>
      </div>

      <div
        ref={ConfirmRidePopUpPannelRef}
        className="fixed w-full  h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14 ">
        <ConfirmRidePopUp setConfirmRidePopUp={setConfirmRidePopUp} setRidePopUpPannel={setRidePopUpPannel} />
      </div>
    </div>
  );
};

export default CaptainHome;
