
const TodoModel = require('../Models/Todo');
const express = require('express');
const router = express.Router();



module.exports.getTasks = async (req, res) => {
    try {
       const tasks = await TodoModel.find();
       if (!tasks) {
           return res.status(404).json({message: 'No tasks found'});
       }
       res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({message: 'Error fetching todos', error})
    }
}

module.exports.addTodo = async (req, res) => {
    try {
        const { task } = req.body;
        const newTodo = await TodoModel.create({
            task,
            user: req.user._id // add the todo with the respective logged-in user
        });
        res.status(200).json({ message: 'Todo added successfully', result: newTodo });
    } catch (err) {
        res.status(500).json({ message: 'Error adding todo', err });
    }
}

module.exports.deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await TodoModel.findOne({ _id: todoId });
        // Check if the todo exists
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        // Check if the user is authorized to delete the todo
        if (todo.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        // Delete the todo
        // The deleteOne method is used to delete the todo from the database
        const result = await TodoModel.deleteOne({ _id: todoId });
        res.status(200).json({ message: 'Todo deleted successfully', result });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting todo', err });
    }
}

module.exports.completeTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await TodoModel.findOne({ _id: todoId });
        // Check if the todo exists
        // If the todo does not exist, return an error response
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        // Check if the user is authorized to complete the todo
        if (todo.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        // Mark the todo as completed
        const result = await TodoModel.updateOne({ _id: todoId }, { completed: true });
        res.status(200).json({ message: 'Todo marked as completed', result });
    } catch (err) {
        res.status(500).json({ message: 'Error marking todo as completed', err });
    }
}

