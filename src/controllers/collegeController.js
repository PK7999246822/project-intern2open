const collegeModel = require("../Models/collegeModel")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const collegeDetails = async function(req, res){
    try {
        let data = req.body

        if(Object.keys(data).length !==0 ){
            const{name, fullName, logolink} = data
            
            //validation
            if(!isValid(name)){
                return res.status(400).send({status : false, message : "name is required"})
            }

            if(!isValid(fullName)){
                return res.status(400).send({status : false, message : "Full name is required"})
            }
            
            if(!isValid(logolink)){
                return res.status(400).send({status : false, message : "logo link is required"})
            }

            const createCollege = await collegeModel.create(data)

            return res.status(201).send({ status : true, message : "college details created", data : createCollege})




        }
    }catch(err){
        return res.status(500).send({status : false , msg : err.message})

    }
}

module.exports.collegeDetails=collegeDetails