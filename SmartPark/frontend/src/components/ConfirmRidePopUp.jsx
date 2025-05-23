import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ParkingArrivalScreen() {
  const [showPath, setShowPath] = useState(false);
  const [assignedSlot, setAssignedSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const sections = [
    { name: 'A', spots: 8, color: 'bg-blue-100' },
    { name: 'B', spots: 9, color: 'bg-purple-100' },
    { name: 'C', spots: 8, color: 'bg-teal-100' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowPath(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSlotClick = (spotId) => {
    setAssignedSlot(spotId);
  };

  const handleDone = () => {
    if (!assignedSlot) {
      alert("Please select a parking slot first");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    navigate('/');
  };

  if (showConfirmation) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 justify-between p-4">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Slot Assigned!</h2>
            <p className="text-black-600 font-medium mb-6">
              You've assigned parking spot <span className="font-bold">{assignedSlot}</span> to your client.
            </p>
          </div>
          <button
          onClick={handleConfirm}
          className="w-full mt-40 py-3 bg-blue-900 text-white rounded-lg font-medium"
        >
          Confirm and Return
        </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 border-b">
        <h1 className="text-xl font-bold text-blue-900">
          Assign a Parking Slot
        </h1>
      </div>

      {/* Main Content - Fixed height container */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Entrance Marker */}
        <div className="absolute left-4 top-4 z-20 bg-black text-white px-2 py-1 rounded flex items-center">
          <span className="text-xs">entrance</span>
        </div>

        {/* Parking Layout - Compact design */}
        <div className="grid grid-cols-3 gap-2 mt-8">
          {sections.map(section => (
            <div key={section.name} className={`p-2 rounded-lg ${section.color} relative`}>
              <h3 className="text-sm font-bold mb-2 text-center">Section {section.name}</h3>
              <div className="grid grid-cols-1 gap-1">
                {Array.from({length: section.spots}, (_, i) => {
                  const spotId = `${section.name}-${i+1}`;
                  const isAssigned = spotId === assignedSlot;
                  return (
                    <button
                      key={spotId}
                      onClick={() => handleSlotClick(spotId)}
                      className={`p-1 rounded text-center font-medium relative text-xs
                        ${isAssigned ? 
                          'bg-amber-400 border-2 border-amber-600' :
                          'bg-white border border-gray-300 hover:bg-gray-100'}`}
                    >
                      {spotId}
                      {isAssigned && (
                        <div className="absolute inset-0 border-2 border-dashed border-amber-700 rounded animate-pulse"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Client Information - Compact layout */}
        <div className="bg-white rounded-lg shadow-sm p-4 mt-4 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-6 bg-blue-800 rounded-full mr-2"></span>
            Client Details
          </h2>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-gray-500">Name</p>
              <p className="font-medium">Astha-kvt</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Contact</p>
              <p className="font-medium">95481*****</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Vehicle</p>
              <p className="font-medium">562/11-7</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Route</p>
              <p className="font-medium text-blue-800">Dehradun to Delhi</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <button 
              onClick={handleDone}
              disabled={!assignedSlot}
              className={`w-full py-2 text-white rounded-lg font-medium
                ${assignedSlot ? 'bg-blue-900 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              {assignedSlot ? `Assign Slot ${assignedSlot}` : 'Select a Slot First'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}