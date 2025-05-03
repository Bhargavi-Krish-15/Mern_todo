const mongoose = require('mongoose');

const MoodTrackerSchema = new mongoose.Schema({
    mood: { type: String, required: true, enum: ['happy', 'sad', 'neutral'], default: 'happy' },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// The unique constraint is applied to the combination of user and date (truncated to the day) to ensure that a user can only have one mood entry per day when writing notes.
MoodTrackerSchema.index({ user: 1, date: { $trunc: { $date: "$date" } } }, { unique: true });

const MoodTracker = mongoose.model('MoodTracker', MoodTrackerSchema);
module.exports = MoodTracker;