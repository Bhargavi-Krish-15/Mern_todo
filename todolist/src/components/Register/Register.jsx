// Register.jsx handles user account creation by collecting username, email, and password.
// On successful registration, it redirects the user to the login page.


import React from 'react';
import axios from 'axios';
import { FiLogIn } from "react-icons/fi";
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  // useNavigate is a hook from react-router-dom that allows you to programmatically navigate
  const navigate = useNavigate();

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/register", {
        username,
        email,
        password
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage("Registration successful");
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      setMessage("Error registering user");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f8f8',
      backgroundImage: 'url("pattern.png")',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        // keeps the large-screen layout as it is
        width: '100%',
        maxWidth: '42rem',
        marginTop: '2rem',
        textAlign: 'center',
        backgroundColor: '#a4c031',
        padding: '2rem',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
        backgroundImage: 'url("pattern.png")',
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          fontSize: '2.6rem',
          color: 'white',
          fontFamily: 'fantasy',
          margin: 0
        }}>Personal HUB</h1>
        <p style={{
          fontSize: '1.2rem',
          color: 'white',
          marginTop: '0.5rem'
        }}>StayPlanned StayProductive</p>
      </div>
      <div style={{
        width: '100%',
        maxWidth: '42rem',
        backgroundColor: 'white',
        padding: '3rem',
        borderBottomLeftRadius: '1rem',
        borderBottomRightRadius: '1rem',
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '2rem',
          color: '#3f3f3f'
        }}>Plan. Act. Conquer.</h1>

        {message && <p style={{
          color: 'red',
          textAlign: 'center',
          fontSize: '1rem',
          marginBottom: '1rem'
        }}>{message}</p>}

        <form onSubmit={handleRegister} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ position: 'relative', marginBottom: '1.5rem', width: '100%' }}>
            <FaUser style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#a4c031',
              opacity: 0.7,
              fontSize: '1.2rem'
            }} />
            <input
              type="text"
              placeholder="Username"
              style={{
                padding: '1rem 1rem 1rem 3rem',
                width: '100%',
                fontSize: '1rem',
                borderRadius: '0.5rem',
                border: '0.125rem solid #ccc',
                boxSizing: 'border-box'
              }}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={{ position: 'relative', marginBottom: '1.5rem', width: '100%' }}>
            <FaEnvelope style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#a4c031',
              opacity: 0.7,
              fontSize: '1.2rem'
            }} />
            <input
              type="email"
              placeholder="Email"
              style={{
                padding: '1rem 1rem 1rem 3rem',
                width: '100%',
                fontSize: '1rem',
                borderRadius: '0.5rem',
                border: '0.125rem solid #ccc',
                boxSizing: 'border-box'
              }}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ position: 'relative', marginBottom: '1.5rem', width: '100%' }}>
            <FaLock style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#a4c031',
              opacity: 0.7,
              fontSize: '1.2rem'
            }} />
            <input
              type="password"
              placeholder="Password"
              style={{
                padding: '1rem 1rem 1rem 3rem',
                width: '100%',
                fontSize: '1rem',
                borderRadius: '0.5rem',
                border: '0.125rem solid #ccc',
                boxSizing: 'border-box'
              }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#a4c031',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}>Register</button>

          <p style={{
            marginTop: '1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#a5c22f',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>Already have an account? <Link to="/login"><FiLogIn /></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
