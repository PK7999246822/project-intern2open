const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        trim:true,
        required:true,
    },
    logoLink:{
        type : String,
        required:true,
     },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("college",schema)