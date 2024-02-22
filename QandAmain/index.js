const firebase = require('firebase/app');
require('firebase/analytics');
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();
const fs = require('fs');
const multer = require('multer');
const mysql = require('mysql');
//const path = require('path');
const app = express();
const port = 8010;
const sequelize = require('sequelize');
const parentVideoURL = 'D:\\qandabackend\\QandA-main\\videos';
const VideoUploadForm = require('./routes/videoUploadFormAPI');//post req
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

{/*var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'Abc#12345'
});*/}
var globalCurrentVideoID = 0;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNEeLe0MWwg-FgsRkjj5o_oumBn5wnvaM",
  authDomain: "alwll-d650f.firebaseapp.com",
  projectId: "alwll-d650f",
  storageBucket: "alwll-d650f.appspot.com",
  messagingSenderId: "484336130576",
  appId: "1:484336130576:web:2b75b3682f874d6094c895",
  measurementId: "G-8VX9E715WM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Routes

app.get('/', (req, res) => {
  res.json('Hello All');
});

// Set up MySQL connection start of code
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Abc#12345',
  database: 'MEDIAPLAYER',
});

connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});


// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // The destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use the current timestamp as the file name
  },  
});

const upload = multer({ storage });


app.get('/api/allVideos', (req,res) =>{
  const selectQuery = 'SELECT * FROM videoTable';
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Error retrieving all videos' });
    } else {
      if (results.length > 0) {
        {/*const videos = results.map(({ videoID, videoURL, imageURL, dateAndTime, showID, videoType, questionType, qDescription, questionTypeID, options}) => ({
          videoID,
          videoURL,
          imageURL,
          dateAndTime,
          showID, 
          videoType, 
          questionType, 
          qDescription, 
          questionTypeID, 
          options, 
      
        }));

      */}
        res.status(200).json({ results });
      } else {
        res.status(404).json({ error: 'No videos found' });
      }
    }
  })
});
//for clicker api
app.get('/api/allVideos/:id', (req,res) =>{
  const videoId = req.params.id;
  const selectQuery = 'SELECT * FROM videoTable WHERE videoID='+videoId;
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Error retrieving all videos' });
    } else {
      if (results.length > 0) {
        {/*const videos = results.map(({ videoID, videoURL, imageURL, dateAndTime, showID, videoType, questionType, qDescription, questionTypeID, options }) => ({
          videoID,
          videoURL,
          imageURL,
          dateAndTime,
          showID, 
          videoType, 
          questionType, 
          qDescription, 
          questionTypeID, 
          options, 
         
        }));*/}

        res.status(200).json({ results });
      } else {
        res.status(404).json({ error: 'No videos found' });
      }
    }
  })
});
{/*}
app.post('/api/allVideoDetails/', (req,res) => {
  const videoID = req.body;
  globalCurrentVideoID = videoID;
});*/}

app.get('/api/allVideoDetails/',(req,res) => {
  const selectQuery = 'SELECT displayToggle, userResponseToggle, videoID FROM videoData';

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Error retrieving all videos' });
    } else {
      if (results.length > 0) {
        const videos = results.map(({displayToggle, userResponseToggle, videoID }) => {
          displayToggle,
          userResponseToggle,
          videoID
        });
        res.status(200).json({ results });
      } else {
        res.status(404).json({ error: 'No videos found' });
      }
    }
  })
});


// Express route to retrieve video by ID
app.get('/api/currentVideo/:id', (req, res) => {
  const videoId = req.params.id;

  // Query the database to get video details
  const selectQuery = 'SELECT * FROM videoTable WHERE videoID='+videoId;
  connection.query(selectQuery, [videoId], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Error retrieving video' });
    } else {
      if (results.length > 0) {
        const {filepath} = (results[0].videoURL).substr(1);
        
        // Read the video file and send it as a response
        //const videoPath = `${__dirname}/uploads/${filename}`;
       // const videoPath = `${__dirname}/${results[0].videoURL}`;
       const videoPath = `${results[0].videoURL}`;
        console.log("videoPath",videoPath)
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
          // If the client sends a 'Range' header, serve partial content
          const parts = range.replace(/bytes=/, '').split('-');
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

          const chunksize = end - start + 1;
          const file = fs.createReadStream(videoPath, { start, end });
          const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
          };

          res.writeHead(206, head);
          file.pipe(res);
        } else {
          // If 'Range' header is not provided, serve the entire file
          const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
          };

          res.writeHead(200, head);
          
          fs.createReadStream(videoPath).pipe(res);
        }
      } else {
        res.status(404).json({ error: 'Video not found' });
    }
    }
  });
});


