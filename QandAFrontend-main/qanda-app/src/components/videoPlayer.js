import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/videoPlayer.css';
// In your React.js file
import config from '../../config';  // Adjust the path accordingly
const apiUrl = `${config.apiBaseUrl}/your/api/endpoint`;
{/*
export const VideoPlayer = () => {
 const [videoLinks, setVideoLinks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // Retrieve video links from localStorage
    const storedVideoLinks = JSON.parse(localStorage.getItem('videoLinks'));

    if (storedVideoLinks && storedVideoLinks.length > 0) {
      console.log('video links received ',storedVideoLinks)
      setVideoLinks(storedVideoLinks);
    }
  }, []);
  //videoLinks[currentIndex];

  useEffect(() => {
    console.log("videoref",videoLinks[currentIndex])
    // Update the video source when currentIndex changes
    if (videoRef.current) {
      videoRef.current.src = '/videos/Sugar_Which_Actress_Ad.mp4'
      videoRef.current.load(); // Reload the video element
    }
  }, [currentIndex, videoLinks]);

  const handleVideoEnded = () => {
    // Check if the current index is less than the length before incrementing
    if (currentIndex < videoLinks.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div>
     {/*} <div>
      <video width="750" height="500" controls >
      <source src="/videos/Sugar_Which_Actress_Ad.mp4" type="video/mp4"/>
     </video>
  </div>
      
      <h1>Video Player</h1>
      {videoLinks.length > 0 && (
       <div>
          <video
            id="videoElement"
            width="640"
            height="360"
            autoPlay
            controls
            onEnded={handleVideoEnded}
            ref={videoRef}
          >
            <source src='D:\qandabackend\QandA-main/videos/Sugar_Which_Actress_Ad.mp4' type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      </div>
      )}
    </div>
  );
}
*/}


export const VideoPlayer = () => {
  const [videoLinks, setVideoLinks] = useState([]);
  const [jsonVideoURLLinks, setJsonVideoURLLinks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const [isCertainTimeReached, setIsCertainTimeReached] = useState(false);
  const [displayToggle, setDisplayToggle] = useState(0);
  const [userResponseToggle, setUserResponseToggle] = useState(1);//initial value is 1 , before question starts
  const [videoID, setVideoID] = useState(null); // Added state to store videoID
  const [adStartSeconds, setAdStartSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
//new
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  
  const togglefs = () => {
    const e = document.getElementById('videoElement');
    const isFullscreen = document.fullscreenElement;

    console.log(isFullscreen);

    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      e.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  useEffect(() => {
    // Retrieve video links from localStorage
    const storedVideoLinks = JSON.parse(localStorage.getItem('videoLinks'));
    //const jsonVideoURLLinks = JSON.parse(localStorage.getItem('jsonVideoURLLinks'))
    if (storedVideoLinks && storedVideoLinks.length > 0) {
      setVideoLinks(storedVideoLinks);
    }

    //if (jsonVideoURLLinks && jsonVideoURLLinks.length > 0) {
     // setJsonVideoURLLinks(jsonVideoURLLinks);
   // }

 
    {/*var el = document.getElementById("videoElement");
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }*/}



  
    

  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        togglefs();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  useEffect(() => {
    // Update the video source when currentIndex changes
    if (videoRef.current) {
      videoRef.current.src = videoLinks[currentIndex];

       videoRef.current.load(); // Reload the video element
    }
  }, [currentIndex, videoLinks]);


  // Fetch video data from API and compare with the current video URL
  fetch(`${apiUrl}/api/allVideos`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const matchingVideo = data.find(video => video.videoURL == videoLinks[currentIndex]);
    if (matchingVideo) {
      setVideoID(matchingVideo.videoID);
      setAdStartSeconds(matchingVideo.adStartTime)
      setDuration(matchingVideo.duration);
      console.log(typeof(duration))
      console.log(duration)
    } else {
      setVideoID(null);
    }
  })
  .catch(error => {
    console.error('Error fetching video data:', error);
  });


  const handleVideoEnded = () => {
    // Check if the current index is less than the length before incrementing
    if (currentIndex < videoLinks.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

 

  
  
  

  
  const handleTimeUpdate = () => {
    console.log("handleTimeUpdate")
     // Check if the current time is greater than or equal to a certain value
     if (videoRef.current.currentTime > 0 && videoRef.current.currentTime<adStartSeconds) {
      console.log("no",adStartSeconds)
      setDisplayToggle("0");
      setUserResponseToggle("1");
      handleChangeDisplayToggle(displayToggle, videoID, userResponseToggle);
    }
     if (videoRef.current.currentTime >= adStartSeconds && videoRef.current.currentTime<duration-2) {
      //setIsCertainTimeReached(true);
      console.log("yes",adStartSeconds,duration)
      setDisplayToggle("1");
      setUserResponseToggle("0");
      handleChangeDisplayToggle(displayToggle, videoID, userResponseToggle);
    }
    if(videoRef.current.currentTime >= duration-2){
     
      setDisplayToggle("0");
      setUserResponseToggle("1");
      handleChangeDisplayToggle(displayToggle, videoID, userResponseToggle);
    }
  };

  const handleChangeDisplayToggle = async (displayToggle, currentVideoID, userResponseToggle) => {
    const fetchData = async () => {
      const url = `${apiUrl}/api/changeDisplayToggle`; // Replace with your API endpoint
      const data = {
        // Your data to be sent in the request body
        displayToggle: displayToggle,
        videoID : currentVideoID,
        userResponseToggle: userResponseToggle,
      };
      try {
        console.log("reached put request try block",adStartSeconds)
        const response = await axios.put(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Handle successful response here
        console.log('PUT request successful:', response.data);
      } catch (error) {
        // Handle errors here
        console.error('Error during PUT request:', error);
      }
    };
    fetchData();
     
};

  return (
    <div>
      <h1>Video Player</h1>
      {videoLinks.length > 0 && (
        <div class="videoScreen">
          <video
            id="videoElement"
            width= {windowDimensions.width}
            height ={windowDimensions.height} 
            autoPlay
            controls
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            ref={videoRef}
          >
            <source src={videoLinks[currentIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h1>{videoID} {adStartSeconds}</h1>
        </div>
      )}
      
    </div>
  );
};

























{/*} 
        if(response.length>0)
        {
          const fetchDataOne = async () => {
              const url = await fetch(`http://localhost:8010/api/allVideoDetails/`);
              const data = {
                // Your data to be sent in the request body
                displayToggle: displayToggle,
                videoID : currentVideoID,
              };
              try {
                const response = await axios.get(url, data, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                console.log('GET request successful:', response.data);
              }catch (error) {
                // Handle errors here
                console.error('Error during PUT request:', error);
              }
          };
          fetchDataOne();
        }*/}