const mongoose = require("mongoose")


const userSchema1 = new mongoose.Schema({
   user:{
      type:String,
      required:true,
   },
   email:{
      type:String,
      required:true,
      unique:true
   },
   password:{
      type:String,
      required:true
   }
},{ timestamps:true }) 

const User = mongoose.model("usermodel",userSchema1);