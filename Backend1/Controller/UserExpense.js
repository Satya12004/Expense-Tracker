const { expense } = require("../Config/db")
const { ObjectId } = require('mongodb');

const CreateExpense=async(req,res)=>{
    const{ExpenseName,Price,Id,Date}=req.body
    console.log(req.body)
    if(!ExpenseName){
       return res.json({msg:"ExpenseName is required"})
    }

    if(!Price){
      return  res.json({msg:"Price is required"})
    }
    try{
    let collection =await expense()
    console.log(collection)
    // let findExpense=await collection.findOne({ExpenseName});
  let data = await collection.insertOne({
        ExpenseName,
        Price,
        Id,
        Date
    })
    res.status(201).json({msg:"Expense Create successFully",data})

}catch(error){
    res.status(401).json({msg:"expense is not created!!",error:error.message});
    
}
}

const updateExpense=async (req,res)=>{
    const {id} = req.params;
    console.log(id)
    // const {expenseName,price,date} = req.body;
    let collection = await expense();
    console.log(req.body)
    // let data = await collection.updateOne(  {find}, {$set:{update}}  )
    let data = await collection.updateOne(  {_id:new ObjectId(id)}, {$set:req.body}  )
    res.status(200).json({msg:"data updated successfully"})

}
const DeletExpense=async(req,res)=>{
    let id =req.params.id
    let collection=await expense()
    let data=await collection.deleteOne({_id:new ObjectId(id)})
    res.json({msg:"user Expense Delete successfully"})
}
const GetUserExpense=async(req,res)=>{
    // let {ExpenseName}=req.body
    let Id=req.params.id

    let collection=await expense()
    // let Id=req.params.id
    
    try {
        let data=await collection.find({Id}).toArray()
        console.log(data)
        if(data){
        res.status(200).json({msg:"userExpense Find successfully",data})
        }else{
            res.status(401).json({msg:"userExpense not find"})
        }
    } catch (error){
        res.status(404).json({msg:"userExpense not find",error:error.message})
    }

}

module.exports={
    CreateExpense,
    updateExpense,
    DeletExpense,
    GetUserExpense
}