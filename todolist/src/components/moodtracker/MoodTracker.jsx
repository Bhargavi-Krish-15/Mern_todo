// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';

// const getScale = () => {
//   const baseWidth = 1440;
//   const scale_factor = window.innerWidth / baseWidth;
//   return Math.min(scale_factor, 1); 
// };

// const MoodTracker = () => {
//   const [mood, setMood] = useState('good');
//   const [message, setMessage] = useState('');
//   const [scale, setScale] = useState(getScale());


//   const fetchTodayMood = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/mood/get', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
//           withCredentials: true,
//         });
//         console.log('Fetched mood:', response);
//         setMood(response.data.mood);
//       } catch (err) {
//         console.error('Error fetching mood:', err);
//       }
//     };
//     fetchTodayMood();


//   const moods = [
//     { type: 'happy', icon: <FaSmile />, color: '#a4c031' },
//     { type: 'neutral', icon: <FaMeh />, color: '#a4c031' },
//     { type: 'sad', icon: <FaFrown />, color: '#a4c031' }
//   ];

//   useEffect(() => {
//     fetchTodayMood();
//     const handleResize = () => {
//       setScale(getScale());
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleMoodSelect = async (selectedMood) => {

//     try {
//         const user_str = localStorage.getItem('user');
//         if (!user_str) {
//             console.error('User not Logged in');
//             return;
//         }
//         const user = JSON.parse(user_str);
//       const response = await axios.post("http://localhost:4000/mood/set", {
//         mood: selectedMood,
//         user: user._id
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('access_token')}`
//         },
//         withCredentials: true,
//       });
//       console.log("response", response);
//       setMood(response.data.result.mood);
//     //   setMessage('Loading...');
//       setMessage('Mood saved successfully!');
//       setTimeout(() => setMessage(''), 1000);
//     } catch (error) {
//       console.error('Error saving mood:', error);
//       setMessage('Error saving mood. Please try again.');
//       setTimeout(() => setMessage(''), 1000);
//     }
//   };

//   // All sizes in rem units only
//   const moodButtonStyle = {
//     fontSize: `${scale * 2}rem`,
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     transition: 'color 0.2s',
//     padding: 0,
//     margin: 0,
//   };

//   return (
//     <div>
//     <div className="mood_tracker"
//       style={{
//         display: 'flex',
//         gap: `${scale}rem`,
//         // paddingBottom: `${baseSpacing}rem`,
//         alignItems: 'center',
//         fontSize: `${scale}rem`
//       }}
//     >
//       <h3 style={{ fontSize: `${scale * 1.2}rem`, margin: 0 }}>Mood:</h3>
//       {moods.map(({ type, icon, color }) => (
//         <button
//           key={type}
//           onClick={() => handleMoodSelect(type)}
//           style={{
//             ...moodButtonStyle,
//             color: mood === type ? color : '#ddd',
//           }}
//           disabled={message === 'Loading...'}
//           aria-label={`Set mood to ${type}`}
//           title={`Set mood to ${type}`}
//         >
//           {icon}
//         </button>
//       ))}
//       </div>
//       <div><span style={{ 
//         fontSize: `${scale * 0.9}rem`,
//         color: '#888',
//         display: 'block',
//         marginTop: `${scale * 0.5}rem`,
//         marginLeft: 0,
//         padding: `${scale * 0.9}rem`,
//         }}>
//         {message}
//       </span></div>
      
      
//     </div>
    
//   );
// };

// export default MoodTracker;

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';

const BASE_WIDTH = 1440;

function setResponsiveFontSize() {
  const scale = Math.min(Math.max(window.innerWidth / BASE_WIDTH, 0.75), 1);
  document.documentElement.style.fontSize = `${scale}rem`;
}

const MoodTracker = () => {
  const [mood, setMood] = useState('good');
  const [message, setMessage] = useState('');

  const moods = [
    { type: 'happy', icon: <FaSmile />, color: '#a4c031' },
    { type: 'neutral', icon: <FaMeh />, color: '#a4c031' },
    { type: 'sad', icon: <FaFrown />, color: '#a4c031' }
  ];

  const fetchTodayMood = async () => {
    try {
      const response = await axios.get('http://localhost:4000/mood/get', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        withCredentials: true,
      });
      setMood(response.data.mood);
    } catch (err) {
      console.error('Error fetching mood:', err);
    }
  };

  useEffect(() => {
    setResponsiveFontSize();
    fetchTodayMood();

    const handleResize = () => setResponsiveFontSize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMoodSelect = async (selectedMood) => {
    try {
      const user_str = localStorage.getItem('user');
      if (!user_str) return;

      const user = JSON.parse(user_str);
      const response = await axios.post("http://localhost:4000/mood/set", {
        mood: selectedMood,
        user: user._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        withCredentials: true,
      });

      setMood(response.data.result.mood);
      setMessage('Mood saved successfully!');
      setTimeout(() => setMessage(''), 1000);
    } catch (error) {
      console.error('Error saving mood:', error);
      setMessage('Error saving mood. Please try again.');
      setTimeout(() => setMessage(''), 1000);
    }
  };

  return (
    <div>
      <div
        className="mood_tracker"
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          fontSize: '1rem',
          paddingBottom: '1rem',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Mood:</h3>
        {moods.map(({ type, icon, color }) => (
          <button
            key={type}
            onClick={() => handleMoodSelect(type)}
            style={{
              fontSize: '1.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: mood === type ? color : '#ddd',
              transition: 'color 0.2s',
              padding: 0,
              margin: 0,
            }}
            disabled={message === 'Loading...'}
            aria-label={`Set mood to ${type}`}
            title={`Set mood to ${type}`}
          >
            {icon}
          </button>
        ))}
      </div>
      {message && (
        <span
          style={{
            fontSize: '0.9rem',
            color: '#888',
            display: 'block',
            marginTop: '0.5rem',
            padding: '0.75rem 0 0 0'
          }}
        >
          {message}
        </span>
      )}
    </div>
  );
};

export default MoodTracker;
