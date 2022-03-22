const collegeModel = require("../Models/collegeModel")
const internModel = require("../Models/internModel")
const mongoose = require("mongoose")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidObjectId = function (collegeId) {
    return mongoose.Types.ObjectId.isValid(collegeId)
}

const isValidMobile = function(value){
    if(value.toString().length <10 || value.toString().length >10) return false
    return true
}

const intern = async function (req, res) {
    try {
        data = req.body

        if (Object.keys(data).length !== 0) {
            const { name, email, mobile, collegeId } = data

            if (!isValid(name)) {
                return res.status(400).send({ status: false, message: "name is required" })
            }

            if (!isValid(email)) {
               return res.status(400).send({ status: false, message: "email is required" })
            }
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                return res.status(400).send({status : false, msg : "Email should be valid email address"})
            }

            


            const isEmailalredyUsed = await internModel.findOne({ email }) //{email :email} object shorthand property
            //console.log(isEmailalredyUsed)
            if (isEmailalredyUsed) {
                return res.status(400).send({ status: false, msg: "email already in use" })
                
            }

            if(!isValid(mobile)){
                return res.status(400).send({status : false , msg : "mobile is not in valid format"})
            }

            if(!isValidMobile(mobile)){
                return res.status(400).send({status : false, msg :"pls input correct mobile no." })
            }

            const ismobilealreadyUsed = await internModel.findOne({mobile})
            if(ismobilealreadyUsed){
                return res.status(400).send({status : false, msg : "mobile no. already in use"})
            }


            if (!isValid(collegeId)) {
                return res.status(400).send({ status: false, msg: "collegeId is required" })
            }
            if (!isValidObjectId(collegeId)) {
                return res.status(400).send({ status: false, msg: "valid collegeId is required" })
            }



            const createIntern = await internModel.create(data)
            return res.status(201).send({ status: true, message: "intern details filled", data: createIntern })

        } else {
             res.status(400).send({ status: false, msg: "Please fill details" })
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }
}


const collegeDetails = async function(req, res){
    clName=req.query.name
    const data = await collegeModel.findOne({name : clName, isDeleted : false})
    //console.log(data)
    const obj = {}

    const {name, fullName, logolink} = data
    obj.name=name
    obj.fullName=fullName
    obj.logolink=logolink
    //res.status(201).send({status : true, msg : "send", data: data})

    const allInterns= await internModel.find({collegeId : data._id, isDeleted:false}).select({ collegeId:0, isDeleted:0, __v : 0})
    
    obj.interest = allInterns
    //console.log(obj)
    //console.log(allInterns)
    res.status(400).send({status : true, msg: "interns details", data: obj})

}



module.exports.intern = intern
module.exports.collegeDetails=collegeDetails
