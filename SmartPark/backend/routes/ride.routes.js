const express=require('express');
const router=express.Router();

const {body, query}=require('express-validator')//validator for userud,pickup location,destination
const rideController=require('../controller/ride.controller')//controller for ride
const authMiddleware=require('../middlewares/auth.middleware')//middleware for authentication

router.post('/create',
    authMiddleware.authUser, // middleware to check if user is authenticated
    //body('userId').isString().isLength({min:24,max:24}).withMessage('userId must be 24 characters long'),
    body('pickup').isString().isLength({min:3}).withMessage('Invalid Picking Address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid Destination Address'),
    rideController.createRide
)




module.exports=router;