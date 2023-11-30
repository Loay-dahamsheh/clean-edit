const db = require('../config');
const Reaction = {};

Reaction.addrate = async (productId, userID, rate) => {
    try {
        const insertrating = await db.query(`INSERT INTO reactions (rate, user_id, product_id) VALUES ($1, $2, $3) RETURNING rate`,[rate, userID, productId]);
        const insertedRatingValue = insertrating.rows[0].rate;
        const result = await db.query(
            'UPDATE products SET rate= (SELECT AVG(rate) FROM reactions WHERE product_id = $1) WHERE id = $1 RETURNING *',[productId]);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};




Reaction.getRates = async (productId) => {
  try {
      const rates = await db.query('SELECT * FROM reactions WHERE product_id = $1', [productId]);
      return rates.rows;
  } catch (error) {
      console.error(error);
      throw error;
  }
};



Reaction.addcomment = async(productId, userID, comment) => {
    try{
        // const userID = 38;
        const result = await db.query ('insert into reactions (user_id ,product_id, comment) values ($1,$2,$3) RETURNING *;', [userID, productId, comment]);
        return 'done';
    } catch(error){
        console.error(error);
        throw error;
    }
};



Reaction.getcomments = async (productId) => {
    try {
      const result = await db.query(`
        SELECT reactions.id, reactions.comment, users.username
        FROM reactions
        INNER JOIN users ON users.id = reactions.user_id
        WHERE reactions.product_id = $1 and reactions.is_deleted=false
      `, [productId]);
  
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  Reaction.updatecomment = async (commentId, newComment) => {
    try {
      const result = await db.query('UPDATE reactions SET comment = $1 WHERE id = $2 RETURNING *;', [commentId, newComment]);
  
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error('Comment not found');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };



  Reaction.deletecomment = async (commentId) => {
    try {
      const result = await db.query('update reactions SET is_deleted = true WHERE id = $1 RETURNING *;', [commentId]);
  
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error('Comment not found');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


module.exports = Reaction