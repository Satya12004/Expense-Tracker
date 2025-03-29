const { MongoClient } = require('mongodb');
require('dotenv').config()
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection 
const url = process.env.MONGODB_URL;
console.log(url)
 const client = new MongoClient(url);

// Database Name
let dbName = "ExpneseApp"
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server Mogodb atlas');
  const db = client.db(dbName);
  const collection = db.collection('users');

  // the following code examples can be pasted here...
  return collection;
}
async function expense() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('expense');

  // the following code examples can be pasted here....>>>>>
  return collection;
}

module.exports={
    main,
    expense
}