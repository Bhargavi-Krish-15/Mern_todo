const express = require('express');
const PomodoroModel = require('../Models/Pomodoro');
const { getPomodoro, startPomodoro } = require('../controller/PomodoroController');
const router = express.Router();
const { userVerification } = require('../middleware/AuthMiddleware');

router.get('/get', userVerification, getPomodoro);
router.post('/start', userVerification, startPomodoro);

module.exports = router;