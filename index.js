import express from 'express';
import cors from 'cors'
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@businessmanagement.ypdfgxh.mongodb.net/`);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient = await connectToMongoDB();
const database = connectedClient.db('hireloopdb');
const users = database.collection('user');
const jobs = database.collection('jobs')


app.get('/users', async(req, res)=>{
    const cursor = users.find({});
    const result = await cursor.toArray();
    res.send(result);
})




app.get('/', (req, res)=>{
    res.send('hire loop is looping')
})

app.listen(port, ()=>{
    console.log(`hire loop is runnig on the port ${port}`);
})