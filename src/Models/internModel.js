const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const intern = new mongoose.Schema( {
    name: { 
        required:true,
        type:String
   },
   email: {
    required:true,
    unique:true,
    type:String,
    validator : {
        validator : function(email){
            return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
        },
    }
},

  mobile:{
      type:Number,
      required:true,
      unique:true,
      validator: {
        validator : function(mobile){
            return (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))
        }
    }
  },
    collegeId: {
          type:ObjectId,
          required:true,
          ref:"College"
    },
    isDeleted: { 
        type:Boolean,
         default: false 
    },

}, { timestamps: true });   
module.exports = mongoose.model('InternModel', intern)