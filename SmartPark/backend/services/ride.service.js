
const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');

async function getdis(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    return distanceTime;
   
    };

module.exports.createRide = async ({user,pickup,destination}) => {
    if (!user || !pickup || !destination) {
        throw new Error('All Fields are required');
    }
    const distanceTime = await getdis(pickup, destination);
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        distance: distanceTime.distance.value, // in meters
        duration: distanceTime.duration.value  // in second
    });
    return ride;
}
