const jwt = require('jsonwebtoken');
require('dotenv').config();


async function authorize(req, res, next){
    console.log(req.query)
    try{
        const token = req.headers.authorization;
        console.log(token);
//         const token =  req.headers.cookie;
//   const auth =  token.split("=")[1].trim();
        
        if (token == null){
            res.clearCookie("token");
            res.status(401).json("you need to login first");
        }else {
            const user = jwt.verify(token, process.env.SECRET_KEY);
            if (!user.id){
                res.status(402).json("unauthorized");
            }
            req.user = user;
            next();
        }
    }catch(error){
        console.log(error)
        res.status(403).json(error);
    }
};

module.exports = {
    authorize
};