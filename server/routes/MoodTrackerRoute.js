const express = require('express');
const MoodTracker = require('../Models/MoodTracker');
const router = express.Router();
const { userVerification } = require('../middleware/AuthMiddleware');
const { getTodayMood, setTodayMood } = require('../controller/MoodTrackerController');

router.get('/get', userVerification, getTodayMood);
router.post('/set', userVerification, setTodayMood);

module.exports = router;