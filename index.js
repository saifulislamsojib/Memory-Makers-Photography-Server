const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ernz8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello Memory Makers Photography!');
});

client.connect(err => {
    const servicesCollection = client.db("memory-makers-photography").collection("services");

    const booksCollection = client.db("memory-makers-photography").collection("books");

    const feedbackCollection = client.db("memory-makers-photography").collection("feedback");

    app.post("/addService", (req, res) =>{
      const service = req.body;
      servicesCollection.insertOne(service)
      .then(result => res.send(result.insertedCount > 0) );
    });

    app.post("/bookOrder", (req, res) =>{
      const bookOrder = req.body;
      booksCollection.insertOne(bookOrder)
      .then(result => res.send(result.insertedCount > 0) );
    });

    app.post("/sendFeedback", (req, res) =>{
      const feedback = req.body;
      feedbackCollection.insertOne(feedback)
      .then(result => res.send(result.insertedCount > 0) );
    });

    app.get('/services', (req, res) => {
      servicesCollection.find({})
      .toArray((err, documents)=>{
        res.send(documents);
      })
    });

    app.get('/userBookings', (req, res) => {
      const {email} = req.query;
      booksCollection.find({"user.email": email})
      .toArray((err, documents)=>{
        res.send(documents);
      })
    });

    app.get('/service/:id', (req, res) => {
      const {id} = req.params;
      servicesCollection.find({_id: ObjectId(id)})
      .toArray((err, documents)=>{
        res.send(documents[0]);
      })
    });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});