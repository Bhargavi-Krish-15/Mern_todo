const notesModel = require('../Models/Notes');
const express = require('express');
const router = express.Router();

module.exports.getNotes = async (req, res) => {
    try{
        const notes = await notesModel.find({ user: req.user._id });
        if(!notes || notes.length === 0){
            return res.status(404).json({message: 'No notes found'});
        }
        res.status(200).json(notes);
    }
    catch(err){
        res.status(500).json({message: 'Error fetching notes', err})
    }
}

module.exports.addNote = async (req, res) => {
    try{
        const { title, content, category } = req.body;
        if(!title || !content || !category){
            return res.status(400).json({message: 'Please fill all fields'});
        }
        if(title.length > 50){
            return res.status(400).json({message: 'Title should be less than 50 characters'});
        }
        const newNote = await notesModel.create({
            title,
            content,
            category,
            user: req.user._id // add the note with the respective logged-in user
        })
        res.status(200).json({ message: 'Note added successfully', result: newNote });
    }
    catch(err){
        res.status(500).json({message: 'Error adding note', err})
    }
}

module.exports.updateNote = async (req, res) => {
    try{
        const noteId = req.params.id;
        const { title, content, category } = req.body;
        console.log("Received Data:", req.body);
        console.log("Note ID:", noteId);
        console.log("User ID:", req.user._id);


        if(!title || !content || !category){
            return res.status(400).json({message: 'Please fill all fields'});
        }
        const note = await notesModel.findOne({ _id: noteId });
        // Check if the note exists
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        // Check if the user is authorized to update the note
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        // Update the note
        const updatedNote = await notesModel.findByIdAndUpdate({ _id: noteId }, { title, content, category }, { new: true });
        console.log("Updated Note:", updatedNote);
        res.status(200).json({ message: 'Note updated successfully', result: updatedNote });
    }
    catch(err){
        res.status(500).json({message: 'Error updating note', error: err.message})
    }
}

module.exports.deleteNote = async (req, res) => {
    try{
        const noteId = req.params.id;
        const note = await notesModel.findOne({ _id: noteId });
        // Check if the note exists
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        // Check if the user is authorized to delete the note
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        // Delete the note
        const result = await notesModel.deleteOne({ _id: noteId });
        res.status(200).json({ message: 'Note deleted successfully', result });
    }
    catch(err){
        res.status(500).json({message: 'Error deleting note', err})
    }
}
