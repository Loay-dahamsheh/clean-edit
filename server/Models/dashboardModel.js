const db = require('../config');
const Dashboard = {};


Dashboard.createproduct = async (product_name,product_detail,image ,price,counts,category_id) => {
        const imageUrlString = JSON.stringify(image);
        const result = await db.query('INSERT INTO products (product_name, product_detail,image ,price,counts,category_id)  VALUES ($1, $2, $3,$4,$5,$6)', [product_name, product_detail,imageUrlString,price,counts,category_id]);
        return result.rows;
    };


    Dashboard.productdetail = async (productId) => {
        try {
          const result = await db.query('SELECT products.id, products.product_name, products.product_detail,products.image,categories.category ,products.price,products.counts FROM products inner join categories on categories.id= products.category_id  where products.id = $1;', [productId]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };

      Dashboard.updateproduct = async (productId, product_name, product_detail, image, price, counts,category_id) => {
        try {
            
          const imageUrlString = JSON.stringify(image);
          const result = await db.query('UPDATE products SET product_name=$1, product_detail=$2, image=$3, price=$4, counts=$5,category_id=$6 WHERE id=$7', [product_name, product_detail, imageUrlString, price, counts,category_id, productId]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };



      Dashboard.deleteproduct = async (productId) => {
        try {
         
          const result = await db.query('UPDATE products SET is_deleted = TRUE  WHERE id = $1', [productId]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };

    //retrieve all product are not deleted
      Dashboard.allproducts = async (page, limit) => {
        try {
            const offset = (page - 1) * limit;
            const result = await db.query(`SELECT products.id, products.product_name, products.product_detail,products.image,categories.category ,products.price,products.counts FROM products inner join categories on categories.id= products.category_id  where products.is_deleted = false ORDER BY products.id LIMIT $1 OFFSET $2;`, [limit, offset]);
            return result.rows;
          } catch (err) {
            throw err;
          }
      };














      Dashboard.createCategory = async (category, image /* other category fields */) => {
        try {
          const imageUrlString = JSON.stringify(image);
          const result = await db.query('INSERT INTO categories (category, cat_image /* other category fields */) VALUES ($1, $2 /* other values */) RETURNING *', [category, imageUrlString /* other values */]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };




      Dashboard.categorydetail = async (categoryId) => {
        try {
          const result = await db.query('SELECT id, category, cat_image /* other category fields */ FROM categories WHERE id = $1;', [categoryId]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };
      
      


      Dashboard.updatecategory = async (categoryId, category, image /* other category fields */) => {
        try {
          const imageUrlString = JSON.stringify(image);
          const result = await db.query('UPDATE categories SET category=$1, cat_image=$2 /* other category fields */ WHERE id=$3', [category, imageUrlString /* other values */, categoryId]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };


      Dashboard.deletecategory = async (categoryId) => {
        try {
          const result = await db.query('UPDATE categories SET is_deleted = TRUE WHERE id = $1', [categoryId]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };
      
      

      Dashboard.allcategories = async () => {
        try {
          const result = await db.query('SELECT * FROM categories WHERE is_deleted = false');
          return result.rows;
        } catch (err) {
          throw err;
        }
      };












      Dashboard.addEmployee = async (emp_name, image, emp_position) => {
        try {
          const empImgString = JSON.stringify(image);
          const result = await db.query('INSERT INTO employees (emp_name, emp_img, emp_position) VALUES ($1, $2, $3)', [emp_name, empImgString, emp_position]);
          return result.rows;
        } catch (error) {
          throw error;
        }
      };
      


      Dashboard.getEmployeeDetails = async (employeeId) => {
        try {
          const query = 'SELECT * FROM employees WHERE id = $1';
          const result = await db.query(query, [employeeId]);
          return result.rows[0]; // Assuming you expect one employee with a specific ID
        } catch (error) {
          throw error;
        }
      };



      Dashboard.updateEmployee = async (employeeId, emp_name, image, emp_position) => {
        try {
          const empImgString = JSON.stringify(image);
          const query = 'UPDATE employees SET emp_name=$1, emp_img=$2, emp_position=$3 WHERE id=$4';
          await db.query(query, [emp_name, empImgString, emp_position, employeeId]);
        } catch (error) {
          throw error;
        }
      };



      Dashboard.deleteemployee = async (employeeId) => {
        try {
          const result = await db.query('UPDATE employees SET is_deleted = true WHERE id = $1', [employeeId]);
          return result
          // await db.query(query, [employeeId]);
        } catch (err) {
          throw err;
        }
      };
      



      Dashboard.getAllEmployees = async () => {
        try {
          const query = 'SELECT id, emp_name, emp_img, emp_position FROM employees WHERE is_deleted = FALSE';
          const result = await db.query(query);
          return result.rows;
        } catch (error) {
          throw error;
        }
      };







      Dashboard.Users = async  (offset, pageSize) => {
        try{
          
        const result = await db.query('SELECT * FROM users LIMIT $1 OFFSET $2', [offset, pageSize]);
                return result.rows;
        }
        catch (error) {
            throw error;
      }
    }




      Dashboard.deleteUser = async(id) => {
      try{
          // console.log("gfgfg");
          const whatis = await db.query('select * from users where id = $1', [id]);
          // console.log(whatis.rows[0].is_deleted);
          if (whatis.rows[0].is_deleted == false) {
          await db.query('UPDATE users SET is_deleted = true WHERE id = $1', [id]);
          }else {
          await db.query('UPDATE users SET is_deleted = false WHERE id = $1', [id]);
          }
          return { message: 'User updated successfully' };
          // return 'done';
      }
      
      catch (error) {
          throw error;
    }
  }
  


  Dashboard.addAdmin = async(username, email, hashPassword, phone_number, role_id) => {
    try{
      
    const query = `INSERT INTO users (username, email, password, phone_number, role_id) 
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id`;
    const values = [username, email, hashPassword, phone_number, role_id];
    return await db.query(query, values);
}
catch (error) {
  throw error;
}
  }


module.exports = Dashboard;


