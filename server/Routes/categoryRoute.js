const express = require('express');
const router = express.Router();

const categoryController = require('../Controllers/categoryController');



router.get('/homepage/category/:id', categoryController.getcategory);

module.exports = router;