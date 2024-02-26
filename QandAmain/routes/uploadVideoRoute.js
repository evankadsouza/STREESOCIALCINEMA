const express = require('express');
const uploadVideoRoute = express.Router()
const uploadVideoController = require('../controllers/uploadVideoController');

// Define the route for uploading a video
uploadVideoRoute.post('/uploadVideo', uploadVideoController.uploadVideo);

module.exports = uploadVideoRoute;
