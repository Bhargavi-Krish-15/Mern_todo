import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaSmile, FaMeh, FaFrown } from 'react-icons/fa';

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
    // setResponsiveFontSize();
    fetchTodayMood();

    // const handleResize = () => setResponsiveFontSize();
    // window.addEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
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
            // marginTop: '0.5rem',
            // padding: '0.75rem 0 0 0'
            paddingBottom: '0.75rem',
          }}
        >
          {message}
        </span>
      )}
    </div>
  );
};

export default MoodTracker;
