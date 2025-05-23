import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ParkingArrivalScreen from './ParkingArrivalScreen'; 

// Fix missing marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ParkingMap = ({ source, destination }) => {
  const sourceCoords = { lat: 28.6139, lng: 77.2090 };
  const destinationCoords = { lat: 28.6139, lng: 77.2090 };

  // Parking data
  const parkingSlots = [
    { id: 1, name: 'DC Private Parking', lat: 28.6139, lng: 77.2090, slots: 3, price: 50 },
    { id: 2, name: 'Saints Laurenz Parking', lat: 28.6145, lng: 77.2100, slots: 5, price: 40 },
    { id: 3, name: 'The Ordinarys', lat: 28.6120, lng: 77.2080, slots: 2, price: 60 }
  ];

  // Haversine formula to calculate distance in km
  const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Filter and sort nearby parking within 2 km
  const nearbyParking = parkingSlots
    .map(p => ({
      ...p,
      distance: getDistanceInKm(destinationCoords.lat, destinationCoords.lng, p.lat, p.lng)
    }))
    .filter(p => p.distance <= 2)
    .sort((a, b) => a.distance - b.distance);

  // State
  const [selectedParking, setSelectedParking] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showArrival, setShowArrival] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    hours: 1,
    vehicle: 'car',
    payment: 'cash'
  });

  const handleConfirmBooking = () => {
    setShowArrival(true);
    setShowBooking(false);
  };

  if (showArrival && selectedParking) {
    return <ParkingArrivalScreen parking={selectedParking} />;
  }

  return (
    <div className="relative h-screen">
      {/* Map (Top 60%) */}
      <div className="h-[60vh] relative z-0">
        <MapContainer center={destinationCoords} zoom={15} className="h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {selectedParking && (
            <Polyline 
              positions={[
                [sourceCoords.lat, sourceCoords.lng],
                [selectedParking.lat, selectedParking.lng],
                [destinationCoords.lat, destinationCoords.lng]
              ]} 
              color="blue"
              weight={3}
            />
          )}

          {nearbyParking.map(park => (
            <Marker 
              key={park.id} 
              position={[park.lat, park.lng]}
              eventHandlers={{ click: () => setSelectedParking(park) }}
            >
              <Popup>{park.name} - {park.slots} slots</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Parking List (Bottom 40%) */}
      <div className="h-[40vh] overflow-y-auto bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-3">Available Parking</h2>
        
        {nearbyParking.map(park => (
          <div 
            key={park.id}
            className={`p-3 mb-2 rounded-lg cursor-pointer transition-all ${
              selectedParking?.id === park.id 
                ? 'bg-blue-100 border-l-4 border-blue-500' 
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => setSelectedParking(park)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{park.name}</h3>
                <p className="text-sm text-gray-600">{park.slots} slots available</p>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{park.price}/hr</p>
                <button
                  className="mt-1 px-3 py-1 bg-blue-900 text-white text-sm rounded hover:bg-blue-700 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedParking(park);
                    setShowBooking(true);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBooking && selectedParking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Book {selectedParking.name}</h3>
              <p className="text-gray-600 mb-4">₹{selectedParking.price} per hour</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Duration (hours)</label>
                  <select 
                    value={bookingDetails.hours}
                    onChange={(e) => setBookingDetails({...bookingDetails, hours: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    {[1, 2, 3, 4, 5].map(h => (
                      <option key={h} value={h}>{h} hour{h !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Vehicle Type</label>
                  <select 
                    value={bookingDetails.vehicle}
                    onChange={(e) => setBookingDetails({...bookingDetails, vehicle: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="suv">SUV</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-1">Payment Method</label>
                  <select 
                    value={bookingDetails.payment}
                    onChange={(e) => setBookingDetails({...bookingDetails, payment: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowBooking(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmBooking}
                  className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-green-700"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingMap;
