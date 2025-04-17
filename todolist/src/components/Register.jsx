import React from 'react'
import axios from 'axios'
import {FaSignInAlt} from 'react-icons/fa';

const Register = () => {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    
    const handleRegister = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        // Create a respone with the email and password
        try{
            const response = await axios.post("http://localhost:4000/register", {
                username: username,
                email: email,
                password: password
            },{
                // Set the withCredentials option to true
                // This is used to include cookies in the request
                // This is important for authentication and session management
                // It allows the server to identify the user and maintain their session
                withCredentials: true
            })
            console.log("response"+ JSON.stringify(response, null, 2));
            // Check if the response status is true
            if(response.data.success){
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setMessage("Registration successful");
                // Redirect to the home page after successful login
                window.location.href = '/login';
            }
        }catch(err){
            console.log(err);
            setMessage("Error registering user");
        }
    }

  return (
    <div className='register'>
        <div className='register_container'>
            <h1 className='welcome_user'>Register</h1>
            <p>{message}</p>
            <form onSubmit={ handleRegister }>
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} required/><br/>
                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/><br/>
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/><br/>
                <button type="submit">Register</button>
                <p className='register_user'>Already have an account? 
                    <a href='/login'><FaSignInAlt/></a>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Register