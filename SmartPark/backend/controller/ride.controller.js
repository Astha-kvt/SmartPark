const rideService= require('../services/ride.service');

const{validationResult}=require('express-validator');     // checks for error in validation

module.exports.createRide=async(req,res)=>{
    const errors=validationResult(req); // checks for error in validation
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}); // returns the error in array format
    }
    
    const{userId,pickup,destination}=req.body; // destructuring the body of request
    try{
        const ride= await rideService.createRide({user: req.user._id,pickup,destination}); //created ride with following parameters
        return res.status(201).json({ride}); 
    }catch(err){
        return res.status(500).json({message:err.message}); 
    }
    
};