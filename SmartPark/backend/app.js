const dotenv=require('dotenv'); //load the environment variables
dotenv.config();

const express = require('express');
const cors = require('cors'); // allows controlled access to resources on a server from a different origin, enabling web applications to make API requests to external services.
const app = express();
const cookieParser=require('cookie-parser'); // parses cookies attached to the client request object
const connectToDb = require('./db/db');
const userRoutes= require('./routes/user.routes');
const captainRoutes= require('./routes/captain.routes');

// Connect to database
connectToDb();

// CORS configuration
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()); // parses the cookies in the request and makes them available in req.cookies

// Routes
app.get('/',(req,res)=>{
    res.send("hello world");
});

app.use('/users',userRoutes);
app.use('/captains', captainRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports=app;