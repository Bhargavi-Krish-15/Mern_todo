import React from 'react'
import axios from 'axios'
import{FaEye, FaEnvelope, FaLock} from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleLogin = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        // Create a respone with the email and password
        try{
            const response = await axios.post("http://localhost:4000/login", {
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
                setMessage("Login successful");
                // Redirect to the home page after successful login
                window.location.href = '/';
            }
        }catch(err){
            console.log(err);
            setMessage("Invalid email or password");
        }
    }


  return (
    <div className='login'>
        <div className='green_container brand_section'>
            <h1>TaskHUB</h1>
            <p>StayPlanned StayProductive</p>
        </div>
        <div className='login_container'>
            <h1 className='tag_line'>Let's Get this Bread, Dive In..</h1>
            <br/>
            <p>{message}</p>
            <form onSubmit={ handleLogin } className='login_form'>
                <div className='input_group'>
                    <FaEnvelope className='mail_icon'/>
                    <input typer="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/> <br/>
                </div>
                <div className='input_group'>
                    <FaLock className='mail_icon'/>
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/><br/>
                </div>
                <button type="submit">Login</button>
                <p className='new_user'>Never been organized?
                    <a href='/register'><FaEye /></a>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Login