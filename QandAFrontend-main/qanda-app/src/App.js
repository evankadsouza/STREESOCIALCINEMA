// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scheduler from './views/scheduler.js';
import { Navbar } from './views/navbar.js';
import { Theateroperator } from './views/theaterOperator.js';
import { VideoPlayer } from './views/videoPlayer.js';
import UploadForm from './views/videoUploadForm.js';
import { UserResponse } from './views/userResponse.js';



function App() {
  
  return (
    <div className='maindiv'>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="uploadform" element={<UploadForm />} />   
          <Route path="scheduler" element={<Scheduler />} />
          <Route path="theateroperator" element={<Theateroperator />} />
          <Route path="video-player" element={<VideoPlayer />} />
          <Route path="userResponse" element={<UserResponse />} />

      </Routes>
    </BrowserRouter>

    </div>
  );
}


export default App;
