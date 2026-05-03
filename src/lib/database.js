import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

const client = new MongoClient(MONGODB_URI); 

export async function connectToDB() {
    await client.connect(); 
    console.log("Your are now connected to MondoDB");
}

// Exportar la base de datos 
export const dbClient = client.db(process.env.DB_NAME || 'demo');
    
// TESTING DATABASE

//const db = client.db('test_connection_db');
//const collection = db.collection('documents'); 
//const result = await collection.insertOne({
//    "title": "test de funcionamiento 2",
//    "done": true
//});
//console.log(result); 
