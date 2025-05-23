const mongoose = require('mongoose');


function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT, {
    }).then(() => {
        console.log('Connected to MongoDB successfully');
    }).catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit if cannot connect to database
    });
}


module.exports = connectToDb;