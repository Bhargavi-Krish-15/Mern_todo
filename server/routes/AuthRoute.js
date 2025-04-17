const { Register, Login, Logout} = require('../controller/AuthController');
const { userVerification } = require('../middleware/AuthMiddleware');
const router = require('express').Router();

//the /register route has a post method attached to it, when it's been called, 
// the Register controller will be executed.

router.post('/register', Register);
router.post("/login", Login);
router.post("/", userVerification);
router.get('/logout', Logout)

module.exports = router;