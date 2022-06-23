const jwt = require("jsonwebtoken");
const authorModel = require('../../model/authorModel');

const lognUser = async (req,res)=>{

    try{
        
        let userName = req.body.emailId;
        let password = req.body.password;

        if(!userName || !password){
            

        }

        let user = await authorModel.findOne({
            emailId : userName,
            password : password
        });

        if(!user){
            return res.status(401).send({
                status : false, 
                msg : "Please the enter correct usename or password !"});
        }

        let token = jwt.sign({
            userId : user._id.toString()
        }, "Project_Blog");

        res.setHeader("x-auth-token", token);
        res.status(201).send({status: true, token : token});
    }
    catch(error){
        res.status(500).send({status : false, Error: error.message});
    }
}
module.exports.lognUser = lognUser; 