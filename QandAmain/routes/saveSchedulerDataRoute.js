const express = require('express');
const saveSchedulerDataRoute = express.Router();
const saveSchedulerDataController = require('../controllers/saveSchedulerDataController');

saveSchedulerDataRoute.post('/saveSchedulerData', saveSchedulerDataController.saveSchedulerData);

module.exports = saveSchedulerDataRoute;

