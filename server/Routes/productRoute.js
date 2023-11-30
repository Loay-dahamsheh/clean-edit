const express = require('express');
const router = express.Router();

const productController = require('../Controllers/productController');

router.get('/secondpage/getallproducts', productController.getallP);
router.get('/secondpage/category/:id', productController.getproduct);


module.exports = router;