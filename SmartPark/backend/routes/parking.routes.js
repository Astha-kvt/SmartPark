import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ParkingArrivalScreen() {
  const [assignedSlot, setAssignedSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  // Enhanced parking data with exact distances
  const sections = [
    { 
      name: 'A', 
      spots: 8,
      baseDistance: 10, // meters from entrance
      color: 'bg-blue-100'
    },
    { 
      name: 'B', 
      spots: 9,
      baseDistance: 20,
      color: 'bg-purple-100'
    },
    { 
      name: 'C', 
      spots: 8,
      baseDistance: 30,
      color: 'bg-teal-100'
    }
  ];

  // Mock occupied spots - in real app, fetch from API
  const occupiedSpots = ['A-1', 'A-2', 'B-1', 'C-1'];

  // Enhanced auto-assignment algorithm
  const assignOptimalSlot = () => {
    const allSpots = sections.flatMap(section => 
      Array.from({length: section.spots}, (_, i) => ({
        id: `${section.name}-${i+1}`,
        distance: section.baseDistance + (i * 5), // Each spot adds 5 meters
        section: section.name
      }))
    );

    const availableSpots = allSpots.filter(spot => !occupiedSpots.includes(spot.id));
    
    if (availableSpots.length === 0) return null;
    
    // Sort by closest distance
    return availableSpots.sort((a, b) => a.distance - b.distance)[0].id;
  };

  // Auto-assign immediately on load
  useEffect(() => {
    const optimalSlot = assignOptimalSlot();
    if (optimalSlot) {
      setAssignedSlot(optimalSlot);
      // Auto-proceed to confirmation after 1.5 seconds
      const timer = setTimeout(() => setShowConfirmation(true), 1500);
      return () => clearTimeout(timer);
    } else {
      alert("No available parking slots");
      navigate('/');
    }
  }, []);

  // Confirmation view
  if (showConfirmation) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 p-4">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-center">
            <div className="text-4xl mb-4">🚗</div>
            <h2 className="text-xl font-bold mb-2">Parking Assigned Automatically</h2>
            <div className="text-lg bg-blue-100 p-3 rounded-lg mb-4">
              <span className="font-bold">{assignedSlot}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Closest available spot to entrance
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full py-2 bg-blue-800 text-white rounded-lg"
            >
              Confirm and Exit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main loading view
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-bold">Automated Parking System</h1>
        <p className="text-sm text-gray-500">Assigning optimal slot...</p>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {/* Visual loading indicator */}
        <div className="flex justify-center items-center h-full">
          <div className="animate-pulse text-center">
            <div className="text-4xl mb-4">🅿️</div>
            <p>Finding best available spot...</p>
            {assignedSlot && (
              <p className="mt-2 text-blue-800 font-medium">
                Selected: {assignedSlot}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}