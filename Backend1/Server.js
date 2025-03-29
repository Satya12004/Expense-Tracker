const express=require('express');
const app=express()
const port=8090;
const cors=require('cors')
const {main}=require('./Config/db')
const userRouter=require('./Routes/UserRouter') 
const ExpenseRouter=require('./Routes/ExpenseRouter')
require("dotenv").config();

const { MongoClient } = require('mongodb');

// const url = 'mongodb+srv://satyamktiwari4754:sKWOzqDp5XybQYi3@expensetracker.cn879wy.mongodb.net/?retryWrites=true&w=majority&appName=ExpenseTracker';

// const url = 'mongodb+srv://satyamktiwari4754:1gn2dKkMiwMQzqZa@expneseapp.r75nwno.mongodb.net/?retryWrites=true&w=majority&appName=ExpneseApp';

// // 1gn2dKkMiwMQzqZa
// // satyamktiwari4754
// async function testConnection() {
//     try {
//         const client = new MongoClient(url);
//         await client.connect();
//         console.log("Connected to MongoDB Atlas!");
//         client.close();
//     } catch (err) {
//         console.error("Connection failed:", err);
//     }
// }

// testConnection();


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