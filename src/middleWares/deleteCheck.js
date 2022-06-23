const blogModel = require('../model/blogModel')
const mongoose = require('mongoose')
const blogDeleteCheck = async function (req, res, next) {
    try {
        let blogId = req.params.blogId
        if (!mongoose.isValidObjectId(blogId)) return res.status(400).send({ status: false, msg: "please enter valid authorID" })
        let blogData = await blogModel.findById(blogId)
        if (blogData.isDeleted) {
            return res.status(404).send({ status: false, msg: "Blog not Found" })
        } else {
            next()
        }
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }

}

module.exports.blogDeleteCheck = blogDeleteCheck
