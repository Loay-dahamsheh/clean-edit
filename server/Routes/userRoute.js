const express = require('express');
const router = express.Router();
const usercontroller = require('../Controllers/userController');
const middleware = require('../Middleware/authorization');



router.post('/register', usercontroller.register);
router.post('/login', usercontroller.login);
router.get('/j/protected', middleware.authorize, usercontroller.cont);
router.post('/adminlogin', usercontroller.adminLogin);

module.exports = router;