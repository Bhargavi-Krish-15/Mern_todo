//he code above checks if the user has access to the route by checking if the tokens match.

const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//  module.exports.userVerification = async (req, res) => {
//     // Check if the token is present in the request cookies
//     // If the token is not present, return an unauthorized response
//     // The token is sent as a cookie to the client for authentication
//     try {
//     const token = req.cookies.access_token;
//     if(!token){
//         return res.status(401).json({message: 'Unauthorized', status: false});
//     }
//     // Verify the token using the secret key
//     // The secret key is used to sign the token when it is created
//     // The secret key is stored in the environment variable TOKEN_KEY
//     // The token is verified using the jwt.verify method
    
//     jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//         if (err) {
//         return res.json({ message:"Unauthorized" , status: false })
//         } else {
//         const user = await User.findById(data.id)
//         if (user) return res.json({ message:"User found", status: true, user: user.username })
//         else return res.json({ message: "User not found", status: false })
//         }
        
//     });
//     next();
//  }
//     catch (err) {
//         return res.status(500).json({ message: "Invalid Token", status: false })
//     }
//  }

// const User = require('../Models/User');
// const jwt = require('jsonwebtoken');

module.exports.userVerification = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies.access_token || 
                 (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided', status: false });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    
    // Find user by id
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found', status: false });
    }
    
    // Add user to request
    req.user = user;
    
    // Continue to next middleware/route handler
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token', status: false });
  }
};