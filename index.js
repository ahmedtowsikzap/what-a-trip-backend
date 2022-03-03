const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gvodb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {



    try {

        await client.connect();
        const database = client.db('travels')
        const serviceCollection = database.collection('services')
        const ordersCollection = database.collection('order')

   //  Get PRODUCTS API

     app.get('/services', async (req, res) => {

    const cursor = serviceCollection.find({});
    const services = await cursor.toArray();
    res.send(services);
})

app.get('/services/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const service = await serviceCollection.findOne(query);
    res.send(service);
});
 // GET API
 app.get('/order', async (req, res) => {

    const cursor = ordersCollection.find({});
    const services = await cursor.toArray();
    res.send(services);
})

// POST api


app.post('/order', async (req, res) => {
    const service = req.body;
    console.log('hit the post api', service)
    console.log('hit thepost api')
    res.send('post hitted ')

    const result = await ordersCollection.insertOne(service);
    console.log(result);
    res.json(result)
});

}

finally {

    // await client.close()

}

}

run().catch(console.dir)
app.get('/', (req, res) => {
  res.send('Server is up! BABY!!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});