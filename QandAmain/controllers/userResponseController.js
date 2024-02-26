const userResponses = require('../models/userResponses');

const userResponseController = {
    getUserResponses: async (req, res) => {
        try {
            const query = 'SELECT userResponses.*, userData.*, videoData.correctOption, videoData.questionDesc FROM userResponses ' +
              'INNER JOIN userData ON userResponses.userID = userData.userID ' +
              'INNER JOIN videoData ON userResponses.questionTypeID = videoData.questionTypeID ' +
        'WHERE userResponses.questionTypeID = videoData.questionTypeID';

        //const query = 'SELECT * FROM userResponses';
      
            const result = await userResponses.sequelize.query(query, { type: userResponses.sequelize.QueryTypes.SELECT });
            return res.status(200).json({ result });
          }   catch (error) {
            console.error('Error executing getUserResponses query:', error);
            return res.status(500).json({ error: 'Error retrieving user responses. Please try again.' });
          }
      },
  };

  
  module.exports = userResponseController;