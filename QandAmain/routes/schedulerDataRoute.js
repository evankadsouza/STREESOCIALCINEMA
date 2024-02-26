const express = require('express');
const schedulerDataController = require('../controllers/schedulerDataController');

const schedulerDataRoute = express.Router();

schedulerDataRoute.get('/allSchedulerData', schedulerDataController.getAllSchedulerData);

module.exports = schedulerDataRoute;