
const authorModel = require("../../model/authorModel");

const createAuthor = async (req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length != 0) {

            let savedData = await authorModel.create(data)

            res.status(201).send({status:true,  data: savedData })
        }
        else {
            res.status(400).send({status:false, msg: "BAD REQUEST" })
        }

    }
    catch (error) {
        res.status(500).send({status:false, msg:error.message })
    }
}

module.exports.createAuthor = createAuthor;
