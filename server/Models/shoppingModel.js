const db = require('../config');
const Shopping = {};

Shopping.addtocart = async (productId, user_id, count = 1) => {
    try {
        // Query to calculate total_price
        const totalPriceQuery = await db.query(
            `
            SELECT REPLACE(p.price, '$', '')::numeric * $2::numeric AS total_price
            FROM products p
            WHERE p.id = $1
            LIMIT 1
            `,
            [productId, count]
        );

        if (!totalPriceQuery || !totalPriceQuery.rows || totalPriceQuery.rows.length === 0) {
            throw new Error('Failed to calculate total_price');
        }

        const total_price = totalPriceQuery.rows[0].total_price;

        // Query to fetch product name
        const productNameQuery = await db.query(
            `
            SELECT product_name
            FROM products
            WHERE id = $1
            LIMIT 1
            `,
            [productId]
        );

        if (!productNameQuery || !productNameQuery.rows || productNameQuery.rows.length === 0) {
            throw new Error('Failed to fetch product name');
        }

        const product_name = productNameQuery.rows[0].product_name;

        // Insert into shopping_cart table
        const result = await db.query(
            `
            INSERT INTO shopping_cart (product_id, user_id, count, total_price, cart_product_name)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [productId, user_id, count, total_price, product_name]
        );

        if (!result || !result.rows || result.rows.length === 0) {
            throw new Error('Failed to insert into shopping_cart');
        }

        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};




Shopping.getcartproducts = async (userID) => {
    try {
        const result = await db.query('SELECT shopping_cart.id, products.product_name, shopping_cart.total_price, products.image, categories.category FROM shopping_cart INNER JOIN products ON products.id = shopping_cart.product_id  INNER JOIN categories ON categories.id = products.category_id WHERE shopping_cart.user_id = $1 and shopping_cart.is_deleted = false;',[userID]);
        return result.rows;
    } catch (error) {
        console.error(error);
        console.log(error);
        throw error;
    }
};



Shopping.deleteproduct = async (productId) => {
    try {
      const result = await db.query('update shopping_cart SET is_deleted = true WHERE id = $1 RETURNING *;', [productId]);
      return 'done';
    } catch (err) {
      throw err;
    }
};



Shopping.totalprice = async (userID) => {
    try {
        const result = await db.query('SELECT SUM(shopping_cart.total_price) as sum, users.username FROM shopping_cart INNER JOIN users ON users.id = shopping_cart.user_id WHERE shopping_cart.user_id = $1  GROUP BY users.id, users.username;', [userID]);
        // console.log(result)
        return result.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};




Shopping.checkconfirm = async (userID) => {
    try {
     
      const result = await db.query('UPDATE shopping_cart SET is_pay = TRUE  WHERE user_id = $1', [userID]);
      return result.rows;
    } catch (err) {
      throw err;
    }
  };




  Shopping.bookinfo = async (productId, userID, date, time, phone_number, location) => {
    try {
        const result = await db.query(`INSERT INTO shopping_cart (product_id, user_id, date, time, phone_number,location) VALUES ($1, $2, $3, $4, $5, $6)`, [productId, userID, date, time, phone_number, location]);
    } catch (error) {
        console.log(error);
        throw error;
    }
  };



  Shopping.gatall = async (userID) => {
    try{
        const query = 'select * from shopping_cart where user_id = $1';
        const result = await db.query(query,[userID]);
        //console.log(result);
        return result.rows;
    }catch(error){
        return error;
    }
}

module.exports = Shopping;
