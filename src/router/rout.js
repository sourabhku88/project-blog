const express =require('express');
const { createAuthor,loginAuthor} = require('../controller/authorController/authorController');
const { createBlog, getBlogs ,updateBlog ,deleteBlog ,deleteBlogByAny} = require('../controller/blogController/blogController');
const authentication = require('../middleWares/auth');


const { blogDeleteCheck } = require('../middleWares/deleteCheck');
const router =express.Router();


router.post('/authors', createAuthor)

router.post('/author/login', loginAuthor)

router.post('/blogs', createBlog)

router.get('/blogs', authentication, getBlogs ) 

router.put('/blogs/:blogId', blogDeleteCheck ,updateBlog )

router.delete('/blogs', deleteBlogByAny )

router.delete('/blogs/:blogId', deleteBlog )


module.exports = router;