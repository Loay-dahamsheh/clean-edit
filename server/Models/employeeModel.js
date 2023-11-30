const { func } = require('joi');
const db = require('../config');


const employeeModel = {};

employeeModel.AllEmployees = async () => {
  try {
    const query = 'SELECT id, emp_name, emp_img, emp_position FROM employees WHERE is_deleted = FALSE';
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = employeeModel;