const videoTable = require('../models/videoTable');

const videoTableController = {
    getVideoTable: async (req, res) => {
      try {
        const video = await videoTable.findAll();
        res.json(video);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
  };
  
  module.exports = videoTableController;

  //controllers handle the specific requests and resp for the application