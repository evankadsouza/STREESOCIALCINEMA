{/*const connection = require('../config/db'); // Assuming you have a database configuration file
const uploadVideoController = {};

uploadVideoController.uploadVideo = (req, res) => {
  var selectedVideoID = 0;
  const {
    dateAndTime, questionTypeID, videoURL, adStartTime, duration,
    brandID, videoType, questionDesc, optionOne, optionTwo, optionThree,
    optionFour, optionFive, imageURL, correctOption, padX, padY, text, x, y, colours
  } = req.body;

  console.log(dateAndTime)

  const videoPATH = `/videos/${videoURL}`;
  //const imagePATH = `${__dirname}/images/${imageURL}`;
const videoID = 1;
  const insertQueryOne = `INSERT INTO videoTables(videoID, dateAndTime, videoURL, adStartTime, duration, videoType) VALUES (null, '${dateAndTime}', '${videoPATH}', ${adStartTime}, ${duration}, '${videoType}')`;
  //const valuesOne = [ videoPATH];
    //adStartTime, duration, videoType ];


  console.log('Final SQL Query:', insertQueryOne);
//console.log('Parameter Values:', valuesOne);
  connection.query(insertQueryOne, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Error inserting data into videoTable' });
    }
    else{
        console.log("helooooooooooooooooooooooo")
     // Find the latest videoID
     const selectQuery = 'SELECT videoID FROM videoTables WHERE videoID = (SELECT MAX(videoID) FROM videoTables)';
     connection.query(selectQuery, (error, results) => {
       if (error) {
         console.error('Error executing MySQL query:', error);
         return res.status(500).json({ error: 'Error adding data, please try again' });
       }
       console.log('select statement working')
       if (results.length > 0) {
         console.log('selectedVideoID',results[0].videoID)
         selectedVideoID = results[0].videoID;
       }

       // If videoID exists
       if (selectedVideoID > 0) {
         console.log('Data inserted successfully into videoTable');

         const insertQueryTwo = `INSERT INTO videoData (videoDataID, dateAndTime, questionDesc, questionTypeID, optionOne, optionTwo, optionThree, optionFour, optionFive, displayToggle, imageURL, correctOption, videoID, padX, padY, text, x, y, colours) VALUES (null,'${dateAndTime}','${questionDesc}',${questionTypeID},'${optionOne}','${optionTwo}','${optionThree}','${optionFour}','${optionFive}',${displayToggle},'${imageURL}', '${correctOption}', ${selectedVideoID}, ${padX}, ${padY}, ${text}, ${x}, ${y}, ${colours})`;

         connection.query(insertQueryTwo, (error, results) => {
           if (error) {
             console.error('Error executing MySQL query:', error);
             return res.status(500).json({ error: 'Error inserting data into videoData' });
           }

           return res.status(200).json('Data inserted successfully into videoTables and videoData');
         });
       }
     });
    }
  });
};

module.exports = uploadVideoController;*/}




const connection = require('../config/db');
const uploadVideoController = {};

uploadVideoController.uploadVideo = async (req, res) => {
  try {
    const {
      dateAndTime, questionTypeID, videoURL, adStartTime, duration,
      videoType, questionDesc, option, optionOne, optionTwo, optionThree,
      optionFour, optionFive, imageURL, correctOption, padX, padY, text, x, y, colours, brandName, brandLogo, contactPersonName, contactPersonNumber
    } = req.body;

    console.log(dateAndTime);

    const videoPATH = `/videos/${videoURL}`;
    const insertQueryOne = `INSERT INTO videoTables(dateAndTime, videoURL, adStartTime, duration, videoType,createdAt,updatedAt) VALUES ('${dateAndTime}', '${videoPATH}', ${adStartTime}, ${duration}, '${videoType}',NOW(),NOW())`;

    console.log('Final values ob:', padX, padY);

   const results =  await connection.query(insertQueryOne);

   const insertQueryTwo = `INSERT INTO brandTables (brandID, brandName, brandLogo, contactPersonName, contactPersonPhone, createdAt, updatedAt) VALUES (null, '${brandName}', '${brandLogo}', '${contactPersonName}', ${contactPersonNumber},NOW(),NOW())`;
  
   const resultsTwo = await connection.query(insertQueryTwo);
   
   if (results && resultsTwo) {
      console.log('Data inserted successfully into videoTables and brandTables');

      const selectQuery = 'SELECT videoID FROM videoTables WHERE videoID = (SELECT MAX(videoID) FROM videoTables)';
      const [resultsSelect] = await connection.query(selectQuery);

      const selectQueryTwo = 'SELECT brandID, brandName FROM brandTables WHERE brandID = (SELECT MAX(brandID) FROM brandTables)';
      const [resultsSelectTwo] = await connection.query(selectQueryTwo);


      if (resultsSelect.length > 0 && resultsSelectTwo.length>0) {
        const selectedVideoID = resultsSelect[0].videoID;
        const selectedBrandID = resultsSelectTwo[0].brandID;
        const selectBrandName = resultsSelectTwo[0].brandName;
        const insertQueryThree = `INSERT INTO videoData (dateAndTime, questionDesc, questionTypeID, optionNumber, optionOne, optionTwo, optionThree, optionFour, optionFive, displayToggle, imageURL, correctOption, videoID, padX, padY, font, x, y, colours,brandID,brandName,createdAt,updatedAt) VALUES ('${dateAndTime}','${questionDesc}',${questionTypeID},${option},'${optionOne}','${optionTwo}','${optionThree}','${optionFour}','${optionFive}',0,'${imageURL}', '${correctOption}', ${selectedVideoID}, '${padX}', '${padY}', '${text}', '${x}', '${y}', '${colours}',${selectedBrandID},'${selectBrandName}',NOW(),NOW())`;

        console.log('Final SQL Query:', insertQueryThree);

        const [resultsTwo] = await connection.query(insertQueryThree);

        if (resultsTwo) {
          console.log('Data inserted successfully into videoData');
          
        } 
      } 
    } 
    return res.status(200).json({res:'Data inserted successfully into videoTables and videoData'});
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = uploadVideoController;

