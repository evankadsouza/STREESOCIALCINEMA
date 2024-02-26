const schedulerData = require('../models/schedulerData');

const schedulerDataController = {
    getAllSchedulerData: async (req, res) => {
      try {
        const scheduler = await schedulerData.findAll();
        res.json(scheduler);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
  };
  
  module.exports = schedulerDataController;