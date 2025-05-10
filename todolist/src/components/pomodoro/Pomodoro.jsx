import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
    // secondsLeft - holds the remaining seconds
  const [secondsLeft, setSecondsLeft] = useState(1*60); 
    // isRunning - boolean to check if the timer is running
  const [isRunning, setIsRunning] = useState(false);
    // onBreak - boolean to check if the timer is on break
  const [onBreak, setOnBreak] = useState(false);
  const [message, setMessage] = useState('');

  // Load sound files from public folder
  const breakSound = new Audio('./break.mp3');
  const workSound = new Audio('./work.mp3');


//   // Timer logic
//   useEffect(() => {
//     if (!isRunning) return;

//     // If the timer is paused, do not start a new interval and clear the previous interval
//     // If the timer is running, set a new interval and clear the previous interval

//     const timer = setInterval(() => {
//         // Decrease the seconds left by 1
//         // If seconds left is greater than 1, decrease it by 1
//         // If seconds left is 1, switch between work and break
//         setSecondsLeft((sec) => {
//             if (sec > 1) return sec - 1;
//             clearInterval(timer);

//             // Timer finished, switch between work and break
//             if (onBreak) {
//                 workSound.play(); 
//                 alert('Break is over! Time to work.');
//                 setOnBreak(false);
//                 setIsRunning(false);
//                 // here we set work time
//                 setSecondsLeft(2 * 60); 
//             } else {
//                 breakSound.play();
//                 alert('Work is done! Time for a break.');
//                 setOnBreak(true);
//                 setIsRunning(false);
//                 // set break time
//                 setSecondsLeft(5 * 60); 
//             }

//             return 0;
//         });
//         // 1000ms = 1 second
//     }, 1000);

//     // Clear the interval when the component unmounts or when isRunning changes
//     return () => clearInterval(timer);
//     // isRunning, onbreal is a dependency, so the effect will run again when thier value changes
//     }, [isRunning, onBreak]);

    useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
        setSecondsLeft((sec) => Math.max(sec - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
    }, [isRunning]);

    // This effect watches for the timer hitting 0
    useEffect(() => {
    if (secondsLeft !== 0 || !isRunning) return;

    setIsRunning(false); // pause the timer immediately

    if (onBreak) {
        workSound.play();
        setMessage('Break is over! Time to work.');
        setTimeout(() => setMessage(''), 5000);
        // alert('Break is over! Time to work.');
        setOnBreak(false);
        setSecondsLeft(1 * 60); // switch to work
    } else {
        breakSound.play();
        setMessage('Work is done! Time for a break.');
        setTimeout(() => setMessage(''), 5000);
        // alert('Work is done! Time for a break.');
        setOnBreak(true);
        setSecondsLeft(5 * 60); // switch to break
    }
    }, [secondsLeft, isRunning, onBreak]);

    // for the timeer that we are displaying
    // formatTime function takes seconds and returns a string in mm:ss format
    
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    // padStart is used to add leading zeros to the minutes and seconds
    // so that they are always 2 digits
    // toString() is used to convert the number to a string
    // why this is needed? because padStart only works on strings
    // so we need to convert the number to a string first
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      padding: '1rem',
      borderRadius: '0.5rem',
      backgroundImage: 'url("./avacado.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      marginBottom: '2rem',
      maxWidth: '32rem',
      minHeight: '35rem',
      margin: '2rem auto',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
        
      <h2 style={{
        fontSize: '1.9rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: onBreak ? '#a4c031' : 'rgb(186 186 186)',
        textShadow: `
          -1px -1px 0 #353535,
          1px -1px 0 #353535,
          -1px 1px 0 #353535,
          1px 1px 0 #353535`
      }}>
        {onBreak ? 'Break Time' : 'Work Time'}
      </h2>

      <div style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        marginBottom: '1rem',
        color: '#a4c031',
        textShadow: `
          -1px -1px 0 #353535,
          1px -1px 0 #353535,
          -1px 1px 0 #353535,
          1px 1px 0 #353535`
      }}>
        {formatTime(secondsLeft)}
      </div>

      <div>
        {/* when this button is clicked ,  */}
        <button
          onClick={() => setIsRunning((r) => !r)}
          style={{
            padding: '0.8rem 1.2rem',
            fontSize: '1rem',
            margin: '0.5rem',
            borderRadius: '0.1875rem',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: onBreak ? '#a4c031' : '#565857',
            color: 'white'
          }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setOnBreak(false);
            setSecondsLeft(1 * 60);
          }}
          style={{
            padding: '0.8rem 1.2rem',
            fontSize: '1rem',
            margin: '0.5rem',
            borderRadius: '0.1875rem',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: onBreak ? '#a4c031' : '#565857',
            color: 'white'
          }}
        >
          Reset
        </button>
        {message && (
            <span
            style={{
                fontSize: '1.9rem',
                color: 'black',
                display: 'block',
                // marginTop: '0.5rem',
                // padding: '0.75rem 0 0 0'
                paddingBottom: '0.75rem',
                paddingTop: '0.5rem',
                fontWeight: 'bold',
            }}
            >
            {message}
            </span>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;
