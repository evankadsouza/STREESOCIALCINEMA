const connection = require('../config/db'); // Assuming you have a database configuration file
const changeDisplayToggleController = {};

changeDisplayToggleController.changeDisplayToggle = async (req,res) =>
{
    try {
        const {videoID, displayToggle, userResponseToggle} = req.body;
        const query = `UPDATE videoData SET displayToggle = CASE WHEN videoID = ${videoID} THEN ${displayToggle} ELSE displayToggle END, userResponseToggle = ${userResponseToggle}`;

        const results = await connection.query(query);
    
        console.log('both toggles updated successfully');
        if(results){
          return res.status(200).json({results});
        }
      } catch (error) {
        console.error('Error executing MySQL query:', error);
        return res.status(500).json({ error: 'both toggles not updated ' });
      }
};

module.exports = changeDisplayToggleController;

