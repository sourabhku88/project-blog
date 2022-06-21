const blogModel = require('../../model/blogModel')
const authorModel = require('../../model/authorModel')
const mongoose = require('mongoose')

// CREATE BLOG
const createBlog = async (req, res) => {
    try {
        if (Object.keys(req.body).length < 0) res.status(400).send({ status: false, msg: "fill all fields" })

        if (mongoose.isValidObjectId(req.body.authorId)) res.status(400).send({ status: false, msg: "please enter valid authorID" })

        const author = await authorModel.findOne(req.body.authorId);
        if (!author) res.status(400).send({ status: false, msg: "no such author present" })

        const data = await blogModel.create(req.body);

        res.status(201).send({ status: true, msg: data })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ status: false, msg: err.message })
    }
}

// GET BLOGS
const getBlogs = async (req, res) => {
    try {

        let allBlogData = await blogModel.find({ isDeleted: false, isPublished: true });

        if (Object.keys(allBlogData).length != 0) {

            res.status(200).send({ msg: "successful.", data: allBlogData });
        }
        else {

            res.status(404).send({ msg: "Page not found." });
        }


    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}

// GET BLOGS
const updateBlog = async (req, res) => {
    try {
        // const 
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
