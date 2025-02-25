const express=require('express');
const app=express()
const port=8090;
const cors=require('cors')
const {main}=require('./Config/db')
const userRouter=require('./Routes/UserRouter') 
const ExpenseRouter=require('./Routes/ExpenseRouter')

app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('welcome page here!!')
})

app.use('/expense',ExpenseRouter)
app.use('/user',userRouter)


app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})