const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

const app = express()
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId

const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cf70q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const database = client.db("foodCornerDb");
        const usersCollection = database.collection("products");
        // create a document to insert


        //post api 
        app.post('/services', async (req, res) => {
            const products = req.body;
            const result = await usersCollection.insertOne(products);
            res.json(result);

        })


        // get api 
        app.get('/services', async (req, res) => {
            const cursor = usersCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })




        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await usersCollection.findOne(query);
            console.log('load user id', id);
            res.send(product);
        })



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Hello World! Runnig my crud server')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



// foodCornerUser
//PS6rx2yp1zWnUQ2e