import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import ParkingMap from '../components/ParkingMap';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const geocodeAddress = async (address) => {
    if (address.toLowerCase().includes("delhi")) {
      return { lat: 28.6139, lng: 77.2090 }; 
    }
    return null;
  };

  // Convert destination to coordinates when both fields are filled
  useEffect(() => {
    if (destination && pickup) {
      geocodeAddress(destination).then(setDestinationCoords);
    }
  }, [destination, pickup]);

  // Animate panel
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '70%' });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: '0%' });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  return (
    <div className="h-screen relative overflow-hidden">
      
      {/* Background Image */}
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt="background"
        />
      </div>

      {/* Input Panel */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-6 top-6 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find Parking lot</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="line absolute h-16 w-2 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter your Source"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        {/* Location Search Panel */}
        <div ref={panelRef} className="bg-white h-0 overflow-hidden">
          <LocationSearchPanel
            panelOpen={panelOpen}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
          />
        </div>

        {/* Show Map Only When Coordinates Exist */}
        {destinationCoords && (
          <div className="h-[100%] w-full">
            <ParkingMap destinationCoords={destinationCoords} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;