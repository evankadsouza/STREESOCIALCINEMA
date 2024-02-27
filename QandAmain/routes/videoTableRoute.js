const express = require('express');
const videoTableController = require('../controllers/videoTableController');

const videoTableRouter = express.Router();

videoTableRouter.get('/allVideos', videoTableController.getVideoTable);

module.exports = videoTableRouter;