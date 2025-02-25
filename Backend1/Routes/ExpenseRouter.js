const express=require('express');
const { CreateExpense,updateExpense,DeletExpense,GetUserExpense} = require('../Controller/UserExpense');
let router=express.Router();
router.post('/create',CreateExpense)
router.put('/update/:id',updateExpense)
router.delete('/delete/:id',DeletExpense)
router.post('/get/:id',GetUserExpense)
    
module.exports=router