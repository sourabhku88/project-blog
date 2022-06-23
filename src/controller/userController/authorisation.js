const jwt = require("jsonwebtoken");
const blogModel = require("../../model/blogModel");

const { isVaildObjectId } = require("mongoose");


const authorisation = async function (req, res) {

    try {
        let authorid = req.params.authorId;

        let token = req.headers["x-auth-token"];

        if (!authorid) return res.status(400).send({ status: false, msg: "Please enter authorId." });

        if (!isVaildObjectId(authorid)) return res.status(400).send({ status: false, msg: "Please enter vaild authorId." });

        let userDetails = await blogModel.findById(authorid);

        if (!userDetails) return res.status(404).send({ status: false, msg: 'No such user exists' })

        const tokenDecoded = jwt.verify(token,"ROOM 26(shubhra,shivanand,sourabh,shiv)/blog-project-1");

        if (userDetails._id != tokenDecoded._id) return res.status(403).send({ status: false, msg: "User logged is not allowed to modify the requested users data" })
    

    } catch (error) {

        res.status(500).send({ status: false, msg: error.message });
    }

}

module.exports.authorisation = authorisation;