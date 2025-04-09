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
require('dotenv').config();
const app = express();


const cookieParser = require('cookie-parser');
const authRoute = require('./routes/AuthRoute');

app.use(cors({
    origin: 'http://localhost:5175',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

//The cookie-parser manages cookie-based sessions or extracts data from cookies.
//It's added to the code above along with the authRoute that the application will utilize.
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);

mongoose.connect('mongodb+srv://admin:admin1234@cluster0.oytyhsh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.log('Error connecting to MongoDB', err);
})

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({message: 'Error fetching todos', err})
    })
}
)

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({task: task})
    .then(result => {
        res.status(200).json({message: 'Todo added successfully', result})
    })
    .catch(err => {
        res.status(500).json({message: 'Error adding todo', err})
    })
})

app.delete('/delete/:id', (req, res) => {
    const todoId = req.params.id;
    TodoModel.deleteOne({_id: todoId})
    .then(result => {
        res.status(200).json({message: 'Todo deleted successfully', result})
    })
    .catch(err => {
        res.status(500).json({message: 'Error deleting todo', err})
    })
})

app.put('/complete/:id', (req, res) => {
    const todoId = req.params.id;
    TodoModel.updateOne({_id: todoId}, {completed: true})
    .then(result => {
        res.status(200).json({message: 'Todo marked as completed', result})
    })
    .catch(err => {
        res.status(500).json({message: 'Error marking todo as completed', err})
    })
})

app.listen(4000, () => {
  console.log('Server is running on port 4000');
})