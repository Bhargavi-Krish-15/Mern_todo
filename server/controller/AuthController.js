const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const { createSecretToken } = require('../util/SecretToken');


module.exports.Register = async (req, res) => {
    try{
        console.log("request body: "+ req.body);
        console.log("inside the register function");
        // Extract the username, password, and email from the request body
        //use the values obtained from req.body to create the new user after that has occurred.
        const {username, password, email} = req.body;
        console.log("username: "+ username);
        // Check if the user already exists
        // If the user already exists, return an error response
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        // If the user does not exist, create a new user
        const newUser = new User({
            username,
            password,
            email
        });
        console.log("new user"+ newUser)
        console.log("user saved successfully insde the register function");
        await newUser.save();
        // Create a token for the user
        //MongoDB always assigns a new user with a unique _id
        const accessToken = createSecretToken(newUser._id);
        // Send the token to the client
        // Set the token as a cookie in the response
        // The token is sent as a cookie to the client for authentication
        //The cookie will be sent to the client with key of "access_token", and value of accessToken.
        res.cookie('access_token', accessToken, {
            // Set the cookie options
            withCredentials: true,
            httpOnly: false,
            
        });
        res.status(201).json({message: "User created successfully", success: true, newUser});
        
    }catch(err){
        console.log("inside the register function catch block");
        res.status(500).json({message: 'Error registering user', message: 'error message:'+err.message})
    }
}

module.exports.Login = async (req, res) => {
    try{
        const {email, password} = req.body;
        // Find the user by email
        if(!email || !password){
            return res.status(400).json({message: 'Please fill all fields'});
        }
        const user = await User.findOne({email});
        // If the user does not exist, return an error response
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        // Check if the password is correct
        // The password is compared using bcrypt's compare function
        const correctPassword = await bcrypt.compare(password, user.password);
        // If the password is incorrect, return an error response
        if(!correctPassword){
            return res.status(400).json({message: 'Incorrect password'});
        }
        // Create a token for the user
        //MongoDB always assigns a new user with a unique _id
        const accessToken = createSecretToken(user._id);
        // Send the token to the client
        // Set the token as a cookie in the response
        // The token is sent as a cookie to the client for authentication
        res.cookie('access_token', accessToken, {
            // Set the cookie options
            withCredentials: true,
            httpOnly: false,
           
        });
        res.status(200).json({message: "User logged in successfully", success: true, user});
        
    }
    catch(err){
        res.status(500).json({message: 'Error logging in', message: err.message})
    }
}