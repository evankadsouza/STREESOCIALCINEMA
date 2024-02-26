const express = require('express');
const videoTableController = require('../controllers/videoTableController');

const videoTableRouter = express.Router();

videoTableRouter.get('/videoTable', videoTableController.getVideoTable);

module.exports = videoTableRouter;