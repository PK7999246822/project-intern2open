const collegeModel = require("../Models/collegeModel")
const internModel = require("../Models/internModel")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const intern = async function(req, res){
    try{
        data = req.body

    if(Object.keys(data).length !== 0){
        const{name, email, mobile, collegeId} = data

        if(!isValid(name)){
            return res.status(400).send({status : false, message : "name is required"})
        }


        const isEmailalredyUsed = await internModel.findOne({ email }) //{email :email} object shorthand property
            //console.log(isEmailalredyUsed)
            if (isEmailalredyUsed) {
                res.status(400).send({ status: false, msg: "email already in use" })
                return
            }

            if (isValid(collegeId)) {
                res.status(400).send({ status: false, msg: "Blog author is required" })
            }
            if (isValidObjectId(collegeId)) {
                res.status(400).send({ status: false, msg: "valid authorId is required" })
            }    



            const createIntern = await internModel.create(data)
            return res.status(201).send({status : true , message : "intern details filled", data: createIntern})
        }else{
            return res.status(400).send({status : false , msg : "Please fill details"})
        }
    }catch(err){
        return res.status(500).send({status : false , message : err.message})

}
}


module.exports.intern=intern
    