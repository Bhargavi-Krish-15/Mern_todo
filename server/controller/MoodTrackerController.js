const MoodTrackerModel = require('../Models/MoodTracker');
const express = require('express');
const router = express.Router();

const getTodayDate = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
};

module.exports.getTodayMood = async (req, res) => {
    try {
        const today = getTodayDate();
        const mood = await MoodTrackerModel.findOne({
        user: req.user._id,
        date: today,
        });
    
        if (!mood) {
        return res.status(404).json({ message: 'No mood found for today' });
        }
    
        res.status(200).json(mood);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching mood', err });
    }
}

module.exports.setTodayMood = async (req, res) => {
    try {
        const { mood } = req.body;
        const today = getTodayDate();
    
        if (!mood) {
            return res.status(400).json({ message: 'Please provide a mood' });
        }
    
        const existingMood = await MoodTrackerModel.findOne({
            user: req.user._id,
            date: today,
        });
    
        if (existingMood) {
            existingMood.mood = mood;
            await existingMood.save();
            return res.status(200).json({ message: 'Mood updated successfully', result: existingMood });
        }
    
        const newMood = await MoodTrackerModel.create({
            user: req.user._id,
            date: today,
            mood,
        });
    
        res.status(200).json({ message: 'Mood set successfully', result: newMood });
    } catch (err) {
        res.status(500).json({ message: 'Error setting mood', err });
    }
}