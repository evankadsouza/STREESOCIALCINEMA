const videoData = require('../models/videoData');

const videoDataController = {
    getVideoTable: async (req, res) => {
      try {
        const videodata = await videoData.findAll();
        res.json(videodata);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
  };
  
  module.exports = videoDataController;