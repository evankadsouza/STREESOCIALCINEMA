import { useState, useEffect } from "react";
import Alert from 'react-popup-alert';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import '../styles/videoUploadForm.css';
function UploadForm() {
  const [formData, setFormData] = useState({
    videoURL: '',
    imageURL: '',
    dateAndTime:'',
    brandName:'',
    questionType: '',
    videoType:'',
    questionDesc:'',
    questionTypeID: '',
    duration:'',
    optionOne:'',
    optionTwo:'',
    optionThree:'',
    optionFour:'',
    optionFive:'',
    adStartTime:'',
    correctOption:''
  });

  const [showAlert, setShowAlert] = useState(false);
  var showAlertMessage = "";
  var buttonClick = false;
  const [videoType,setVideoType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

   

  const handleVideoTypeChange = (videoType) => {
    setVideoType(videoType);
    setFormData({ ...formData, 'videoType': videoType });
  }

  useEffect(() => {
    
    {/*if (formData.videoURL.trim() === '') {
      setShowAlert(true);
      showAlertMessage = "Please enter a valid Video URL";
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 10000);

      return () => clearTimeout(timeoutId);
    }*/}

    if(formData.questionType.trim() === ''){
        setShowAlert(true);
        showAlertMessage = "Please enter a valid Question type";
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 10000);

      return () => clearTimeout(timeoutId);
    }

    else if(isNaN(formData.questionTypeID) || formData.questionTypeID < 1){
        setShowAlert(true);
        showAlertMessage = "Please enter a valid Question Type ID (a positive number)";
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 10000);

      return () => clearTimeout(timeoutId);
    }
  },[buttonClick===true]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData); 
  };

  const handleVideoChange = (e) => {
    const myArray = ( e.target.value).split("\\");
    setFormData({ ...formData, 'videoURL' :  myArray[2]});
    console.log(myArray[2]);
    console.log(formData)
  }
  
  const handleImageChange = (e) => {
    const myArray = ( e.target.value).split("\\");
    console.log("image",myArray[2]);
    setFormData({ ...formData, 'imageURL' :  myArray[2]});
  }

  const handleSubmit = async (e) => {
    console.log('hello')
    e.preventDefault();
     // Check conditions before submitting
    {/* if (formData.videoURL.trim() === '') {
        setShowAlert(true);
        showAlertMessage = 'Please enter a valid Video URL';
        const timeoutId = setTimeout(() => {
            setShowAlert(false);
          }, 10000);
    
          return () => clearTimeout(timeoutId);
        
      }
  
      if (formData.questionType.trim() === '') {
        setShowAlert(true);
        showAlertMessage = 'Please enter a valid Question Type';
        const timeoutId = setTimeout(() => {
            setShowAlert(false);
          }, 10000);
    
          return () => clearTimeout(timeoutId);
      }
  
      if (isNaN(formData.questionTypeID) || formData.questionTypeID < 1) {
        setShowAlert(true);
        showAlertMessage = 'Please enter a valid Question Type ID (a positive number)';
        const timeoutId = setTimeout(() => {
            setShowAlert(false);
          }, 10000);
    
          return () => clearTimeout(timeoutId);
        
      }*/}

      //handledateandtime
      
      console.log("final form data:",formData);

    try {
      const response = await fetch('http://localhost:8010/uploadVideo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      //console.log("response.body",response.body)
      if (response.ok) {
        alert('Data saved successfully!');
        console.log('Data uploaded successfully');
        console.log(formData);
        // Add any additional logic or state updates as needed
      } else {
        console.error('Error uploading data');
        alert('Error uploading data!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <form class="video-form" onSubmit={handleSubmit}>
      <label>
        Video URL:
        <input type="file" onChange={handleVideoChange} />
      </label>
      <br />
      <br/> 
      <label>
        Image URL:
        <input type="file" onChange={handleImageChange} />
      </label>
      <br />
      <br/>     
      <label>
        Date:
        <input type="datetime-local" name="dateAndTime" value={formData.dateAndTime} onChange={handleChange} />
      </label>
      <br/>
      <br/>
      <label>
        Brand Name:
        <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} />
      </label>
      <br />
      <br/>      
      <label>
        Video Type:
         <input type="text" list="options" name="videoType" value={formData.videoType} onChange={handleChange}/>
          <datalist id="options">
            <option value="Advertisement" />
            <option value="Content" />
          </datalist>
      </label>
      <br />
      <br/>      
      <label>
        Question Type:
        <input type="text" list="option1" name="questionType" value={formData.questionType} onChange={handleChange}/>
          <datalist id="option1">
            <option value="Image" />
            <option value="Text" />
          </datalist>
      </label>
      <br />
      <br/>      
      <label>
        Question:
        <input type="text" name="questionDesc" value={formData.questionDesc} onChange={handleChange} />
      </label>
      <br />
      <br/>      
      <label>
        Question Type ID:
        <input type="text" name="questionTypeID" value={formData.questionTypeID} onChange={handleChange} />
      </label>
      <br />
      <br/>      
      <label>
      Duration ( in seconds ):
        <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
      </label>
      <br />
      <br/>      
      <label>
      Option 1:
        <input type="text" name="optionOne" value={formData.optionOne} onChange={handleChange} />
      </label>
      <br />
      <br/>
      <label>
      Option 2:
        <input type="text" name="optionTwo" value={formData.optionTwo} onChange={handleChange} />
      </label>
      <br />
      <br/>
      <label>
      Option 3:
        <input type="text" name="optionThree" value={formData.optionThree} onChange={handleChange} />
      </label>
      <br />
      <br/>
      <label>
      Option 4:
        <input type="text" name="optionFour" value={formData.optionFour} onChange={handleChange} />
      </label>
      <br />
      <br/>
      <label>
      Option 5:
        <input type="text" name="optionFive" value={formData.optionFive} onChange={handleChange} />
      </label>
      <br />
      <br/>
      <label>
      True Answer:
        <input type="text" name="correctOption" value={formData.correctOption} onChange={handleChange} />
      </label>
      <br />
      <br/>
      <label>
      Seconds when AD starts:
        <input type="text" name="adStartTime" value={formData.adStartTime} onChange={handleChange} />
      </label>
      <br />
      <br/>
      <button type="submit" onClick={() =>{
        buttonClick = true

      }}>Upload Video</button>
      <br/>
      
    </form>
    
  );
}

export default UploadForm;
