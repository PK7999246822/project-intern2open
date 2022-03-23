const collegeModel = require("../Models/collegeModel")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const collegeDetails = async function (req, res) {
    try {
        let data = req.body

        if (Object.keys(data).length !== 0) {
            const { name, fullName, logolink } = data

            //validation
            if (!isValid(name)) {
                return res.status(400).send({ status: false, message: `${name} is not valid` })
            }

            const isabbrFormatCorrect = name.split(" ")
            len = isabbrFormatCorrect.length
            if (len > 1) {
                return res.status(400).send({ status: false, message: `${name}  is not in correct format` })
            }

            const isNamealreadyused = await collegeModel.findOne({ name })
            if (isNamealreadyused) {
                return res.status(400).send({ status: false, message: `${name} is already in use` })
            }






            if (!isValid(fullName)) {
                return res.status(400).send({ status: false, message: `${fullName} is not valid` })
            }

            const isFullNameAlreadyused = await collegeModel.findOne({ fullName })
            if (isFullNameAlreadyused) {
                return res.status(400).send({ status: false, message: `${fullName} is already in use` })
            }

            if (!isValid(logolink)) {
                return res.status(400).send({ status: false, message: `${logolink} is not valid` })
            }

            if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(logolink)) {
                return res.status(400).send({ status: false, msg: `${logolink} need to be in valid format` })
            }

            const isLinkAlreadyUsed = await collegeModel.findOne({ logolink })
            if (isLinkAlreadyUsed) {
                return res.status(400).send({ status: false, msg: `${logolink} already in use` })
            }



            const createCollege = await collegeModel.create(data)

            return res.status(201).send({ status: true, message: "college details created", data: createCollege })




        }
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })

    }
}

module.exports.collegeDetails = collegeDetails