const mongoose = require('mongoose');

const PomodoroSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    workDuration: { type: Number, default: 1 },
    breakDuration: { type: Number, default: 1 },
});

const PomodoroModel = mongoose.model('Pomodoro', PomodoroSchema);
module.exports = PomodoroModel;