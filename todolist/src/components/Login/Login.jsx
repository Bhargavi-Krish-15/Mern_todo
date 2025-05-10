// Login.jsx handles user authentication by collecting email and password.
// On successful login, it saves user data and navigates to the Home screen.

import React from 'react';
import axios from 'axios';
import { FaEye, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password
      }, {
        withCredentials: true
      });
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setMessage("Login successful");
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      setMessage("Invalid email or password");
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
        width: '100%',
        maxWidth: '42rem',
        marginTop: '2rem',
        textAlign: 'center',
        backgroundColor: '#a4c031',
        padding: '2rem',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
        backgroundImage: 'url("pattern.png")',
        //  padding doesn’t break the width.
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
        }}>Let's Get this Bread, Dive In..</h1>

        {message && <p style={{
          color: 'red',
          textAlign: 'center',
          fontSize: '1rem',
          marginBottom: '1rem'
        }}>{message}</p>}

        <form onSubmit={handleLogin} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
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
          }}>Login</button>

          <p style={{
            marginTop: '1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#a5c22f',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>Never been organized? <Link to="/register"><FaEye /></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;

