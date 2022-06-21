const blogModel=require('../model/blogModel')

const deleteBlog=async (req,res)=>{
    let blogId=req.params.blogId
    let blogData=await blogModel.findByIdAndUpdate(blogId,{$set:{isDeleted:true}})

}