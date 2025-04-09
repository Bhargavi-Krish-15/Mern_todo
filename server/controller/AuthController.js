const User = require('../Models/User');
const bcrypt = require('bcrypt');
const { createSecretToken } = require('../util/SecretToken');

module.exports.Register = async (req, res, next) => {
    try{
        // Extract the username, password, and email from the request body
        //use the values obtained from req.body to create the new user after that has occurred.
        const {username, password, email} = req.body;

        // Check if the user already exists
        // If the user already exists, return an error response
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        // If the user does not exist, create a new user
        const newUser = await User.create({username, password, email});
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
        next();
    }catch(err){
        res.status(500).json({message: 'Error registering user', err})
    }
}