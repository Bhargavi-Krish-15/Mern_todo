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
const dotenv = require('dotenv');
dotenv.config({ path: './.env' }); 
const connectDB = require('./db');
connectDB();


const app = express();

app.use(cors({origin: '*',}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);

app.use("/get" , (req, res) => {
  res.send("Hello World")
}
)

app.use("/todo", TodoRoutes);



const port = process.env.PORT

if (!port) {
  console.error('Error: PORT environment variable is not set.');
  process.exit(1); 
}
app.listen(port, () => {
  console.log('Server is running on port ' + port);
})

