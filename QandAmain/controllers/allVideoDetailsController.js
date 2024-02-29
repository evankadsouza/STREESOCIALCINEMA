const allVideoDetailsController = {}
const connection = require('../config/db')




allVideoDetailsController.getAllVideoDetails = async  (req,res) =>{
        
                 
           
try{
    const selectQuery = `SELECT DISTINCT displayToggle, userResponseToggle, videoID, videoDataID, imageURL, padX, padY, x, y, font, optionNumber, JSON_OBJECT('optionOne', optionOne, 'optionTwo', optionTwo, 'optionThree', optionThree, 'optionFour',optionFour,'optionFive',optionFive) AS options  FROM videoData`;
    const results = await connection.query(selectQuery)
    if(results[0]) {
        const data = results[0];
            // const videos = results.map(({displayToggle, userResponseToggle, videoID }) => {
            //   displayToggle,
            //   userResponseToggle,
            //   videoID
            // });
            res.status(200).json({ results });
          } else {
            res.status(404).json({ error: 'No videos found' });
          }
        
      }
catch(error){
    console.log("RRRRRRRR",error)
}         
};


module.exports = allVideoDetailsController;





// app.get('/api/allVideoDetails/',(req,res) => {
//     const selectQuery = 'SELECT displayToggle, userResponseToggle, videoID FROM videoData';
  
//     connection.query(selectQuery, (err, results) => {
//       if (err) {
//         console.error('Error querying database:', err);
//         res.status(500).json({ error: 'Error retrieving all videos' });
//       } else {
//         if (results.length > 0) {
//           const videos = results.map(({displayToggle, userResponseToggle, videoID }) => {
//             displayToggle,
//             userResponseToggle,
//             videoID
//           });
//           res.status(200).json({ results });
//         } else {
//           res.status(404).json({ error: 'No videos found' });
//         }
//       }
//     })
//   });
  