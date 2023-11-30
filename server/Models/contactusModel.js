const { query } = require('express');
const db = require('../config');

async function contactus(id, name, email, message) {
    try {
        console.log(id, name, email, message)

        //query = `INSERT INTO contactus (user_id, user_name, user_email, user_message) VALUES ($1, $2, $3,$4) RETURNING *`;
        const result = await db.query(`INSERT INTO contact_us (user_id, user_name, user_email, user_message) VALUES ($1, $2, $3, $4)`, [id, name, email, message]);
        //const newmessege = result.rows[0];
        //console.log("result1");
        //return newmessege;
    } catch (error) {
        console.log(error);
        throw error;
    }
  };

//.............................................Dashboard contact us.........................................................................


  async function gatall(){
    try{
        const query = 'select * from contact_us';
        const result = await db.query(query);
        console.log(result);
        return result.rows;
    }catch(error){
        return error;
    }
}




  module.exports = {
    contactus,
    gatall,
};