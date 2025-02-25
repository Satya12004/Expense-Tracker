const express=require('express')
const {register,users,updateUser,DeleteUser} =require('../Controller/UserController')

const router=express.Router();
router.post('/create',register)
router.post('/login',users)
router.put('/update/:id',updateUser)
router.delete('/Delete/:id',DeleteUser) 

module.exports=router
