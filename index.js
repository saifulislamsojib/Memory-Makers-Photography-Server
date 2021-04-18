const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const admin = require('firebase-admin');
const config = require('./configs/configs');

const app = express();

app.use(express.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(config)
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ernz8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello Memory Makers Photography!');
});

client.connect(err => {
    const servicesCollection = client.db("memory-makers-photography").collection("services");

    const booksCollection = client.db("memory-makers-photography").collection("books");

    const feedbackCollection = client.db("memory-makers-photography").collection("feedback");

    const messagesCollection = client.db("memory-makers-photography").collection("messages");

    const adminsCollection = client.db("memory-makers-photography").collection("admins");

    app.post("/addService", (req, res) =>{
      const service = req.body;
      servicesCollection.insertOne(service)
      .then(result => res.send(result.insertedCount > 0) );
    });

    app.post("/addAdmin", (req, res) =>{
      const { email } = req.body;
      adminsCollection.insertOne({ email })
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

    app.get('/reviews', (req, res) => {
      feedbackCollection.find({})
      .toArray((err, documents)=>{
        res.send(documents);
      })
    });

    app.post("/sendMessage", (req, res) =>{
      const contactMessage = req.body;
      messagesCollection.insertOne(contactMessage)
      .then(result => res.send(result.insertedCount > 0) );
    });

    app.post('/allBookings', (req, res) => {
      const { email } = req.query;
      const bearer = req.headers.authorization;
      if (bearer && bearer.startsWith('Bearer ')) {
        const idToken = bearer.split(' ')[1];
        admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedToken => {
          if (email === decodedToken.email) {
            adminsCollection.find({ email })
            .toArray((err, documents)=> {
              let finder = {};
              if(documents.length === 0){
                finder = {"user.email": email};
              };
              booksCollection.find(finder)
              .toArray((err, documents)=>{
                res.send(documents);
              })
            })
          }
          else{
            res.status(401).send({message: 'Unauthorized Access'});
          }
        })
        .catch(error => {
          res.status(401).send({message: 'Unauthorized Access'});
        });
      }
      else{
        res.status(401).send({message: 'Unauthorized Access'});
      }
    });

    app.post('/isAdmin', (req, res) => {
      const {email} = req.query;
      const bearer = req.headers.authorization;
      if (bearer && bearer.startsWith('Bearer ')) {
        const idToken = bearer.split(' ')[1];
        admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedToken => {
          if (email === decodedToken.email) {
            adminsCollection.find({ email })
            .toArray((err, documents)=>{
              res.send(documents.length > 0);
            })
          }
          else{
            res.status(401).send(false);
          }
        })
        .catch(error => {
          res.status(401).send(false);
        });
      }
      else{
        res.status(401).send(false);
      }
    });

    app.get('/service/:id', (req, res) => {
      const {id} = req.params;
      servicesCollection.find({_id: ObjectId(id)})
      .toArray((err, documents)=>{
        res.send(documents[0]);
      })
    });

    app.patch('/updateBooking/:id', (req, res) => {
      const product = req.body;
      const {id} = req.params;
      booksCollection.updateOne(
        {_id: ObjectId(id)},
        { $set: product }
        )
      .then(result => {
        res.send(result.modifiedCount > 0);
      })
    });

    app.delete('/deleteService/:id', (req, res) => {
      const {id} = req.params;
      servicesCollection.deleteOne({_id: ObjectId(id)})
      .then(result => {
        res.send(result.deletedCount > 0);
      })
    });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});