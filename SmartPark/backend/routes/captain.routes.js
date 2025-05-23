const express = require('express');
const router = express.Router();
const captainController = require('../controller/captain.controller');
const { validateCaptain } = require('../validators/captain.validator');
const { authCaptain } = require('../middlewares/auth.middleware'); 

router.get('/profile', authCaptain, captainController.getCaptainProfile);
router.post('/register', validateCaptain, captainController.registerCaptain);
router.post('/login', validateCaptain, captainController.loginCaptain);
router.post('/logout', captainController.logoutCaptain);


module.exports = router;