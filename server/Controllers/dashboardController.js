const Dashboard = require('../Models/dashboardModel');
var multer  = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
// const user = require('../Models/dashboardModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
require('dotenv').config();


// Storage Image By Multer Start
let lastFileSequence = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    lastFileSequence++;
    const newFileName = `${Date.now()}_${lastFileSequence}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

const addImage = multer({ storage: storage });
const imageProduct = addImage.single('image');

// const storage = multer.diskStorage({
//   destination:  
//   filename: function (req, file, cb) {
//     cb(null, 'image-' + Date.now() + path.extname(file.originalname));
//   }
// });
// //client\src\assets\uploads  C:\Users\Orange\Desktop\New-wave\client\src\assets\uploads
// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
//       return cb(new Error('Please upload a valid image file'));
//     }
//     cb(null, true);
//   }
// }).single('image'); 


//.............................................Dashboard product.........................................................................



const createproduct = async (req, res) => {
    try {
      // upload(req, res, async function (err) {
      //   if (err) {
      //     return res.status(400).json({ success: false, error: err.message });
      //   }

        const image = req.file.filename

        const { product_name, product_detail, price, counts, category_id } = req.body;
        // const image = req.file ? req.file.filename : null;
        
    
        await Dashboard.createproduct(product_name, product_detail, image, price, counts, category_id);
    
        res.status(201).json({ success: true, message: 'Product added successfully' });
      // });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Product added failed' });
    }
  };
  
    
  
  
    const productdetail = async (req, res, next) => {
      const productId = req.params.id;
      try {
  
      
        
        const product = await Dashboard.productdetail(productId);
    
        const modifiedResponse = {
          success: true,
          product: product.map(item => {
            return {
              id: item.id,
              name: item.product_name,
              details: item.product_detail,
              category: item.category,
              images: JSON.parse(item.image), 
              price: item.price,
              counts: item.counts,
              image_url: `http://localhost:3001/uploads/${JSON.parse(item.image)}`
            };
          })
        };
        res.status(200).json(modifiedResponse); 
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error in getting product' });
      }
    };
  
  
  
  
    const updateproduct = async (req, res, next) => {
      try {
        upload(req, res, async function (err) {
          if (err) {
            return res.status(400).json({ success: false, error: err.message });
          }
          
          try {
            const { product_name, product_detail, price, counts, category_id } = req.body;
            const image = req.file ? req.file.filename : null;
            const productId = req.params.id;
            console.log(req.file);
            
            
            await Dashboard.updateproduct(productId, product_name, product_detail, image, price, counts, category_id);
            
            res.status(200).json({ success: true, message: 'Product updated successfully' });
          } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: 'Error updating product' });
          }
        });
      } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: 'Product update failed' });
      }
    };
    
  
    const deleteproduct = async(req,res,next) =>{
      try{
        const{is_deleted} = req.body;
        const productId = req.params.id;
        await Dashboard.deleteproduct(productId,is_deleted);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
      } catch(err){
        console.error(err);
        res.status(400).json({ success: false, error: 'Product deleted failed' });
      }
    }



    
    
      const allproducts = async (req, res, next) => {
    
        try {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 4;

          const product = await Dashboard.allproducts(page, limit);
      
          const modifiedResponse = {
            product: product.map(item => {
              return {
                id: item.id,
                name: item.product_name,
                details: item.product_detail,
                category: item.category,
                images: JSON.parse(item.image), 
                price: item.price,
                counts: item.counts,
                image_url: `http://localhost:3001/uploads/${JSON.parse(item.image)}`
              };
            })
          };
          res.status(200).json(modifiedResponse); 
        } 
        catch (err) {
            console.error(err);
            res.status(400).json({ success: false, error: 'Error in getting products' });
          }
        };



        
        







//.............................................Dashboard category.........................................................................








        

        const createcategory = async (req, res) => {
          try {
            // upload(req, res, async function (err) {
            //   if (err) {
            //     return res.status(400).json({ success: false, error: err.message });
            //   }
              
              const { category, /* other category fields */ } = req.body;
              // const image = req.file ? req.file.filename : null;
              
              await Dashboard.createCategory(category, image /* other category fields */);
          
              res.status(201).json({ success: true, message: 'Category added successfully' });
            // });
          } catch (err) {
            console.error(err);
            res.status(400).json({ success: false, error: 'Category added failed' });
          }
        };
        
        const categorydetail = async (req, res, next) => {
          const categoryId = req.params.id;
          try {
            const category = await Dashboard.categorydetail(categoryId);
        
            const modifiedResponse = {
              success: true,
              category: category.map(item => {
                return {
                  id: item.id,
                  name: item.category,
                  images: JSON.parse(item.cat_image), // Assuming cat_image is a JSON string containing image filenames
                  // Add other category details here if needed
                };
              })
            };
            res.status(200).json(modifiedResponse);
          } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: 'Error in getting category' });
          }
        };





        const updatecategory = async (req, res, next) => {
          try {
            upload(req, res, async function (err) {
              if (err) {
                return res.status(400).json({ success: false, error: err.message });
              }
              
              try {
                const { category } = req.body;
                const image = req.file ? req.file.filename : null;
                const categoryId = req.params.id;
                
                await Dashboard.updatecategory(categoryId, category, image /* other category fields */);
                
                res.status(200).json({ success: true, message: 'Category updated successfully' });
              } catch (err) {
                console.error(err);
                res.status(500).json({ success: false, error: 'Error updating category' });
              }
            });
          } catch (err) {
            console.error(err);
            res.status(400).json({ success: false, error: 'Category update failed' });
          }
        };
        



        const deletecategory = async (req, res, next) => {
          try {
            const categoryId = req.params.id;
            await Dashboard.deletecategory(categoryId);
            res.status(200).json({ success: true, message: 'Category deleted successfully' });
          } catch (err) {
            console.error(err);
            res.status(400).json({ success: false, error: 'Category deletion failed' });
          }
        };

