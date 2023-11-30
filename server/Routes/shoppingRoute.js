const express = require('express');
const router = express.Router();
const shoppingController = require('../Controllers/shoppingController');

const middleware = require("../Middleware/authorization")



router.post('/addtocart/:id',middleware.authorize,shoppingController.addtocart);
router.get('/shoppingcart',middleware.authorize,shoppingController.getcartproducts);
router.put('/product/delete/:id',middleware.authorize,shoppingController.deleteproduct);
router.get('/shoppingcart/totalprice',middleware.authorize,shoppingController.totalprice);
router.post('/shoppingcart/checkout',middleware.authorize,shoppingController.createCheckoutSession);
router.post('/booking',middleware.authorize,shoppingController.postbooking);
router.get('/getbooking',middleware.authorize,shoppingController.getbooking);


module.exports = router;