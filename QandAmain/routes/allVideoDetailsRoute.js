const express = require('express');
const allVideoDetailsController = require('../controllers/allVideoDetailsController');

const allVideoDetailsRoute = express.Router();

allVideoDetailsRoute.get('/allVideoDetails', allVideoDetailsController.getAllVideoDetails);

module.exports = allVideoDetailsRoute;