
const mongoose= require('mongoose');

const rideSchema=new mongoose.Schema({    
    //properties of rides
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
       
    },
    pickup:{
        type: String,
        required: true,
    },
    destination:{
        type: String,
        required: true,
    },
// when ride is created but not accepted by captain
    status:{
        type: String,
        enum: ['pending', 'accepted', 'ongoing','completed', 'cancelled'],
        default: 'pending',
    },
    //duration taken in seconds
   duration:{
       type: Number,
       
   },
//Distance covered in metres
   distance:{
        type: Number,
        
    },
    signature:{
        type: String,
        
    },

})
module.exports=mongoose.model('Ride',rideSchema);
