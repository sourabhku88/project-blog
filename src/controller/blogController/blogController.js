const blogModel = require('../blogController/blogController')

// CREATE BLOG
const createBlog =  async (req,res)=>{
    try{
       if(Object.keys(req.body).length < 0 ) return res.status(400).send({status: false, msg:"fill all fields"})

    //    const user = await 
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({status: false, msg:err.message})
    }
}

// GET BLOGS
const getBlogs = async (req,res)=>{
    try{

    }
    catch(err) {res.status(500).send({status: false, msg:err.message})}
}

// GET BLOGS
const updateBlog = async (req,res)=>{
    try{
        // const 
    }
    catch(err){res.status(500).send({status: false, msg:err.message})
    }
}

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
