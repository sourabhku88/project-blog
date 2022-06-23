const jwt = require('jsonwebtoken');

const authentication = async (req,res , next)=>{
    try{
        const token = req.headers["x-api-key"];
        if(!token) return res.status(401).send({status:false,msg:"user has no token" });

       const authorDetail =  jwt.verify(token , "ROOM 26(shubhra,shivanand,sourabh,shiv)/blog-project-1");
        
       req.authorDetail = authorDetail;

        next()

    }catch(error) {return res.status(500).send({status:false,msg:error.message })}
}




module.exports = authentication