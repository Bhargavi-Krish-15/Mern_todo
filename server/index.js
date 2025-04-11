// File: server/index.js
// Importing required modules
// This file is the entry point of the server application
// It sets up the server, connects to the database, and defines the API endpoints
// It uses Express.js for routing and Mongoose for database interactions
// It also uses CORS for cross-origin resource sharing and cookie-parser for parsing cookies

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/AuthRoute');
const TodoRoutes = require('./routes/TodoRoutes');
const connectDB = require('./db');

//1) first load teh env variables
const dotenv = require('dotenv');
dotenv.config({ path: './.env' }); 
//2)initialize the express application
const app = express();
// 3) Configure CORS middleware
app.use(cors({
  origin: '*',
}));
// 4) Parse cookies and JSON
//The cookie-parser manages cookie-based sessions or extracts data from cookies.
//It's added to the code above along with the authRoute that the application will utilize.
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 5. Connect to MongoDB
connectDB();

//6) Routes
app.use("/", authRoute);
console.log("after using authRoute");
app.use("/todo", TodoRoutes);


//7) Start the server
app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
})