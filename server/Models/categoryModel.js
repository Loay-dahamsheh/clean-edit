const { func } = require('joi');
const db = require('../config');



async function categories(categoryId) {
    try {
      const query = 'SELECT * FROM categories WHERE id = $1';
      const result = await db.query(query, [categoryId]);
      return result.rows[0]; // Assuming you expect one category with a specific ID
    } catch (error) {
      console.error(error); // Log the error for debugging
      throw error;
    }
  }
  

  module.exports = {
    categories
    
};
  