const user = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
require('dotenv').config();

const schema = Joi.object({
    username : Joi.string().alphanum().min(3).max(10).required(),
    email : Joi.string().email().required(),
    password : Joi.string().required(),
});

function validation(username, email, password){
    const valid = schema.validate({username, email, password});
    if (valid.error == undefined){
        return true;
    }else {
        return false;
    }
};

async function register(req, res){
    try{
        const {username, email, password, phone_number} = req.body;
        const valid = validation(username, email, password);
        if (valid){
            const hashPassword = await bcrypt.hash(password, 10);
            const add = user.addUser(username, email, hashPassword, phone_number);
            add.then((result) => {
                res.status(201).json("User added successfuly");
            }).catch((error) => {
                res.status(400).json(error.detail);
            });
        } else{
            res.status(400).json({error : "values is not valid or one missing"});
        }
    }catch (error){
        res.status(501).json(error);
    }
};

async function login(req, res){
    try{
        const {email, password} = req.body;
        const valid = validation("anything", email, password);
        console.log(email,password)
        console.log(req.body)
        if (valid){
          
            const getUser = user.login(email);
            getUser.then((value) => {
                bcrypt.compare(password, value.password, (error, result) => {
                    if (error) {
                        res.status(401).json('email not found');
                    } else if (result) {
                        const accessToken = jwt.sign({id : value.id, username : value.username, email : value.email},process.env.SECRET_KEY, {expiresIn: '7d'});
                        res.cookie('token', accessToken, { httpOnly: true });
                        res.status(200).json({value,accessToken});
                    } else {
                        res.status(402).json('incorrect password');
                    }
                  });
            }).catch((error) => {
                res.status(403).json(error.detail);
            });
        } else {
            res.status(404).json({error : "values is not valid"});
        }
    } catch(error){
        res.status(500).json("error in login");
    }
};

function cont(req, res){
    res.status(200).json("you are in");
};




async function adminLogin(req, res) {
    try {
      const { email, password } = req.body;
      const valid = validation("anything", email, password);
  
      if (valid) {
        const getUser = user.login(email);
        getUser
          .then((value) => {
            // Compare the plaintext password directly (assuming value.password is the stored plaintext password)
            if (password === value.password) {
              if (value.role_id === 2) {
                // Check if the user has admin role (role_id = 2)
                const accessToken = jwt.sign(
                  { id: value.id, username: value.username, email: value.email },
                  process.env.SECRET_KEY,
                  { expiresIn: '7d' }
                );
                res.cookie('token', accessToken, { httpOnly: true });
                res.status(200).json(accessToken);
              } else {
                res.status(403).json('Access forbidden. User does not have admin privileges.');
              }
            } else {
              res.status(400).json('Incorrect password');
            }
          })
          .catch((error) => {
            res.status(400).json(error.detail);
          });
      } else {
        res.status(400).json({ error: 'Values are not valid' });
      }
    } catch (error) {
      res.status(500).json('Error in admin login');
    }
  }


module.exports = {
    register,
    login,
    cont,
    adminLogin
};