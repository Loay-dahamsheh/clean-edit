const userProfileModel = require('../Models/userprofileModel');
const Joi = require('joi');
require('dotenv').config();
const bcrypt = require('bcrypt');
var multer  = require('multer');
const path = require('path');
const bodyParser = require('body-parser');






const storage = multer.diskStorage({
    destination: 'C:/Users/Orange/Desktop/masterP-Back-End 1/client/src/assets/uploads', 
    filename: function (req, file, cb) {
      cb(null, 'image-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        return cb(new Error('Please upload a valid image file'));
      }
      cb(null, true);
    }
  }).single('image'); 





const schema = Joi.object({
    username : Joi.string().alphanum().min(3).max(10).required(),
    email : Joi.string().email().required(),
    password : Joi.string().required(),
});

function validation(username = "anything", email = "anything", password = "anything"){
    const valid = schema.validate({username, email, password});
    if (valid.error == undefined){
        return true;
    }else {
        return false;
    }
};

async function information(req, res){
    try{
         const userID = req.user.id;
        // const userID = 10;
        const theUser = await userProfileModel.getInformation(userID);
        res.status(200).json(theUser);
    } catch(error){
        
        res.status(500).json(error);
    }
};



const userimage = async (req, res) => {
    try {
        const userID = req.user.id;
        // console.log(userID)
      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ success: false, error: err.message });
        }
        
        const { /* other category fields */ } = req.body;
        const image = req.file ? req.file.filename : null;
        
        await userProfileModel.createimage(userID,image /* other category fields */);
    
        res.status(201).json({ success: true, message: 'Category added successfully' });
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Category added failed' });
    }
  };




  const updateUserImage = async (req, res, next) => {
    try {
      const userID = req.user.id;
  
      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ success: false, error: err.message });
        }
  
        const { /* other category fields */ } = req.body;
        const image = req.file ? req.file.filename : null;
                //   await Dashboard.updateEmployee(employeeId, emp_name, image, emp_position);

        // Assuming you have a function to retrieve the current user image
        // const currentUser = await userProfileModel.getUserByID(userID);
        // const currentImage = currentUser.user_image;
  
        // Delete the current image file (optional)
        // if (currentImage) {
        // //   Implement a function to delete the old image file
        //   deleteImageFile(currentImage);
        // }
  
        // Update the user image in the database
        await userProfileModel.updateUserImage(userID, image, /* other category fields */);
  
        res.status(200).json({ success: true, message: 'Image updated successfully' });
      });
    } catch (err) {
      console.error(err);
      res.status(401).json({ success: false, error: 'Image update failed' });
    }
  };
  



async function wishlist(req, res){
    try{
        const userID = req.user.id;
        // const userID = 10;
        const wishlist = await userProfileModel.getWishlist(userID);
        res.status(200).json(wishlist);
    } catch(error){
        res.status(500).json(error);
    }
};


async function history(req, res){
    try{
        const userID = req.user.id;
        // console.log(userID);
        // const userID = 10;
        const history = await userProfileModel.getHistory(userID);
        res.status(200).json(history);
    } catch(error){
        res.status(500).json(error);
    }
};



async function addtowishlist(req, res){
    try{
        const userID = 10;
        const productID = req.params.id;
        const wishlistmodel = await userProfileModel.addwish(userID,productID);
        res.status(200).json(wishlistmodel);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};



async function editInformation(req, res){
    try{
      console.log(req.user.id);
      const userID = req.user.id;
        const {username, email, phone_number, password} = req.body;
        console.log(req.body);
        let newData = validation(username, email, phone_number, password);
        console.log(newData);
        if (newData){
            const hashPassword = await bcrypt.hash(password, 10);
            console.log(hashPassword);

            const newuser = await userProfileModel.editInfo(userID, username, email, phone_number, hashPassword);
            console.log(newuser);
            res.status(200).json(newuser);
        }else {
            res.status(400).json("invalid inputs");
        }
    } catch(error){
        res.status(500).json(error);
    }
};



async function editWishlist(req, res){
    try{
        const id = req.params.id;
        const userID = 10;
        const wishlist = await userProfileModel.deleteFromWishlist(id, id);
        res.status(200).json(wishlist);
    } catch(error){
        res.status(500).json(error);
    }
};



async function logout(req, res){
    try{
        const userID = 10;
        const offline = userProfileModel.off(userID);
        res.clearCookie('token');
        
        res.status(200).json("logout")
        // res.redirect('/login'); for somewere
    }catch(error){console.log(error)
        res.status(500).json(error);
    }
}


module.exports = {
    information,
    userimage,
    updateUserImage,
    wishlist,
    history,
    addtowishlist,
    editInformation,
    editWishlist,
    logout
    
};