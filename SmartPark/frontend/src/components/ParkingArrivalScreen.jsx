import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ParkingArrivalScreen() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  
  // Parking data with walking order
  const sections = [
    { 
      name: 'A', 
      spots: 8, 
      color: 'bg-blue-100',
      walkingOrder: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    { 
      name: 'B', 
      spots: 8, 
      color: 'bg-purple-100',
      walkingOrder: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    { 
      name: 'C', 
      spots: 8, 
      color: 'bg-teal-100',
      walkingOrder: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  ];

  const occupiedSpots = ['A-1', 'A-2', 'B-1', 'B-2', 'B-3', 'C-1'];
  
  // Auto-assign closest available slot
  const assignClosestSlot = () => {
    for (const section of sections) {
      for (const spotNum of section.walkingOrder) {
        const spotId = `${section.name}-${spotNum}`;
        if (!occupiedSpots.includes(spotId)) {
          return spotId;
        }
      }
    }
    return null;
  };

  const assignedSlot = assignClosestSlot();
  const captainDetails = {
    name: 'Captain Rahul Gupta',
    phone: '+91 987*5 *****',
    vehicle: 'MH-01-AB-1234',
    rating: '4.8 ★',
    status: 'On Duty'
  };

  const handleDone = () => {
    setShowConfirmation(true);
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  if (showConfirmation) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 justify-between">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
            <p className="text-black-600 font-semibold mb-6">
              Thanks for choosing SmartPark. Your vehicle is safely parked at spot {assignedSlot}.
            </p>
          </div>
        </div>
        <div className="bg-white border-t p-4">
          <button
            onClick={handleReturnHome}
            className="w-full py-3 bg-blue-900 hover:bg-indigo-700 text-white rounded-lg font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-blue-900">
          Parking Navigation - Spot {assignedSlot}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-2 md:p-4 relative">
        {/* Entrance Marker */}
        <div className="absolute left-4 md:left-16 top-4 md:top-8 z-20 bg-black text-white px-2 py-0.5 md:px-3 md:py-1 rounded flex items-center">
          <span className="text-xs md:text-sm">entrance</span>
        </div>

        {/* Parking Layout */}
        <div className="grid grid-cols-3 gap-2 md:gap-8 mt-12 md:mt-20 mb-8">
          {sections.map(section => (
            <div key={section.name} className={`p-2 md:p-4 rounded-lg ${section.color} relative`}>
              <h3 className="text-sm md:text-lg font-bold mb-2 md:mb-4 text-center">Section {section.name}</h3>
              <div className="grid grid-cols-1 gap-1 md:gap-2">
                {Array.from({length: section.spots}, (_, i) => {
                  const spotId = `${section.name}-${i+1}`;
                  const isAssigned = spotId === assignedSlot;
                  return (
                    <div 
                      key={spotId}
                      className={`p-1 md:p-2 rounded text-center font-medium relative text-xs md:text-base
                        ${isAssigned ? 
                          'bg-yellow-200 border-2 border-yellow-500 font-bold' :
                          'bg-white border border-gray-300'}`}
                    >
                      {spotId}
                      {isAssigned && (
                        <div className="absolute inset-0 border-2 border-dashed border-amber-700 rounded animate-pulse"></div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {section.name !== 'C' && (
                <div className="absolute right-0 inset-y-0 w-[1px] border-r border-dotted border-blue-400" />
              )}
            </div>
          ))}
        </div>

        {/* Captain Information Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mt-4 border border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-6 bg-blue-800 rounded-full mr-2"></span>
            Your Parking Captain
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Captain Name</p>
                <p className="font-medium">{captainDetails.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Contact Number</p>
                <a href={`tel:${captainDetails.phone}`} className="font-medium text-blue-600">
                  {captainDetails.phone}
                </a>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Vehicle Number</p>
                <p className="font-medium">{captainDetails.vehicle}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Rating</p>
                <p className="font-medium text-amber-600">{captainDetails.rating}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {captainDetails.status}
              </span>
            </div>
            <button 
              onClick={handleDone}
              className="mt-3 w-full py-2 bg-blue-900 hover:bg-indigo-700 text-white rounded-lg font-medium"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}