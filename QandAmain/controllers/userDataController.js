const userData = require('../models/userData');

const userDataController = {
    getVideoTable: async (req, res) => {
      try {
        const user = await userData.findAll();
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
  };
  
  module.exports = userDataController;