const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {
    const token = req.headers.authorization;
    
    if(token){
        jwt.verify(token,"secretkey",(err,decoded) => {
            if(decoded){
                req.body.userID = decoded.userID;
                next();
            }
            else{
                res.send({"message":"This is a protected route you need to login first before accessing it"});
            }
        })
    }
    else{
        res.send({"message":"Please give token for entering this page"});
    }
    
}

module.exports = {auth};