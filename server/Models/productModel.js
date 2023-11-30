const { func } = require('joi');
const db = require('../config');


async function GETP(){
    try{
        const query = 'SELECT *, categories.category FROM products INNER JOIN categories ON categories.id = products.category_id where products.is_deleted = false;'
        const result = await db.query(query);
        return result.rows;
    }catch(error){
        return error;
    }
}


   async function products(id) {
        try {
            const query = `select * from products where category_id = $1 `;
            const value = id;
            const result = await db.query(query, [value]); 
            return result.rows;
            
        } catch (error) {
            // return error.message;
            console.log(error)
        }
      }





      module.exports = {
        GETP,
        products,
        
    };