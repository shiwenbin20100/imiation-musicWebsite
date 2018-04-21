const jwt = require("jsonwebtoken");

module.exports = function(req,res,next) {
    let token = JSON.parse(req.cookies.get("userInfo")).token;
    
    if(typeof token !== "undefined") {
        jwt.verify(token,"swb1995.com",(err,decoded) => {
        if(err){
            return res.send(404);
        }else{
            req.loginUser = decoded.data
            next();
        }
        })
    }else {
        res.send(403);
    }
}