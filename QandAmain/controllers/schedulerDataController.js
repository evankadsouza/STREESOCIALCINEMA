const connection = require('../config/db'); // Assuming you have a database configuration file
const schedulerData = require('../models/schedulerData');

const schedulerDataController = {
    getAllSchedulerData: async (req, res) => {
      try {
        const query = 'SELECT `scheduler_id`, `theatre_id`, `start_date`, `slot_index`, `video_links` FROM `schedulerData` AS `schedulerData`';
        const scheduler = await connection.query(query);
        if(scheduler){
          console.log("scheduler",scheduler)
            return res.status(200).json({ scheduler });
    }
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    return res.status(500).json({ error: 'Error retieving data from schedulerData' });
  }
    },
  };
  
  module.exports = schedulerDataController;