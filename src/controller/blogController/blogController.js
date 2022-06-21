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
        const data = req.body;
        if(Object.keys(data).length == 0)return res.status(400).send({status: false, msg:"body require"})
        const blogId = req.params.blogId
        const blog = await blogModel.findById(blogId)
        if(!blog) return res.status(400).send({status: false, msg:"no such Blog present"})

        if(data.tag)   blog.tag.push(data.tag);
        if(data.subcatogry)  blog.subcatogry.push(data.subcatogry);
        blog.title = data.title
        blog.body = data.body;
        blog.isPublished = true
        blog.publishedAt = new Date

        const updateData = await blog.save()
        
        return res.status(200).send({status:true,msg:updateData})

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
    }catch(err){return res.status(500).send({status: false, msg:err.message})}
}


// DELETE BLOG BY Any
const deleteBlogByAny=async (req,res)=>{
    try{
        let arry={...req.query}
        if(Object.keys(arry).length != 0){
            await blogModel.updateMany(arry,{isDeleted:true,deletedAt:new Date})
            return res.status(200).send({status:true})
        }else{return res.status(400).send({status:false})}
    }catch(err){
        return res.status(500).send({status: false, msg:err.message})
    }
}

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogByAny = deleteBlogByAny;

