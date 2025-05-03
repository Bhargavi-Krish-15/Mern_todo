const express = require('express');
const router = express.Router();
const PomodoroModel = require('../Models/Pomodoro');

module.exports.getPomodoro = async (req, res) => {
    try {
        const pomodoro = await PomodoroModel.findOne({ user: req.user._id });
        if (!pomodoro) {
            return res.status(404).json({ message: 'Pomodoro not found' });
        }
        res.status(200).json(pomodoro);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching Pomodoro', err });
    }
}

module.exports.startPomodoro = async (req, res) => {
    try{
        const { workDuration, breakDuration } = req.body;
        if (!workDuration || !breakDuration) {
            return res.status(400).json({ message: 'Please provide work and break durations' });
        }
        const pomodoro = await PomodoroModel.findOneAndUpdate(
      { user: userId },
      { workDuration, breakDuration },
      { new: true, upsert: true });
        if (!pomodoro) {
            return res.status(404).json({ message: 'Pomodoro not found' });
        }
        res.status(200).json({ message: 'Pomodoro started successfully', result: pomodoro });
    }
    catch(err){
        res.status(500).json({message: 'Error starting Pomodoro', err});
    }
}