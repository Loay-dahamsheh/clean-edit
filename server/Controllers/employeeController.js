const { func } = require('joi');
const employeeModel = require('../Models/employeeModel');


const getAllEmployees = async (req, res) => {
    try {
      const employees = await employeeModel.AllEmployees();
  
      const modifiedResponse = {
        employees: employees.map(item => {
          return {
            id: item.id,
            name: item.emp_name,
            image: JSON.parse(item.emp_img), 
            position: item.emp_position
          };
        })
      };
  
      res.status(200).json(modifiedResponse);
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting employees' });
    }
  };
  
  module.exports = {
    getAllEmployees,
    
  };