const express =require('express');
const { createAuthor } = require('../controller/authorController/authorController');

const { createBlog, getBlogs,deleteBlog ,deleteBlogByAny,updateBlog} = require('../controller/blogController/blogController');
const { blogDeleteCheck } = require('../middleWares/deleteCheck');
const router =express.Router();


router.get('/',(req,res)=>{
    res.status(200).send({msg:"work"})
})


router.post('/authors', createAuthor)

router.post('/blogs', createBlog)

router.get('/blogs',blogDeleteCheck , getBlogs )

router.put('/blogs/:blogId', blogDeleteCheck ,updateBlog )

router.delete('/blogs',deleteBlogByAny )

router.delete('/blogs/:blogId', deleteBlog )


module.exports = router;