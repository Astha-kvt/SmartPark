const captainModel = require('../models/captain.model');
const blackListTokenModel = require('../models/blackListToken.model');
const { validationResult } = require('express-validator');

module.exports = {
  registerCaptain: async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 
    try {
      const { fullname, email, password } = req.body;
      
      const hashedPassword = await captainModel.hashPassword(password);
      const captain = await captainModel.create({
        fullname,
        email,
        password: hashedPassword
      });

      const token = captain.generateAuthToken();
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      
      res.status(201).json({ 
        captain: captain.toObject({ getters: true, versionKey: false }),
        token 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  loginCaptain: async (req, res) => {
    try {
      const { email, password } = req.body;
      const captain = await captainModel.findOne({ email }).select('+password');

      if (!captain || !(await captain.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = captain.generateAuthToken();
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      
      res.json({ 
        captain: captain.toObject({ getters: true, versionKey: false }),
        token 
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getCaptainProfile: async (req, res) => {
    try {
      const captain = await captainModel.findById(req.captain._id);
      res.json(captain);
    } catch (error) {
      res.status(404).json({ message: 'Captain not found' });
    }
  },

  logoutCaptain: async (req, res) => {
    try {
      const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      await blackListTokenModel.create({ token });
      res.clearCookie('token');
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Logout failed' });
    }
  }
};