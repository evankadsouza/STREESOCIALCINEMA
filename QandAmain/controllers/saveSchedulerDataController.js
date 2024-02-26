const connection = require('../config/db'); // Assuming you have a database configuration file
const saveSchedulerDataController = {};


saveSchedulerDataController.saveSchedulerData = async (req,res) =>
{
//   try{
//     const schedulerData = req.body;
//     console.log(schedulerData.video_links)
//     schedulerData.video_links = JSON.stringify(schedulerData.video_links);

//     console.log(schedulerData)

//     const query = `INSERT INTO schedulerData SET theatre_id = '${schedulerData.theatre_id}', start_date = '${schedulerData.start_date}', slot_index = ${schedulerData.slot_index}, video_links='${schedulerData.video_links}'`;

   
//     const values = schedulerData;

    
//   const results = await connection.query(query, (error) => {
//     if (error) {
//       console.error('Error executing MySQL query:', error);
//       return res.status(500).json({ error: 'Error inserting data into videoTable' });
//     }
//     else{
//         console.log('Data inserted successfully into schedulerData');
//         return res.status(200).json('Data inserted successfully into schedulerData');
//     }
//   });
// }catch(error){
  try {
    const schedulerData = req.body;
    console.log(schedulerData.video_links);
    schedulerData.video_links = JSON.stringify(schedulerData.video_links);

    console.log(schedulerData);

    const query = `INSERT INTO schedulerData SET theatre_id = '${schedulerData.theatre_id}', start_date = '${schedulerData.start_date}', slot_index = ${schedulerData.slot_index}, video_links='${schedulerData.video_links}'`;

    const results = await connection.query(query);

    console.log('Data inserted successfully into schedulerData');
    if(results){
      return res.status(200).json('Data inserted successfully into schedulerData');
    }
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    return res.status(500).json({ error: 'Error inserting data into schedulerData' });
  }
};






module.exports = saveSchedulerDataController;