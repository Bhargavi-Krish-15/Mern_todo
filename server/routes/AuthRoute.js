const { Register, Login} = require('../controller/AuthController');
const router = require('express').Router();

//the /register route has a post method attached to it, when it's been called, 
// the Register controller will be executed.
console.log("inside the AuthRoute.js file");
router.post('/register', Register);
console.log("after the register route");
//the /login route has a post method attached to it, when it's been called,
router.post("/login", Login);

module.exports = router;