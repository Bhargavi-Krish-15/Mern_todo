const express = require('express');
const NoteModel = require('../Models/Notes');
const router = express.Router();
const { userVerification } = require('../middleware/AuthMiddleware');
const {getNotes, addNote, updateNote, deleteNote} = require('../controller/NotesController');


router.get('/get', userVerification, getNotes);
router.post('/add', userVerification, addNote); 
router.put('/edit/:id', userVerification, updateNote);
router.delete('/delete/:id', userVerification, deleteNote);


module.exports = router;