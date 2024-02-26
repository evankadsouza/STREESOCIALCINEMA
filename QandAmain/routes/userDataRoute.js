const express = require('express');
const userDataController = require('../controllers/userDataController');

const userDataRoute = express.Router();

userDataRoute.get('/videoTable', userDataController.getVideoTable);

module.exports = userDataRoute;