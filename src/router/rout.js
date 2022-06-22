const express =require('express');
const { createAuthor } = require('../controller/authorController/authorController');
const { createBlog, getBlogs ,updateBlog ,deleteBlog ,deleteBlogByAny} = require('../controller/blogController/blogController');


const { blogDeleteCheck } = require('../middleWares/deleteCheck');
const router =express.Router();


router.post('/authors', createAuthor)

router.post('/blogs', createBlog)

router.get('/blogs', getBlogs ) 

router.put('/blogs/:blogId', blogDeleteCheck ,updateBlog )

router.delete('/blogs',deleteBlogByAny )

router.delete('/blogs/:blogId', deleteBlog )


module.exports = router;