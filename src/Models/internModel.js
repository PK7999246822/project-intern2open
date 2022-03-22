const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const internModel = new mongoose.Schema({
    name : {
        type : String,
        required : "intern name is required"
    },
    email : {
        type: String,
        trim:true,
        required: 'Email is required',
        unique: true,
        lowercase : true,
        validate : {
            validator : function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: 'Please fill a  valid email address', isAsync: false
        }
    },

    mobile : {
        type: Number,
        trim: true,
        required : 'Phone no. is required',
        unique : true,
        minlength : [10, 'minimum phone length should be 10'],
        maxlength : [10, 'maximum length should also be 10'],
        validate : {
            validator : function(mobile) {
                return /^[0-9]{10}$/.test(mobile)
            }, message : `{mobile} is not a valid phone number!`
        }
    },
    collegeId : {
        type : ObjectId,
        ref: "college",
        required : 'college-id is required'
    },
    isDeleted : {
        type : Boolean,
        default : false
    }

})