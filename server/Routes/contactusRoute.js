const express = require('express');
const router = express.Router();

const contactusController = require('../Controllers/contactusController');


router.post('/contactus', contactusController.postcontactus);

//.............................................Dashboard contact us.........................................................................


router.get('/getcontactus', contactusController.getmessages);


module.exports = router;