import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getScale = () => {
  const baseWidth = 1440;
  const scale_factor = window.innerWidth / baseWidth;
  return Math.min(scale_factor, 1);
};

const Pomodoro = () => {

    // scale for responsive design 
    const [scale, setScale] = useState(getScale());
    //sconds left for timer - eg we keep it 1 minute for testing
    const [secondsLeft, setSecondsLeft] = useState(1 * 60); 
    //isRunning state to check if timer is running
    const [isRunning, setIsRunning] = useState(false);
    //onBreak state to check if user is on break
    const [onBreak, setOnBreak] = useState(false);
    //sessionsCompleted state to check how many sessions are completed
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [message, setMessage] = useState('');

 
  const fetchPomodoro = async () => {
      try {
        const response = await axios.get('http://localhost:4000/pomodoro/get', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
          withCredentials: true,
        });
        const data = response.data;
        setSessionsCompleted(data.sessionsCompleted || 0);
      } catch (err) {
        console.error('Error fetching pomodoro data:', err);
      }
    };

  // Fetch today's pomodoro data on mount
  useEffect(() => { 
    fetchPomodoro();

     // Update scale on resize
     const handleResize = () => setScale(getScale());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Timer effect
  useEffect(() => {
    if (!isRunning) return;

    // If secondsLeft is 0, stop the timer
    const timer = setInterval(() => {
      setSecondsLeft((sec) => {
        if (sec > 1) return sec - 1;

        // Timer finished, switch between work and break
        if (onBreak) {
          alert('Time To Work!')
          setIsRunning(false);
          setOnBreak(false);
          setSecondsLeft(1 * 60);
        } else {
        alert('Time for a break!')
          setOnBreak(true);
        //   break
          setSecondsLeft(1 * 60);
          setSessionsCompleted((prev) => prev + 1);
          // Update backend with completed session
          updatePomodoroSession();
          
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, onBreak]);

  const updatePomodoroSession = async () => {
    try {
      await axios.post('http://localhost:4000/pomodoro/set', {
        sessionsCompleted: 1,
        focusTime: 1 * 60,
        breakTime: 1 * 60,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
        withCredentials: true,
      });
      setMessage('Session saved!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      console.error('Error updating pomodoro:', err);
      setMessage('Error saving session.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  // Format time mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };



  return (
    <div style={{
        padding: `${1 * scale}rem`,
        borderRadius: `${0.5 * scale}rem`,
        backgroundImage: 'url("/a.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginBottom: `${2 * scale}rem`,
        //   boxShadow: '0 0.125rem 0.5rem rgba(164, 192, 49, 0.1)',
        maxWidth: `${32 * scale}rem`,
        minHeight: `${35 * scale}rem`,
        margin: '2rem auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
      <h2 
      style={{fontSize: `${1.9 * scale}rem`,
            fontWeight: 'bold',
            marginBottom: `${1 * scale}rem`,
            color: onBreak ? '#a4c031' : 'rgb(186 186 186)',
            textShadow: `
            -1px -1px 0 #353535,  
            1px -1px 0 #353535,
            -1px  1px 0 #353535,
            1px  1px 0 #353535
        `}}
      >{onBreak ? 'Break Time' : 'Work Time'}
      </h2>
      <div 
      style={{
        fontSize: `${3 * scale}rem`,
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        marginBottom: `${1 * scale}rem`,
        color: onBreak ? '#a4c031' : '#a4c031',
        textShadow: `
        -1px -1px 0 #353535,  
        1px -1px 0 #353535,
        -1px  1px 0 #353535,
        1px  1px 0 #353535
    `
      }}
      >{formatTime(secondsLeft)}</div>
      <div>
        <button style={{
            padding: `${0.8 * scale}rem ${1.2 * scale}rem`,
            fontSize: `${1 * scale}rem`,
            margin: `${0.5 * scale}rem`,
            borderRadius: `${0.1875 * scale}rem`,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: onBreak ? '#a4c031' : '#565857',
            color: 'white',
            transition: 'background-color 0.3s',
        }} onClick={() => setIsRunning((r) => !r)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          style={{
            padding: `${0.8 * scale}rem ${1.2 * scale}rem`,
            fontSize: `${1 * scale}rem`,
            margin: `${0.5 * scale}rem`,
            borderRadius: `${0.1875 * scale}rem`,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: onBreak ? '#a4c031' : '#565857',
            color: 'white',
            transition: 'background-color 0.3s',
          }}
          onClick={() => {
            setIsRunning(false);
            setOnBreak(false);
            setSecondsLeft(1 * 60);
          }}
        >
          Reset
        </button>
      </div>
      {message && <p style={{ fontSize: `${0.9 * scale}rem`, color: '#888', marginTop: `${0.5 * scale}rem` }}>{message}</p>}
      {/* <p style={{ fontSize: `${0.9 * scale}rem`, marginTop: `${1 * scale}rem` }}>
        Sessions Completed Today: {sessionsCompleted}
      </p> */}
    </div>
  );
};

export default Pomodoro;