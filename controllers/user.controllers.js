const User = require("../models/user")

async function handleuserSignUp(req,res){
   const {name,email,password} = req.body
   await User.create({
      name,
      email,
      password
   })
   return res.render("home")
}

async function handleUserLogin(req,res){
   const {email,password}=req.body
   const user   =await User.findOne({email,password})
   
}

module.exports={
   handleuserSignUp
}