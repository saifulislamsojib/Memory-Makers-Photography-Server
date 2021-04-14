const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');

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
    const collection = client.db("test").collection("devices");

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});