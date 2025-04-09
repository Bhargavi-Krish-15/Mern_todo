const { Register} = require('../controller/AuthController');
const router = require('express').Router();

//the /register route has a post method attached to it, when it's been called, 
// the Register controller will be executed.
router.post('/register', Register);

module.exports = router;