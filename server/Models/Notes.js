const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 50, unique: true },
    content: { type: String, required: true },
    category: { type: String, default: 'General', required: true, maxlength: 20, enum: ['General', 'Work', 'Personal', 'Study', 'HouseHold', 'Health'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const NoteModel = mongoose.model('Note', NoteSchema);
module.exports = NoteModel;