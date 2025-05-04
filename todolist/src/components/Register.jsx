import React from 'react'
import axios from 'axios'
import { FiLogIn } from "react-icons/fi";
import{FaEnvelope, FaLock, FaUser} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    const navigate = useNavigate();
    
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
                // window.location.href = '/login';
                navigate('/login');
            }
        }catch(err){
            console.log(err);
            setMessage("Error registering user");
        }
    }

  return (
    <div className='login'>
        <div className='green_container brand_section'>
            <h1>TaskHUB</h1>
            <p>StayPlanned StayProductive</p>
        </div>
        <div className='login_container'>
            <h1 className='tag_line'>Plan. Act. Conquer.</h1>
            <br/>
            <p>{message}</p>
            <form onSubmit={ handleRegister }>
                <div className='input_group'>
                    <FaUser className='mail_icon'/>
                    <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} required/><br/>
                </div>
                <div className='input_group'>
                    <FaEnvelope className='mail_icon'/>
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/><br/>
                </div>
                <div className='input_group'>
                    <FaLock className='mail_icon'/>
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/><br/>
                </div>
                <button type="submit">Register</button>
                <p className='new_user'>Already have an account? 
                    <a href='/Mern_todo/login'><FiLogIn/></a>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Register