const express = require('express');
const videoDataController = require('../controllers/videoDataController');

const videoDataRouter = express.Router();

videoDataRouter.get('/videoTable', videoDataController.getVideoTable);

module.exports = videoDataRouter;