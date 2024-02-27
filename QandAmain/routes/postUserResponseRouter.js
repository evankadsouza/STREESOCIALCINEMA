const express = require('express');
const postUserResponseController = require('../controllers/postUserResponseController');

const postUserResponseRoute = express.Router();

postUserResponseRoute.post('/userResponseData', postUserResponseController.postUserResponse);

module.exports = postUserResponseRoute;