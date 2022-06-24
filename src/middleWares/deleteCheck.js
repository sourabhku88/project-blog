const blogModel = require('../model/blogModel')
const mongoose = require('mongoose')
const blogDeleteCheck = async function (req, res, next) {
    try {
        let blogId = req.params.blogId
        let { catagory, authorId, tag, subcatogry, isPublished } = req.query
        let arr = {}
        if (catagory) arr.catagory = catagory
        if (authorId) arr.authorId = authorId
        if (isPublished) arr.isPublished = isPublished

        if (Object.keys(arr).length == 0 && blogId && !tag && !subcatogry) {
            if (!mongoose.isValidObjectId(blogId)) return res.status(400).send({ status: false, msg: "please enter valid authorID" })
            let blogData = await blogModel.findById(blogId)
            if (blogData.isDeleted) {
                return res.status(404).send({ status: false, msg: "Blog not Found" })
            }
        } else {
            if (tag || subcatogry && Object.keys(arr).length == 0) {
                if (tag && !subcatogry) {
                    let blogData = await blogModel.find({ tag: { $in: [tag] } })
                    let count = 0
                    blogData.forEach(e => { if (e.isDeleted) count++ })
                    if (count != 0) return res.status(404).send({ status: false, msg: "Already deleted" })

                } else if (!tag && subcatogry) {
                    let blogData = await blogModel.find({ subcatogry: { $in: [subcatogry] } })
                    let count = 0
                    blogData.forEach(e => { if (e.isDeleted) count++ })
                    if (count != 0) return res.status(404).send({ status: false, msg: "Already deleted" })

                } else if (tag && subcatogry) {
                    let blogData = await blogModel.find({$and:[{ subcatogry: { $in: [subcatogry] } },{ tag: { $in: [tag] } }]})
                    let count = 0
                    blogData.forEach(e => { if (e.isDeleted) count++ })
                    if (count != 0) return res.status(404).send({ status: false, msg: "Already deleted" })
                }
            }else{
                if (tag && !subcatogry) {
                    let blogData = await blogModel.find({$and:[{ tag: { $in: [tag] } },arr]})
                    let count = 0
                    blogData.forEach(e => { if (e.isDeleted) count++ })
                    if (count != 0) return res.status(404).send({ status: false, msg: "Already deleted" })

                } else if (!tag && subcatogry) {
                    let blogData = await blogModel.find({$and:[{ subcatogry: { $in: [subcatogry] } },arr]})
                    let count = 0
                    blogData.forEach(e => { if (e.isDeleted) count++ })
                    if (count != 0) return res.status(404).send({ status: false, msg: "Already deleted" })

                } else if (tag && subcatogry) {
                    let blogData = await blogModel.find({$and:[{ subcatogry: { $in: [subcatogry] } },{ tag: { $in: [tag] } },arr]})
                    let count = 0
                    blogData.forEach(e => { if (e.isDeleted) count++ })
                    if (count != 0) return res.status(404).send({ status: false, msg: "Already deleted" })
                }
                
            }
        }
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
    next()

}

module.exports.blogDeleteCheck = blogDeleteCheck
