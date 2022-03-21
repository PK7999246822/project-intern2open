const collegemodel = require("../Models/collegeModel")

const college = async function (req, res) {
    try {
         let college = req.body
         if (Object.entries(college).length === 0) {
              res.status(400).send({ status: false, msg: "Kindly pass some data " })
         }
         else {
              let name = req.body.name
              if(!name)
              return res.status(400).send({status: false,msg:"Enter Valid name"})
              
              let fullName = req.body.fullName
              if(!fullName)
              return res.status(400).send({status: false,msg:"Enter Valid fullName"})
             
              let logolink = req.body.logoLink
              if(!logolink)
              return res.status(400).send({status: false,msg:"Enter Valid logoLink"})

              let data = await collegemodel.findOne({ name })
              if (data) {
                   return res.status(401).send({ status: false, msg: "Enter Unique name" })}

              let collegeCreated = await collegemodel.create(college)
              res.status(201).send({ status: true, data: collegeCreated })
         }
    }
    catch (error) {
         console.log(error)
         res.status(500).send({ status: false, msg: error.message })
    }

  };
  //check

  module.exports.college = college