//get categories after delete some from above
        const allcategories = async (req, res, next) => {
          try {
            const categories = await Dashboard.allcategories();
        
            const modifiedResponse = {
              categories: categories.map(item => {
                return {
                  id: item.id,
                  name: item.category,
                  images: JSON.parse(item.cat_image), // Assuming cat_image is a JSON string containing image filenames
                  // Add other category details here if needed
                  image_url: `http://localhost:3001/uploads/${JSON.parse(item.cat_image)}`
                };
              })
            };
            res.status(200).json(modifiedResponse);
          } catch (err) {
            console.error(err);
            res.status(400).json({ success: false, error: 'Error in getting categories' });
          }
        };
        

//.............................................Dashboard Employee.........................................................................


const addEmployee = async (req, res) => {
  try {
    // upload(req, res, async function (err) {
    //   if (err) {
    //     return res.status(400).json({ success: false, error: err.message });
    //   }

      const { emp_name, emp_position } = req.body;
      // const image = req.file ? req.file.filename : null;

      await Dashboard.addEmployee(emp_name, image, emp_position);

      res.status(201).json({ success: true, message: 'Employee added successfully' });
    // });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: 'Employee added failed' });
  }
};
        



        const getEmployeeDetails = async (req, res) => {
          try {
            const employeeId = req.params.id;
            const employee = await Dashboard.getEmployeeDetails(employeeId);
        
            if (!employee) {
              // Handle the case where the employee is not found
              res.status(404).json({ error: 'Employee not found' });
              return;
            }
        
            const modifiedResponse = {
              id: employee.id,
              name: employee.emp_name,
              images: JSON.parse(employee.emp_img), // Assuming emp_img is a JSON string containing image filenames
              position: employee.emp_position,
              // Add other employee details here if needed
            };
        
            res.status(200).json({ success: true, employee: modifiedResponse });
          } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, error: 'Error in getting employee' });
          }
        };



        const updateEmployee = async (req, res, next) => {
          try {
            upload(req, res, async function (err) {
              if (err) {
                return res.status(400).json({ success: false, error: err.message });
              }
        
              try {
                const employeeId = req.params.id;
                const { emp_name, emp_position } = req.body;
                const image = req.file ? req.file.filename : null;
        
                await Dashboard.updateEmployee(employeeId, emp_name, image, emp_position);
        
                res.status(200).json({ success: true, message: 'Employee updated successfully' });
              } catch (err) {
                console.error(err);
                res.status(500).json({ success: false, error: 'Error updating employee' });
              }
            });
          } catch (err) {
            console.error(err);
            res.status(400).json({ success: false, error: 'Employee update failed' });
          }
        };
        



        const deleteemployee = async (req, res) => {
          

          try {
            
            const employeeId = req.params.id;
        
            await Dashboard.deleteemployee(employeeId);

            
        
            res.status(200).json({ success: true, message: 'Employee deleted successfully' });
            
          } catch (err) {
            console.error(err);
            res.status(400).json({ success: false, error: 'Employee deletion failed' });
          }
        };

        


        const getAllEmployees = async (req, res) => {
          try {
            const employees = await Dashboard.getAllEmployees();
        
            const modifiedResponse = {
              employees: employees.map(item => {
                return {
                  id: item.id,
                  name: item.emp_name,
                  image: JSON.parse(item.emp_img), 
                  position: item.emp_position,
                  image_url: `http://localhost:3001/uploads/${JSON.parse(item.emp_img)}`
                };
              })
            };
        
            res.status(200).json(modifiedResponse);
          } catch (err) {
            console.error(err);
            res.status(400).json({ success: false, error: 'Error in getting employees' });
          }
        };




//.............................................Dashboard users.........................................................................

async function getallusers(req, res) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 10;

      // Calculate the offset based on page and pageSize
      const offset = (page - 1) * pageSize;
    const users = await Dashboard.Users(offset, pageSize);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(401).json('error in getallusers controller');
  }
}



async function updateusers(req, res) {
  try {
      const userId = req.params.userId;
      // console.log(userId);
      // const newData = req.body;
      const result = await Dashboard.deleteUser(userId);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(401).json('error in updateusers controller');
  }
}





const adminSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone_number: Joi.string().optional(),
});

// Validation function for admin registration
function adminValidation(username, email, password) {
  const valid = adminSchema.validate({ username, email, password });
  return valid.error === undefined;
}

// Function to register a new admin
async function registerAdmin(req, res) {
  try {
      const { username, email, password, phone_number } = req.body;
      const valid = adminValidation(username, email, password);

      if (valid) {
          const hashPassword = await bcrypt.hash(password, 10);
          const add =  Dashboard.addAdmin(username, email, hashPassword, phone_number, 2); // 2 is the role_id for admin
          add.then((result) => {
              res.status(201).json("Admin added successfully");
          }).catch((error) => {
              res.status(400).json(error.detail);
          });
      } else {
          res.status(400).json({ error: "Values are not valid or one is missing" });
      }
  } catch (error) {
    console.log(error)
      res.status(501).json(error);
  }
}


    module.exports = {
        createproduct,
        productdetail,
        updateproduct,
        deleteproduct,
        allproducts,


        createcategory,
        categorydetail,
        updatecategory,
        deletecategory,
        allcategories,
        
        
        addEmployee,
        getEmployeeDetails,
        updateEmployee,
        deleteemployee,
        getAllEmployees,


        getallusers,
        updateusers,
        registerAdmin,
        imageProduct

      };