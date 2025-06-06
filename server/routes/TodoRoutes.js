const express = require('express');
const TodoModel = require('../Models/Todo');
const router = express.Router();
const { userVerification } = require('../middleware/AuthMiddleware');
const { getTasks, addTodo, deleteTodo, completeTodo } = require('../controller/TodoController');

    router.get('/get', userVerification, getTasks);
    router.post('/add', userVerification, addTodo);
    router.delete('/delete/:id', userVerification, deleteTodo);
    router.put('/complete/:id', userVerification, completeTodo);

    // router.get('/get', getTasks);
    // router.post('/add', (req, res) => {
    //     const task = req.body.task;
    //     TodoModel.create({task: task})
    //     .then(result => {
    //         res.status(200).json({message: 'Todo added successfully', result})
    //     })
    //     .catch(err => {
    //         res.status(500).json({message: 'Error adding todo', err})
    //     })
    // })

    // router.delete('/delete/:id', (req, res) => {
    //     const todoId = req.params.id;
    //     TodoModel.deleteOne({_id: todoId})
    //     .then(result => {
    //         res.status(200).json({message: 'Todo deleted successfully', result})
    //     })
    //     .catch(err => {
    //         res.status(500).json({message: 'Error deleting todo', err})
    //     })
    // })

    // router.put('/complete/:id', (req, res) => {
    //     const todoId = req.params.id;
    //     TodoModel.updateOne({_id: todoId}, {completed: true})
    //     .then(result => {
    //         res.status(200).json({message: 'Todo marked as completed', result})
    //     })
    //     .catch(err => {
    //         res.status(500).json({message: 'Error marking todo as completed', err})
    //     })
    // })

module.exports = router;
