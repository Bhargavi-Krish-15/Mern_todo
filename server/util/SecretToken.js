// require("dotenv").config();
const dotenv = require('dotenv');
dotenv.config(); 
const jwt = require("jsonwebtoken");


// This function creates a secret token using the user's id and a secret key
// The token is signed with the secret key and has an expiration time of 3 days
// The token is used for authentication and authorization purposes
// It is typically sent in the headers of requests to secure endpoints
// The token is created using the jsonwebtoken library
module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};