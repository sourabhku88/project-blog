const jwt = require("jsonwebtoken");
const authorModel = require("../model/authorModel");

const loginUser = async (req,res) =>{
    
    let userName = req.body.emailId;
    let password = req.body.password;

    let user = await authorModel.findOne({emailId : userName, password :password});

    if(!user){
        return res.send({status : false, msg :  "Please enter the correct username or password."});
    }

    let token = jwt.sign({
        
        userId : user._id.toString();

    }, "Project_Blog")

}