//remote access to video
app.get('/videos/:videoName', (req, res) => {
  const videoName = req.params.videoName;
  const videoPath = `/videos/${videoName}`;

  // Check if the file exists
  if (fs.existsSync(videoPath)) {
    // Stream the video file as the response
    const fileStream = fs.createReadStream(videoPath);
    console.log(fileStream)
    fileStream.pipe(res);
  } else {
    res.status(404).send('Video not found');
  }
});

app.post('/uploadVideo', (req,res) => {

  var selectedVideoID = 0;
  //const {showID,   questionType, questionTypeID,   options  } = req.body;
  const {dateAndTime, questionTypeID, videoURL, adStartTime, duration, brandID, videoType, questionDesc, optionOne, optionTwo, optionThree, optionFour, optionFive,  imageURL, correctOption} = req.body;
  const videoPATH = `/videos/${videoURL}`;
  const imagePATH = `${__dirname}/images/${imageURL}`;
 
  
  const insertQueryOne = `INSERT INTO videoTable ( videoID, dateAndTime, videoURL, adStartTime, duration, brandID, videoType) VALUES (?,?,?,?,?,?,?)`;
  const values = [null, dateAndTime, videoPATH, adStartTime, duration, brandID, videoType ];

  connection.query(insertQueryOne, values, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Error inserting data into MySQL' });
    }
    else{
      console.log("Data saved in videoTable");
   }

  });

  //find the latest videoID
  const selectQuery = 'SELECT videoID FROM videoTable WHERE videoID = (SELECT MAX(videoID) FROM videoTable)';
  connection.query(selectQuery, values, (error, results) => {
    if (error) {
          console.error('Error executing MySQL query:', error);
          return res.status(500).json({ error: 'Error adding data plese try again' });
    }
    else{
          if (results.length > 0) {
            selectedVideoID = results[0].videoID;
        }
        //if videoID exists
        if(selectedVideoID>0)
        {
            console.log('Data inserted successfully into videoTable');

            const insertQueryTwo = `INSERT INTO videoData ( videoDataID, dateAndTime, questionDesc, questionTypeID, optionOne, optionTwo, optionThree, optionFour, optionFive, displayToggle, imageURL, correctOption, videoID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            const values = [null, dateAndTime, questionDesc, questionTypeID, optionOne, optionTwo, optionThree, optionFour, optionFive, 0, imageURL, correctOption, selectedVideoID];

            connection.query(insertQueryTwo, values, (error, results) => {
                  if (error) {
                    console.error('Error executing MySQL query:', error);
                    return res.status(500).json({ error: 'Error inserting data into videoData' });
                  }

                    return res.status(200).json('Data inserted successfully into videoTable and videoData' );
          });

        }
    
      }

  });

});

app.post('/api/userResponseData', (req, res) => {
  const { userName, phoneNumber, cardID, questionTypeID, optionSelected, videoDataID } = req.body;
  let finalUserID = 0;

  // Begin a transaction
  connection.beginTransaction(function (err) {
    if (err) {
      console.error('Error beginning transaction:', err);
      return res.status(500).json({ error: 'Error adding data, please try again' });
    }

    // First query to insert user details
    const insertQuery = 'INSERT INTO userData (userID, userName, cardID, phoneNumber, dateAndTime) VALUES (?,?,?,?,NOW())';
    const insertValues = [null, userName, cardID, phoneNumber];

    connection.query(insertQuery, insertValues, (error, insertResults) => {
      if (error) {
        console.error('Error inserting user details:', error);
        // Rollback the transaction
        connection.rollback(function () {
          console.error('Transaction rolled back.');
          return res.status(500).json({ error: 'Error adding data, please try again' });
        });
      } else {
        // Second query to select userID
       // const selectQuery = 'SELECT userID FROM userData WHERE userName = ? AND phoneNumber = ? AND cardID = ?';
       const selectQuery = 'SELECT userID FROM userData WHERE userName = ? AND phoneNumber = ? AND cardID = ?  ORDER BY dateAndTime DESC LIMIT 1';
        const selectValues = [userName, phoneNumber, cardID];

        connection.query(selectQuery, selectValues, (error, selectResults) => {
          if (error) {
            console.error('Error selecting userID:', error);
            // Rollback the transaction
            connection.rollback(function () {
              console.error('Transaction rolled back.');
              return res.status(500).json({ error: 'Error adding data, please try again' });
            });
          } else {
            if (selectResults.length > 0) {
              finalUserID = selectResults[0].userID;

              // Commit the transaction
              connection.commit(function (err) {
                if (err) {
                  console.error('Error committing transaction:', err);
                  // Rollback the transaction
                  connection.rollback(function () {
                    console.error('Transaction rolled back.');
                    return res.status(500).json({ error: 'Error adding data, please try again' });
                  });
                } else {
                  // Third query to insert user response
                  const insertResponseQuery ='INSERT INTO userResponse (userResponseID, userID, optionSelected, videoDataID, questionTypeID) VALUES (?,?,?,?,?)';
                  const insertResponseValues = [null, finalUserID, optionSelected, videoDataID,  questionTypeID];

                 {/* const insertResponseQuery = 'INSERT INTO userResponse (userResponseID, userID, optionNumber, optionSelected,  isCorrect, videoDataID, questionTypeID)'+
                  ' VALUES (?, ?, ?, ?, CASE WHEN (SELECT correctOption FROM videoData WHERE videoDataID = ?) = ? THEN 1'+
                  ' WHEN (SELECT correctOption FROM videoData WHERE videoDataID = ?) = "NIL" THEN 2'+
                ' ELSE 0 END,?)';*/}
                  
                  //const insertResponseValues =  [null, finalUserID, null, optionSelected, videoDataID, optionSelected, videoDataID, questionTypeID];


                  connection.query(insertResponseQuery, insertResponseValues, (error, insertResponseResults) => {
                    if (error) {
                      console.error('Error inserting user response:', error);
                      // Rollback the transaction
                      connection.rollback(function () {
                        console.error('Transaction rolled back.');
                        return res.status(500).json({ error: 'Error adding data, please try again' });
                      });
                    } else {
                      // All queries executed successfully, commit the transaction
                      return res.status(200).send('RESPONSE 200 OK');
                    }
                  });
                }
              });
            } else {
              // No userID found, rollback the transaction
              connection.rollback(function () {
                console.error('Transaction rolled back.');
                return res.status(500).json({ error: 'Error adding data, please try again' });
              });
            }
          }
        });
      }
    });
  });
});



{/*}
//POST to receive user response from clicker
app.post('/api/userResponseData', (req,res) =>{
  const {userName, phoneNumber, cardID, questionTypeID, optionSelected, videoDataID} = req.body;
  var userid = 0;
  const selectQuery = 'SELECT userID FROM userData WHERE userName = ? AND phoneNumber = ? AND cardID=?';
  const values = [userName, phoneNumber, cardID ];
  connection.query(selectQuery, values, (error, results) => {
    if (error) {
          console.error('Error executing MySQL query:', error);
          return res.status(500).json({ error: 'Error adding data plese try again' });
    }
    else{
      if(results[0].userID>0)
      {
        userid = results[0].userID;
        var questionTypeid = 0;
        var questionDescription = '';
        var correctOptionGiven = '';
        var isCorrect = false;
        const selectQueryTwo = 'SELECT questionTypeID, questionDesc, correctOption from videoData where videoDataID='+videoDataID+'AND questionTypeID='+questionTypeID;
        connection.query(selectQuery, values, (error, result) => {
              if (error) {
                    console.error('Error executing selectQueryTwo query:', error);
                    return res.status(500).json({ error: 'Error adding data plese try again' });
              }
              else{
                      if(result.length>0)//else result is null
                      {
                                questionTypeid = result[0].questionTypeID;
                                questionDescription = result[0].questionDesc;
                                correctOptionGiven = result[0].correctOption;


                                if(correctOptionGiven === optionSelected)
                                {
                                      isCorrect = true;
                                }
                                const insertOneQuery = 'INSERT INTO userResponse (userResponseID, userID, questionTypeID, optionSelected, videoDataID, isCorrect) VALUES (?,?,?,?,?,?)';
                                const value = [null, userid, questionTypeid, optionSelected, videoDataID, isCorrect];
                                connection.query(insertOneQuery, value, (error, result) => {
                                  if (error) {
                                        console.error('Error executing selectQueryTwo query:', error);
                                        return res.status(500).json({ error: 'Error adding data plese try again' });
                                  }
                                  return res.status(200).json('Data inserted successfully into userResponse table' );

                                });
                      }
                      else{
                        return res.status(200).json('Data received from the database is null, video selected does not exist');
                      }
              }
        });
      }
    }
});
}); */}

//get all the user responses for all the users
app.get('/api/getUserResponse', (req,res) => {

  //const query = 'SELECT * FROM userResponse INNER JOIN userData ON userResponse.userID = userData.userID';
  const query = 'SELECT userResponse.*, userData.*, videoData.correctOption, videoData.questionDesc FROM userResponse '+
  'INNER JOIN userData ON userResponse.userID = userData.userID '+
  'INNER JOIN videoData ON userResponse.questionTypeID = videoData.questionTypeID '+
  'WHERE userResponse.questionTypeID = videoData.questionTypeID'
  ;
  connection.query(query,  (error, result) => {
    if (error) {
          console.error('Error executing selectQueryTwo query:', error);
          return res.status(500).json({ error: 'Error adding data plese try again' });
    }
    else {
      return res.status(200).json({result});
    }
})
})

//PUT UPDATE DISPLAY TOGGLE DATA
app.put('/api/changeDisplayToggle', async (req, res) => {
  const { displayToggle, videoID, userResponseToggle } = req.body;
  console.log("displaytoggle",displayToggle)
 
    const query = 'UPDATE videoData SET displayToggle = CASE WHEN videoID = ? THEN ? ELSE displayToggle END, userResponseToggle = ?';
   const values = [videoID, displayToggle, userResponseToggle];
    // Execute the update query
    connection.query(query, values, (error, result) => {
      if (error) {
            console.error('Error executing selectQueryTwo query:', error);
            return res.status(500).json({ error: 'Error adding data plese try again' });
      }else {
        console.log(values)
        console.log("update successful",result)
      res.status(200).json({ message: 'Record found' });
    }
  }); 
});
{/*}
// GET request to retrieve currently running video data
app.get('/api/currentlyRunningVideo', (req, res) => {
  const selectQuery = 'SELECT displayToggle, videoID FROM videoData WHERE displayToggle = ? LIMIT 1';
  const values = [true]; // Assuming displayToggle is a boolean indicating whether the video is currently running

  connection.query(selectQuery, values, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Error retrieving currently running video' });
    } else {
      if (results.length > 0) {
        const { displayToggle, videoID } = results[0];
        res.status(200).json({ displayToggle, videoID });
      } else {
        res.status(404).json({ error: 'No currently running video found' });
      }
    }
  });
});*/}


// POST endpoint to save scheduler data
app.post('/api/saveSchedulerData', (req, res) => {
  const schedulerData = req.body;
  schedulerData.video_links = JSON.stringify(schedulerData.video_links);
  //schedulerData.videoIDURL = JSON.stringify(schedulerData.videoIDURL);
  // Insert data into the MySQL table
  connection.query('INSERT INTO schedulerData SET ?', schedulerData, (err, result) => {
    if (err) {
      console.error('Error saving data to MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Data saved to MySQL:', result);
      res.status(200).json({ success: true });
    }
  });
});

// GET request to retrieve all scheduler data
app.get('/api/allSchedulerData', (req, res) => {
  connection.query('SELECT * FROM schedulerData', (err, results) => {
    if (err) {
      console.error('Error fetching scheduler data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Scheduler data fetched successfully');
      res.status(200).json(results);
    }
  });
});
  
app.listen(port, () => {
  console.log(`Server is running`);
});



//end of code

