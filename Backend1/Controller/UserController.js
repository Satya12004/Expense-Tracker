const { ObjectId } = require('mongodb');
const {main}=require('../Config/db')
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);


const register=async(req,res)=>{
    const {name,email,password}=req.body
    if(!name){
     return   res.status(400).json({msg:"name is required"})
    }
    if(!email){
        return   res.status(400).json({msg:"email is required"})
       }

       if(!password){
        return   res.status(400).json({msg:"password is required"})
       }
    try {
        let collection=await main();
     
    let findUser=await collection.findOne({email});
    if(findUser){
      res.status(200).json({msg:"user allreay registered"})
    }
    else{
        let hashedPassword=bcrypt.hashSync(password,salt)
        let data=await collection.insertOne({
            name:name,
            email,
            password:hashedPassword
        });
        res.json({msg:"User register successFully",data})
    }
    } catch (error) {
        res.status(500).json({msg:"error in register user",error:error.message})
    }
    
  
}

const users=async(req,res)=>{
    const {email,password}=req.body
    if(!password){
        return res.json({msg:"password is requires"})
    }
    let collection=await main();
    try{
        let user=await collection .findOne({email});
        if(user){
        let comparepasword=bcrypt.compareSync(password,user.password)
        if(comparepasword){
            res.status(200).json({msg:"login successfully",user})
        }else{
            res.status(401).json({msg:"wrong password"})
        }
        }else{
            res.status(404).json({msg:"user not found"})
    }
    }catch(error){
   res.status(500).json({msg:"error in update user",error:error.message})
    }
  
   
}

const updateUser=async(req,res)=>{
    try {
        let {name,paasword}=req.body
        let id=req.params.id
        let data=collection.updateOne({_id:new ObjectId(id)},{$set:{name:name,paasword}})
        res.status(200).json("user's data update successfully")
    } catch (error) {
        res.status(500).json({mag:"user update in error",error})
    }
   
}

const DeleteUser=async(req,res)=>{
      let id=req.params.id
    //   console.log(id)
    let collection=await main()
    let data=collection.deleteOne({_id:new ObjectId(id)})
    res.json({msg:"user's data Delete successfully"})  
}

module.exports={
    register,
    users,
    updateUser,
    DeleteUser
}