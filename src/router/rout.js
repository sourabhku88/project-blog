const express =require('express');
const { createAuthor,loginAuthor} = require('../controller/authorController/authorController');
const { createBlog, getBlogs ,updateBlog ,deleteBlog ,deleteBlogByAny} = require('../controller/blogController/blogController');
const {authentication, authorisation} = require('../middleWares/auth');


const { blogDeleteCheck } = require('../middleWares/deleteCheck');
const router =express.Router();

router.post('/authors', createAuthor)

router.post('/author/login', loginAuthor)

router.post('/blogs', authentication,authorisation, createBlog)

router.get('/blogs', authentication,authorisation, getBlogs ) 

router.put('/blogs/:blogId',authentication, authorisation,blogDeleteCheck ,updateBlog )

router.delete('/blogs',authentication, authorisation, deleteBlogByAny )

router.delete('/blogs/:blogId',authentication, authorisation,blogDeleteCheck, deleteBlog )




module.exports = router;