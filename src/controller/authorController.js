
const authorModel = require("../model/authorModel");
const {sign}=require('jsonwebtoken')

// CREATE  AUTHOR
const createAuthor = async (req, res) => {
    try {
            let {fname,lname, title ,email ,password} = req.body;

            if(!fname || !lname || !title || !email || !password) return  res.status(400).send({status:false,  msg:"Please Enter All field" })

            if(fname || lname || title || email || password){
                fname = fname.trim(); lname = lname.trim(); title = title.trim(); email = email.trim(); password = password.trim();
            }

            if(!( fname.length > 3 && lname.length > 3) )  return  res.status(400).send({status:false,  msg:"fname and lname should be greater than 3 " })

            if(!(["Mr", "Mrs", "Miss"].some(value => value === title))) return res.status(400).send({status:false,msg:"You can choose only 'Mr', 'Mrs', 'Miss' this Value"})

            if(!(password.length > 6 && password.length < 16)) return  res.status(400).send({status:false,  msg:"password should be greater than 6 and less then 16 " })

            if(!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) return  res.status(400).send({status:false,  msg:"Please fill a valid email address " })
        
            const isPresentAuthor = await authorModel.findOne({email});

            if(isPresentAuthor) return res.status(400).send({status:false,  msg:"User All Ready Present " })

             let savedData = await authorModel.create(req.body)

             res.status(201).send({status:true,  data: savedData })
        }
    catch (error) {
        res.status(500).send({status:false, msg:error.message })
    }
}

// LOGIN AUTHOR
const loginAuthor = async (req,res)=>{
    try{
    let{email,password}=req.body //email and password empty or not

    email = email.trim(); email = email.toLowerCase();
    
    if(!email || !password) return res.status(400).send({status:false,msg:"email and password required"})
    //email valid or not


    if(!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)))return res.status(400).send({status:false,msg:"Enter a valid Email"})
    //find by email and password
    
    let authorDetail=await authorModel.findOne({email,password})

    if(!authorDetail) return res.status(401).send({status:false,msg:"email or password is invalid"})

    let token=sign({_id:authorDetail._id},"ROOM 26(shubhra,shivanand,sourabh,shiv)/blog-project-1")

    return res.status(200).send({status:true,data:token})

    }catch(err){return res.status(500).send({status:false,msg:err.massage})}
}
module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;
