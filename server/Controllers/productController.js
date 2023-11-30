const { func } = require('joi');
const productModel = require('../Models/productModel');
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


async function getallP (req, res){
    try{
        const getP = await productModel.GETP();
        const modifiedResponse = {
            products: getP.map(item => {
              return {
                id: item.id,
                name: item.product_name,
                details: item.product_detail,
                category: item.category,
                images: JSON.parse(item.image), 
                price: item.price,
                counts: item.counts,
                rate : item.rate,
                image_url: `http://localhost:3001/uploads/${JSON.parse(item.image)}`
              };
            })
          };
        res.status(200).json(modifiedResponse);
    }catch(error){
        res.status(500).json(error);
    }
};


//filter by id
async function getproduct(req, res) {
    try {
        // console.log(process.env.DB_PASSWORD);
      const products  = await productModel.products(req.params.id);
      const modifiedResponse = {
        product: products.map(item => {
          return {
            id: item.id,
            name: item.product_name,
            details: item.product_detail,
            category: item.category,
            images: JSON.parse(item.image), 
            price: item.price,
            counts: item.counts,
            image_url: `http://localhost:3001/uploads/${JSON.parse(item.image)}`
          };
        })
      };
      res.status(200).json(modifiedResponse);
      
    } catch (error) {
      // Respond with an error message
      res.status(401).json("error in product controller");
    }
  }




module.exports ={
    getallP,
    getproduct
};