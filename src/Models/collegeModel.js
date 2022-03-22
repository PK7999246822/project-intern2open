const mongoose = require("mongoose")

const collegeModel = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        required : "College name is required",
        trim : true,
        lowercase : true
    },
    fullName : {
        type : String,
        required : 'full name of college is required',
        trim : true,
        unique: true
    },
    logolink : {
        type : String,
        required : [true,"Logo link is required"],
        trim : true,
        validate : {
            validator : function(logolink){
                return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(logolink)
            }, message : `{logolink} is not valid`

        }
    },
    isDeleted : {
        type : Boolean,
        default : false,
        
    }

}, { timestamps: true } )

module.exports = mongoose.model('college', collegeModel)