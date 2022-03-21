const express = require("express")
const { route } = require("express/lib/application")
const router = express.Router()

const collegeController = require("../Controllers/collegeController")
// const internController = require("../Controller/InternController")

router.post("/functionup/colleges", collegeController.college)
// router.post("/functionup/interns", internController.intern)


module.exports = router