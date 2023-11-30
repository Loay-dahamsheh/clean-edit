const express = require('express');
const router = express.Router();

const employeeController = require('../Controllers/employeeController');

router.get('/homepage/getAllEmployees', employeeController.getAllEmployees);


module.exports = router;