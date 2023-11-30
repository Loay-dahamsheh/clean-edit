const contactusModel = require('../Models/contactusModel');



async function postcontactus(req, res) {
    
    const { id, name, email, message } = req.body;
    //console.log(id, name, email, message)
    try {
        const result = await contactusModel.contactus(id, name, email, message);
        //console.log(result);
        res.status(201).json({ message: 'Contact us form data saved successfully!' });
    } catch (error) {
        console.log(error);
        res.status(401).json("error in contact us controller");
    }
  };


//.............................................Dashboard contact us.........................................................................

async function getmessages(req, res){   
    try{
        console.log("contactus controller");
        const get = await contactusModel.gatall();
        res.status(200).json(get);
    }catch(error){
        res.status(500).json(error);
    }
}



  module.exports ={
    postcontactus,
    getmessages
};