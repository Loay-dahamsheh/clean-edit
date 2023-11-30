const { query } = require('express');
const db = require('../config');

async function getInformation(userID){
    try{
        console.log(4545455454);
        const query = `select username, email, phone_number from users where id = $1`;
        const User = await db.query(query, [userID]);
        console.log(User.rows[0]);
        return User.rows[0];
    }catch(error){
       return error;
    }
};




 async function createimage(userID,image){

  try{
    const imageUrlString = JSON.stringify(image);
    const result = await db.query('UPDATE users SET user_image=$1 WHERE id=$2', [imageUrlString, userID]);
    return result.rows;
  }
    catch (error) {
        console.log(error);
        throw error;
    }
};



async function updateUserImage(userID, image, /* other category fields */) {
    try {
      const imageUrlString = JSON.stringify(image);
      const result = await db.query('UPDATE users SET user_image=$1 WHERE id=$2', [imageUrlString, userID]);
      // Update other category fields in the same way if needed
  
      return result.rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }



async function getWishlist(id){
    try{
        const query = `SELECT witchlist.created_at, products.price,witchlist.id, products.product_name
        FROM witchlist
        INNER JOIN products ON products.id = witchlist.product_id
        WHERE witchlist.user_id = $1;`;
        const wishlist = await db.query(query, [id]);
        console.log(wishlist.rows);
        return wishlist.rows;
    }catch(error){
        res.status(500).json(error);
    }
};



async function getHistory(userID){
    try{
        const query = `select * , products.product_name from shopping_cart inner join products on products.id = shopping_cart.product_id where user_id = $1`;
        const history = await db.query(query, [userID]);
        return history.rows;
    }catch(error){
        res.status(500).json(error);
    }
};




async function addwish(userID,productID){
    try{    
        console.log(userID,productID);
        const query = 'insert into witchlist (product_id, user_id) values ($1, $2)';
        const add = await db.query(query, [productID, userID]);
        return 'done';
    }catch(error) {
        return error;
    }
};


async function editInfo(id, username, email, phone_number, hashPassword){
    try{
        const query = `UPDATE users SET username = $1, email = $2, phone_number = $3, password = $4 WHERE id = $5 RETURNING username, email, phone_number, password`;
        const newdata = await db.query(query, [username, email, phone_number,hashPassword, id]);
        return newdata.rows[0];
    }catch(error){
        if (error.code == 23505){
            return "the is email already exists.";
        }else {
            return error;
        }
    }
};



async function deleteFromWishlist(id, product_id){
    try{
        console.log(id);
        const query = `DELETE FROM witchlist WHERE id = $1;`;
        const result = await db.query(query, [id]);
        return result;
    }catch(error){
        
        res.status(500).json(error);
    }
};



async function off(id){
    try{
        const offuser = await db.query(`UPDATE users SET is_active = 'false' WHERE id = $1;`, [id]);
    }catch(error){
        res.status(500).json(error);
    }
}


module.exports = {
    getInformation,
    createimage,
    updateUserImage,
    getWishlist,
    getHistory,
    addwish,
    editInfo,
    deleteFromWishlist,
    off
    
};