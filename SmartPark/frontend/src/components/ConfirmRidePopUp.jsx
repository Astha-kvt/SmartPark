import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CaptainParkingScreen() {
  const [assignedSlot, setAssignedSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isCalculating, setIsCalculating] = useState(true);
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

  const occupiedSpots = ['A-1', 'A-2', 'A-4' , 'A-8' , 'B-1', 'B-2', 'B-3', 'C-1'];

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

  useEffect(() => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    const timer = setTimeout(() => {
      const slot = assignClosestSlot();
      setAssignedSlot(slot);
      setIsCalculating(false);
      
      if (!slot) {
        alert("No available parking slots");
        navigate('/captain');
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleManualAssign = (spotId) => {
    if (!occupiedSpots.includes(spotId)) {
      setAssignedSlot(spotId);
    }
  };

  const handleConfirmAssignment = () => {
    setShowConfirmation(true);
  };

  const handleReturnToDashboard = () => {
    navigate('/');
  };

  if (showConfirmation) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 justify-between">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Slot Assigned!</h2>
            <p className="text-black-600 font-semibold mb-6">
              Successfully assigned parking spot <span className="font-bold">{assignedSlot}</span> to your client.
            </p>
          </div>
        </div>
        <div className="bg-white border-t p-16">
          <button
            onClick={handleReturnToDashboard}
            className="w-full py-3  bg-blue-900 hover:bg-indigo-700 text-white rounded-lg font-medium"
          >
            Return to Dashboard
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
          {isCalculating ? "Calculating Best Slot..." : `Assign Parking Slot`}
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
                  const isOccupied = occupiedSpots.includes(spotId);
                  
                  return (
                    <div 
                      key={spotId}
                      className={`p-1 md:p-2 rounded text-center font-medium relative text-xs md:text-base transition-all
                        ${isCalculating ? 'opacity-70' : ''}
                        ${isAssigned ? 'bg-yellow-200 border-2 border-yellow-500 font-bold animate-pulse' :
                          isOccupied ? 'bg-red-100 border border-red-300' :
                          'bg-white border border-gray-300 hover:bg-gray-100 cursor-pointer'}`}
                      onClick={() => !isCalculating && !isOccupied && handleManualAssign(spotId)}
                    >
                      {spotId}
                      {isAssigned && (
                        <div className="absolute inset-0 border-2 border-dashed border-amber-700 rounded"></div>
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

        {/* Client Information Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mt-4 border border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-6 bg-blue-800 rounded-full mr-2"></span>
            Client Details
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Client Name</p>
                <p className="font-medium">Astha-kvt</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Contact Number</p>
                <p className="font-medium text-blue-600">95481*****</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Vehicle Number</p>
                <p className="font-medium">562/11-7</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Route</p>
                <p className="font-medium">Dehradun to Delhi</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <button 
              onClick={handleConfirmAssignment}
              disabled={!assignedSlot || isCalculating}
              className={`w-full py-2 rounded-lg font-medium transition-colors
                ${(!assignedSlot || isCalculating) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-900 hover:bg-indigo-700 text-white'}`}
            >
              {isCalculating ? 'Calculating...' : assignedSlot ? `Assign Slot ${assignedSlot}` : 'Select a Slot'}
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isCalculating && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-xs">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-800 mx-auto mb-4"></div>
            <p className="font-medium">Finding optimal parking spot</p>
            <p className="text-sm text-gray-600 mt-1">Analyzing closest available slot...</p>
          </div>
        </div>
      )}
    </div>
  );
}