const Shopping = require('../Models/shoppingModel');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
var multer  = require('multer');



let lastFileSequence = 0;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    lastFileSequence++;
    const newFileName = `${Date.now()}_${lastFileSequence}${path.extname(file.originalname)}`;
    cb(null, newFileName);
  },
});

const addImage = multer({ storage: storage });
const imageProduct = addImage.single('image');




const addtocart = async (req, res) => {
    const { count } = req.body;
    console.log(count);
  try {
    let number;
      if (count == null){
        number = 1;
      }else{
        number = count;
      }
      const productId = req.params.id;
      const userID = req.user.id;
    

      await Shopping.addtocart(productId, userID, number);

      res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Product added failed' });
  }
};



const getcartproducts = async (req, res, next) => {

    try {
      const userID = req.user.id;
      const shoppingcart = await Shopping.getcartproducts(userID);

      const modifiedResponse = {
        // success: true,
        shoppingcart: shoppingcart.map(item => {
          return {
            id: item.id,
            name: item.product_name,
            details: item.product_detail,
            category: item.category,
            images: JSON.parse(item.image), 
            price: item.total_price,
            image_url: `http://localhost:3001/uploads/${JSON.parse(item.image)}`
          };
        })
      };
      res.status(200).json(modifiedResponse); 
    //   res.status(200).json(shoppingcart);
    } 
    catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: 'Error in getting shoppingcarts' });
      }
    };




    const deleteproduct = async (req, res) => {
        try {
            const productId = req.params.id;
            const userID = req.user.id;

  
    
          await Shopping.deleteproduct(productId,userID);
    
    
            res.status(200).json({ success: true, message: 'Product deleted successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    };





    const totalprice = async (req, res) => {
        try {
          const userID = req.user.id;
          const total =  await Shopping.totalprice(userID);
    
            res.status(200).json({ success: true, total });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    };


    const createCheckoutSession = async (req, res) => {
        try {
        //   const userID = req.user.id;
          const userID = req.user.id
          const cartProducts = await Shopping.getcartproducts(userID); 
          const totalPriceResult = await Shopping.totalprice(userID); 
      
      
          const totalAmount = totalPriceResult[0].sum;
      
      
          const lineItems = cartProducts.map(product => {
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: product.product_name,
                },
                unit_amount: Math.round(product.total_price * 100), 
              },
              quantity: 1,
            };
          });
      
      
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000',
            cancel_url: 'http://localhost:3000/cancel',
          });
      
          res.json({ id: session.id });
          await Shopping.checkconfirm(userID); 
          console.log(totalAmount);
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, error: 'payment failed' });
        }
      };




      async function postbooking(req, res) {
    
        const { productId, userID, date, time, phone_number, location } = req.body;
        //console.log(id, name, email, message)
        try {
          const productId = req.params.id;
            const userID = req.user.id;
            const result = await Shopping.bookinfo(productId, userID, date, time, phone_number, location);
            //console.log(result);
            res.status(201).json({ message: 'booking saved successfully!' });
        } catch (error) {
            console.log(error);
            res.status(401).json("error in booking controller");
        }
      };
    


      async function getbooking(req, res){   
        try{
          const userID = req.user.id;
            //console.log("getbooking controller");
            const get = await Shopping.gatall(userID);
            res.status(200).json(get);
        }catch(error){
            res.status(500).json(error);
        }
    }

    
module.exports = {
    addtocart,
    getcartproducts,
    deleteproduct,
    totalprice,
    createCheckoutSession,
    postbooking,
    getbooking
    
    
  };