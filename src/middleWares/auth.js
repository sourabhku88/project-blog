const jwt = require('jsonwebtoken');

const authentication = async (req,res)=>{
    try{
        const token = req.headers["x-api-key"];
        if(!token) return res.status(401).send({status:false,msg:"user has no token" });

        const isValidToken = jwt.verify(token , "ROOM 26(shubhra,shivanand,sourabh,shiv)/blog-project-1");

        if(!isValidToken) return res.status(401).send({status:false,msg:"user has invalid token" });

        next()

    }catch(error) {return res.status(500).send({status:false,msg:error.message })}
}




module.exports = authentication