const blogModel = require('../../model/blogModel')
const authorModel = require('../../model/authorModel')
const mongoose = require('mongoose')
const { query } = require('express')

// CREATE BLOG
const createBlog =  async (req,res)=>{
    try{
       if(Object.keys(req.body).length < 0 ) return res.status(400).send({status: false, msg:"fill all fields"})

       if(!mongoose.isValidObjectId(req.body.authorId))return res.status(400).send({status: false, msg:"please enter valid authorID"})

       const author = await authorModel.findById(req.body.authorId);
       if(!author) return res.status(400).send({status: false, msg:"no such author present"})

       const data = await blogModel.create(req.body);

     return  res.status(201).send({status: true, msg:data})
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

// UPDATE BLOGS
const updateBlog = async (req,res)=>{
    try{
        // const 
    }
    catch(err){res.status(500).send({status: false, msg:err.message})
    }
}


// DELETE

const deleteBlog=async (req,res)=>{
    try{
    let blogId=req.params.blogId
    await blogModel.findByIdAndUpdate(blogId,{isDeleted:true,deletedAt:new Date})
    return res.status(200).send({status:true})
    }catch(err){return res.status(500).send(err)}
}


// DELETE BLOG BY Any
const deleteBlogByAny=async (req,res)=>{
    try{
        let arry={...req.query}
        if(arry != {}){
            await blogModel.updateMany(arry,{isDeleted:true,deletedAt:new Date})
            return res.status(200).send({status:true})
        }else{return res.status(400).send({status:false})}
    }catch(err){
        return res.status(500).send(err)
    }
}

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogByAny = deleteBlogByAny;

