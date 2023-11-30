const express = require('express');
const router = express.Router();
const userProfileController = require('../Controllers/userprofileController');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const middleware = require("../Middleware/authorization")


router.get('/userInfo' ,middleware.authorize, userProfileController.information);
router.post('/adduserimage',middleware.authorize,userProfileController.userimage);
router.put('/updateuserimage', middleware.authorize, userProfileController.updateUserImage);
router.get('/wishlist', userProfileController.wishlist);
router.get('/history',middleware.authorize, userProfileController.history);
router.post('/addwishlist/:id', userProfileController.addtowishlist);
router.put('/edituser',middleware.authorize, userProfileController.editInformation);
router.delete('/editwishlist/:id', userProfileController.editWishlist);
router.post('/logout', userProfileController.logout);



module.exports = router;