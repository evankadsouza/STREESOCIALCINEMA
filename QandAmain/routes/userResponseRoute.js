const express = require('express');
const userResponseController = require('../controllers/userResponseController');

const userResponseRoute = express.Router();

userResponseRoute.get('/getUserResponse', userResponseController.getUserResponses);

module.exports = userResponseRoute;