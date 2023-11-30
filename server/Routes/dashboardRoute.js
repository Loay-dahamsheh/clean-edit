const dashboardController = require('../Controllers/dashboardController');
const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());


router.post('/dashboard/addproduct', dashboardController.imageProduct, dashboardController.createproduct);
//router.post('/dashboard/product/:id/addproductimage',dashboardController.addproductimage);
router.get('/dashboard/product/:id', dashboardController.productdetail);
router.put('/dashboard/product/update/:id', dashboardController.updateproduct);
router.put('/dashboard/product/delete/:id', dashboardController.deleteproduct);
router.get('/dashboard/allproducts', dashboardController.allproducts);


router.post('/dashboard/addcategory',dashboardController.imageProduct,dashboardController.createcategory);
router.get('/dashboard/category/:id', dashboardController.categorydetail);
router.put('/dashboard/category/update/:id', dashboardController.updatecategory);
router.put('/dashboard/category/delete/:id', dashboardController.deletecategory);
router.get('/dashboard/allcategories', dashboardController.allcategories);


router.post('/dashboard/addemployee',dashboardController.imageProduct,dashboardController.addEmployee);
router.get('/dashboard/employee/:id', dashboardController.getEmployeeDetails);
router.put('/dashboard/employee/update/:id', dashboardController.updateEmployee);
router.put('/dashboard/employee/delete/:id', dashboardController.deleteemployee);
router.get('/dashboard/allemployees', dashboardController.getAllEmployees);

router.get('/getallusers', dashboardController.getallusers);
router.put('/delete/:userId', dashboardController.updateusers);
router.post('/registerAdmin', dashboardController.registerAdmin);



module.exports = router;