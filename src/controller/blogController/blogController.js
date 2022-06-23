const blogModel = require('../../model/blogModel')
const authorModel = require('../../model/authorModel')
const mongoose = require('mongoose')

// CREATE BLOG
const createBlog =  async (req,res)=>{
    try{
       if(Object.keys(req.body).length == 0 ) return res.status(400).send({status: false, msg:"fill all fields"})

       if(!(req.body.authorId))return res.status(400).send({status: false, msg:"please enter authorID"})

       if(!mongoose.isValidObjectId(req.body.authorId))return res.status(400).send({status: false, msg:"please enter valid authorID"})

       const author = await authorModel.findById(req.body.authorId);
       if(!author) return res.status(400).send({status: false, msg:"no such author present"})

        const data = await blogModel.create(req.body);

     return  res.status(201).send({status: true, data})
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

// GET BLOGS
const getBlogs = async (req,res)=>{
    try{
        const data = await blogModel.find({isDeleted:false, isPublished:true});
        if(!(data.length > 0)) return res.status(404).send({status:false,msg:"Blog not Found"});

        if(Object.keys(req.query).length == 0){
            return res.status(200).send({status:true, data})
        }else{
            if(req.query.tag  ){
                const filterData = await blogModel.find({tag:{$in:[ req.query.tag  ] },isDeleted:false, isPublished:true });
                if(filterData.length == 0) return res.status(404).send({status:false, msg:"not found blog"})
                return res.status(200).send({status:true, data:filterData})
            } else if (req.query.subcatogry){
                const filterData = await blogModel.find({subcatogry:{$in:[  req.query.subcatogry  ] }, isDeleted:false, isPublished:true });
                if(filterData.length == 0) return res.status(404).send({status:false, msg:"not found blog"})
                return res.status(200).send({status:true, data:filterData})
            }
            if (req.query.authorId){
                if(!mongoose.isValidObjectId(req.query.authorId))return res.status(400).send({status: false, msg:"please enter valid authorID"})
                const filterData = await blogModel.find({authorId:req.query.authorId,isDeleted:false, isPublished:true})
                if(filterData.length <= 0) return res.status(404).send({status:false, msg:"Not found blog"})
            }
            const filterData = await blogModel.find(req.query );
            
            const isdeletAndISpublish = filterData.filter(ele => !ele.isDeleted &&  ele.isPublished);
            if(filterData.length <= 0) return res.status(404).send({status:false, msg:"Not found blog"})

            return res.status(200).send({status:true, data:isdeletAndISpublish})
        }
    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}

// UPDATE BLOGS
const updateBlog = async (req,res)=>{
    try{
        const data = req.body;
        if(Object.keys(data).length == 0)return res.status(400).send({status: false, msg:"fill all fields"})
        const blogId = req.params.blogId
        const blog = await blogModel.findById(blogId)
        if(!blog) return res.status(400).send({status: false, msg:"no such Blog present"})

        if(data.tag)  blog.tag.push(data.tag);
        if(data.subcatogry)  blog.subcatogry.push(data.subcatogry);
        blog.title = data.title
        blog.body = data.body;
        blog.isPublished = true
        blog.publishedAt = new Date

        const updateData = await blog.save()
        
        return res.status(200).send({status:true,data:updateData})
        
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


// DELETE

const deleteBlog=async (req,res)=>{
    try{
        let blogId=req.params.blogId
        if(!blogId) return res.status(400).send({status: false, msg:"please enter BlogId"})
        if(!mongoose.isValidObjectId(blogId))return res.status(400).send({status: false, msg:"please enter valid BlogId"})
        await blogModel.findByIdAndUpdate(blogId,{isDeleted:true,deletedAt:new Date})
        return res.status(200).send({status:true})
    }catch(err){return res.status(500).send({status: false, msg:err.message})}
}


// DELETE BLOG BY Any
const deleteBlogByAny=async (req,res)=>{
    try{
        if(req.query.tag){
            const filterData = await blogModel.updateOne({tag:{$in:[ req.query.tag  ] }},{isDeleted:true,deletedAt:new Date },{new:true});
            if(!filterData){
                return res.status(400).send({statsu:false , msg:"not found blog"}) 
            } else{
               return res.status(200).send({statsu:true})
            }
        }else if(req.query.subcatogry){
            const filterData = await blogModel.updateOne({subcatogry:{$in:[ req.query.subcatogry  ] }},{isDeleted:true,deletedAt:new Date },{new:true});
            if(!filterData){
                return res.status(400).send({statsu:false , msg:"not found blog"}) 
            } else{
               return res.status(200).send({statsu:true})
            } 
        }else if(req.query.isPublished === false){
            const filterData = await blogModel.updateOne({isPublished:{$in:[ req.query.isPublished  ] }},{isDeleted:true,deletedAt:new Date },{new:true});
            if(!filterData){
                return res.status(400).send({statsu:false , msg:"not found blog"}) 
            } else{
               return res.status(200).send({statsu:true})
            } 
        }else{
             await blogModel.updateOne(req.query,{isDeleted:true,deletedAt:new Date} , {new:true})
            return res.status(200).send({statsu:true})
        }
    }catch(err){
        return res.status(500).send({status: false, msg:err.message})
    }
}

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogByAny = deleteBlogByAny;

