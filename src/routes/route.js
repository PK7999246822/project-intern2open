const express = require('express');
const router = express.Router();

//const authorController = require("../Controller/authorController")
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")



router.get("/test-me", function(req,res){
    res.send("hello there")
})

//router.post("/createAuthor", authorController.createAuthor)

router.post("/functionup/colleges", collegeController.collegeDetails)

router.post("/functionup/interns", internController.intern)

module.exports = router;